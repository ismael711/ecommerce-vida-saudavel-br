/**
 * Vida Saudável BR - Product Detail Page
 * Modern E-commerce Layout with Enhanced UX
 */

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Resolve image URLs (local or external)
 */
function getImageUrl(imagePath) {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    imagePath = imagePath.replace(/^\.\//, '');
    return window.CONFIG.baseUrl + '/' + imagePath;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const map = {
        '&': '&',
        '<': '<',
        '>': '>',
        '"': '"',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Format price in Brazilian Real
 */
function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}

// ============================================
// PAGE STATE
// ============================================

const pageState = {
    product: null,
    relatedProducts: [],
    loading: true,
    selectedVariation: null
};

// ============================================
// DOM REFERENCES
// ============================================

const DOM = {
    productDetail: document.getElementById('product-detail'),
    relatedGrid: document.getElementById('related-grid'),
    logoImg: document.getElementById('site-logo')
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Load logo
    if (DOM.logoImg) {
        DOM.logoImg.src = getImageUrl(window.CONFIG.BRANDING.logoPath);
    }
    
    initializeProductPage();
});

/**
 * Main initialization function
 */
async function initializeProductPage() {
    try {
        const productId = getProductIdFromUrl();
        
        if (!productId) {
            showErrorAndRedirect('Produto não encontrado');
            return;
        }
        
        await fetchProducts();
        
        pageState.product = getProductById(productId);
        
        if (!pageState.product) {
            showErrorAndRedirect('Produto não encontrado');
            return;
        }
        
        // Initialize with first variation if available
        if (pageState.product.variations && pageState.product.variations.length > 0) {
            pageState.selectedVariation = pageState.product.variations[0];
        }
        
        updatePageMeta();
        renderProductDetail();
        
        pageState.relatedProducts = getRelatedProducts(productId, 3);
        renderRelatedProducts();
        
        trackProductView();
        
    } catch (error) {
        console.error('Erro ao carregar página:', error);
        showErrorAndRedirect('Erro ao carregar produto');
    }
}

// ============================================
// URL & META HANDLING
// ============================================

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function updatePageMeta() {
    const product = pageState.product;
    
    document.title = `${product.name} - Vida Saudável BR`;
    
    const breadcrumb = document.getElementById('breadcrumb-product');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', `${product.name} - ${product.fullDescription.substring(0, 150)}...`);
    }
}

// ============================================
// PRODUCT RENDERING
// ============================================

function renderProductDetail() {
    const product = pageState.product;
    const variation = pageState.selectedVariation;
    
    const badgeHtml = product.bestseller 
        ? '<span class="badge-bestseller" aria-label="Produto mais vendido">🔥 Mais Vendido</span>' 
        : '';
    
    const variationsHtml = product.variations ? renderVariations() : '';
    const servings = variation?.servings || product.servings;
    const currentPrice = variation?.price || product.price;
    const currentImage = variation?.image || product.image;
    
    const detailHtml = `
        <div class="product-detail-content">
            <!-- Product Image -->
            <div class="product-detail-image">
                ${badgeHtml}
                <img id="product-image" 
                     src="${getImageUrl(currentImage)}" 
                     alt="${escapeHtml(product.name)}"
                     loading="eager">
            </div>
            
            <!-- Product Info -->
            <div class="product-detail-info">
                <h1 id="product-title">${escapeHtml(product.name)}</h1>
                
                <div class="product-price" aria-label="Preço: R$ ${formatPrice(currentPrice)}">
                    R$ <span id="product-price">${formatPrice(currentPrice)}</span>
                </div>
                
                ${variationsHtml}
                
                <p class="product-detail-description">
                    ${escapeHtml(product.fullDescription)}
                </p>
                
                <!-- Benefits -->
                <div class="benefits-list">
                    <h3>✨ Benefícios Principais</h3>
                    <ul>
                        ${product.benefits.map(benefit => 
                            `<li>${escapeHtml(benefit)}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <!-- Specifications -->
                <div class="product-specs">
                    <h3>📋 Especificações</h3>
                    <div class="spec-item">
                        <span class="spec-label">Dosagem por Porção:</span>
                        <span class="spec-value">${escapeHtml(product.serving)}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Quantidade de Porções:</span>
                        <span class="spec-value" id="spec-servings">${escapeHtml(servings)}</span>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="product-actions-detail">
                    <button class="btn btn-secondary" 
                            onclick="goBack()"
                            aria-label="Voltar para página anterior">
                        ← Voltar
                    </button>
                    <button class="btn btn-success" 
                            onclick="buyProductVariation()"
                            aria-label="Comprar ${escapeHtml(product.name)}">
                        🛒 Comprar Agora
                    </button>
                </div>
                
                <!-- Important Notice -->
                <div style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border: 2px solid var(--accent); border-radius: var(--radius-xl); font-size: 0.9375rem; color: #92400E;">
                    <strong>⚠️ Aviso Importante:</strong> Você será redirecionado para o site oficial do produto para finalizar sua compra com total segurança. Clique no botão "Comprar Agora" acima.
                </div>
            </div>
        </div>
    `;
    
    DOM.productDetail.innerHTML = detailHtml;
}

/**
 * Render product variations in e-commerce style
 */
function renderVariations() {
    const product = pageState.product;
    
    if (!product.variations || product.variations.length === 0) {
        return '';
    }
    
    const variationsHtml = product.variations.map((variation, index) => {
        const isSelected = pageState.selectedVariation?.id === variation.id;
        const badgeHtml = variation.badge 
            ? `<span class="variation-badge">${variation.badge}</span>` 
            : '';
        
        return `
            <label class="variation-option ${isSelected ? 'selected' : ''}" 
                   for="variation-${variation.id}">
                <input type="radio" 
                       id="variation-${variation.id}"
                       name="variation" 
                       value="${variation.id}" 
                       ${isSelected ? 'checked' : ''} 
                       onchange="selectVariation('${variation.id}')"
                       aria-label="Selecionar ${escapeHtml(variation.label)}">
                <span class="variation-button">
                    <span class="variation-label">${escapeHtml(variation.label)}</span>
                    ${badgeHtml}
                </span>
            </label>
        `;
    }).join('');
    
    return `
        <div class="product-variations">
            <h3>📦 Escolha sua Quantidade:</h3>
            <div class="variations-options">
                ${variationsHtml}
            </div>
        </div>
    `;
}

// ============================================
// VARIATION SELECTION
// ============================================

function selectVariation(variationId) {
    const product = pageState.product;
    const variation = product.variations.find(v => v.id === variationId);
    
    if (!variation) return;
    
    pageState.selectedVariation = variation;
    
    // Update image with smooth transition
    const imageEl = document.getElementById('product-image');
    if (imageEl) {
        imageEl.style.opacity = '0.5';
        setTimeout(() => {
            imageEl.src = getImageUrl(variation.image);
            imageEl.style.opacity = '1';
        }, 150);
    }
    
    // Update price
    const priceEl = document.getElementById('product-price');
    if (priceEl) {
        priceEl.textContent = formatPrice(variation.price);
    }
    
    // Update servings
    const servingsEl = document.getElementById('spec-servings');
    if (servingsEl && variation.servings) {
        servingsEl.textContent = variation.servings;
    }
    
    // Update visual selection
    const options = document.querySelectorAll('.variation-option');
    options.forEach(option => {
        option.classList.remove('selected');
        const input = option.querySelector('input');
        if (input && input.value === variationId) {
            option.classList.add('selected');
        }
    });
    
    // Track variation selection
    trackVariationSelection(variation);
}

// ============================================
// RELATED PRODUCTS
// ============================================

function renderRelatedProducts() {
    if (pageState.relatedProducts.length === 0) {
        DOM.relatedGrid.parentElement.style.display = 'none';
        return;
    }
    
    DOM.relatedGrid.innerHTML = '';
    
    pageState.relatedProducts.forEach((product, index) => {
        const card = createRelatedProductCard(product, index);
        DOM.relatedGrid.appendChild(card);
    });
}

function createRelatedProductCard(product, index) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('role', 'listitem');
    card.style.animationDelay = `${index * 0.1}s`;
    
    const badgeHtml = product.bestseller 
        ? '<span class="badge-bestseller" aria-label="Produto mais vendido">🔥 Mais Vendido</span>' 
        : '';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${getImageUrl(product.image)}" 
                 alt="${escapeHtml(product.name)}" 
                 loading="lazy">
            ${badgeHtml}
        </div>
        <div class="product-info">
            <h3 class="product-name">${escapeHtml(product.name)}</h3>
            <p class="product-description">${escapeHtml(product.description)}</p>
            <div class="product-price" aria-label="Preço: R$ ${formatPrice(product.price)}">
                R$ ${formatPrice(product.price)}
            </div>
            <div class="product-actions">
                <button class="btn btn-secondary" 
                        onclick="viewProduct(${product.id})"
                        aria-label="Ver detalhes de ${escapeHtml(product.name)}">
                    Ver Detalhes
                </button>
                <button class="btn btn-primary" 
                        onclick="buyProduct('${product.affiliate_link}', '${escapeHtml(product.name)}')"
                        aria-label="Comprar ${escapeHtml(product.name)}">
                    Comprar
                </button>
            </div>
        </div>
    `;
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.product-actions')) {
            viewProduct(product.id);
        }
    });
    
    return card;
}

// ============================================
// NAVIGATION & ACTIONS
// ============================================

function viewProduct(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const slug = product?.slug || generateProductSlug(product?.name || '');
    window.location.href = `product.html?id=${productId}&slug=${slug}`;
}

function generateProductSlug(productName) {
    return productName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
}

function buyProductVariation() {
    const variation = pageState.selectedVariation;
    const product = pageState.product;
    
    const link = variation ? variation.affiliate_link : product.affiliate_link;
    const name = variation ? `${product.name} - ${variation.label}` : product.name;
    
    window.open(link, '_blank', 'noopener,noreferrer');
    trackAffiliateClick(link, name, variation);
}

function buyProduct(affiliateLink, productName) {
    window.open(affiliateLink, '_blank', 'noopener,noreferrer');
    trackAffiliateClick(affiliateLink, productName);
}

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// ============================================
// ERROR HANDLING
// ============================================

function showErrorAndRedirect(message) {
    DOM.productDetail.innerHTML = `
        <div style="text-align: center; padding: var(--spacing-3xl); background: var(--white); border-radius: var(--radius-2xl); box-shadow: var(--shadow-lg);">
            <h2 style="color: var(--danger); font-size: 2rem; margin-bottom: var(--spacing-md);">😔 Ops!</h2>
            <p style="color: var(--gray-600); font-size: 1.125rem; margin-bottom: var(--spacing-xl);">${escapeHtml(message)}</p>
            <button class="btn btn-primary" onclick="window.location.href='index.html'">
                🏠 Voltar para Home
            </button>
        </div>
    `;
}

// ============================================
// ANALYTICS & TRACKING
// ============================================

function trackProductView() {
    const product = pageState.product;
    
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'product_view',
            'product_id': product.id,
            'product_name': product.name,
            'product_price': product.price,
            'event_category': 'product',
            'event_action': 'view_details'
        });
    }
    
    console.log('📊 Produto visualizado:', product.name);
}

function trackVariationSelection(variation) {
    const product = pageState.product;
    
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'variation_selected',
            'product_id': product.id,
            'product_name': product.name,
            'variation_id': variation.id,
            'variation_label': variation.label,
            'variation_price': variation.price,
            'event_category': 'product',
            'event_action': 'select_variation'
        });
    }
    
    console.log('📦 Variação selecionada:', variation.label);
}

function trackAffiliateClick(link, productName, variation = null) {
    const product = pageState.product;
    
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'affiliate_click',
            'product_id': product.id,
            'product_name': productName,
            'variation_id': variation ? variation.id : null,
            'variation_label': variation ? variation.label : null,
            'variation_price': variation ? variation.price : product.price,
            'affiliate_link': link,
            'event_category': 'affiliate',
            'event_action': 'purchase_click',
            'event_label': productName
        });
    }
    
    // Local storage for analytics
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    clicks.push({
        productId: product.id,
        productName: productName,
        variation: variation ? variation.label : null,
        link: link,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
    
    console.log('🔗 Clique em afiliado:', productName);
}

// ============================================
// EXPORT FOR GLOBAL ACCESS
// ============================================

window.selectVariation = selectVariation;
window.buyProductVariation = buyProductVariation;
window.buyProduct = buyProduct;
window.viewProduct = viewProduct;
window.goBack = goBack;

// Made with Bob
