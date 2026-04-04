/**
 * Vida Saudável BR - Página de Detalhes do Produto
 * Gerencia a exibição de detalhes individuais dos produtos
 */

// Carregar logo ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    const logoImg = document.getElementById('site-logo');
    if (logoImg) {
        logoImg.src = getImageUrl(window.CONFIG.BRANDING.logoPath);
    }
});

// Helper function para resolver URLs de imagem
function getImageUrl(imagePath) {
    if (!imagePath) return '';
    // Se já é URL externa (http/https), retorna como está
    if (imagePath.startsWith('http')) return imagePath;
    // Normaliza caminho relativo
    imagePath = imagePath.replace(/^\.\//, '');
    return window.CONFIG.baseUrl + '/' + imagePath;
}

// Estado da página
const pageState = {
    product: null,
    relatedProducts: [],
    loading: true,
    selectedVariation: null  // Rastreia variação selecionada
};

// Referências ao DOM
const productDetailEl = document.getElementById('product-detail');
const relatedGridEl = document.getElementById('related-grid');

/**
 * Inicializa a página de detalhes ao carregar
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeProductPage();
});

/**
 * Função principal de inicialização
 */
async function initializeProductPage() {
    try {
        // Obtém o ID do produto da URL
        const productId = getProductIdFromUrl();
        
        if (!productId) {
            showErrorAndRedirect('Produto não encontrado');
            return;
        }
        
        // Carrega os produtos
        await fetchProducts();
        
        // Obtém o produto específico
        pageState.product = getProductById(productId);
        
        if (!pageState.product) {
            showErrorAndRedirect('Produto não encontrado');
            return;
        }
        
        // Atualiza título e meta tags
        updatePageMeta();
        
        // Renderiza o produto
        renderProductDetail();
        
        // Carrega produtos relacionados
        pageState.relatedProducts = getRelatedProducts(productId, 3);
        renderRelatedProducts();
        
        // Rastreia visualização de produto no GTM
        if (typeof trackCustomEvent === 'function') {
            trackCustomEvent('product_viewed', {
                'productId': pageState.product.id,
                'productName': pageState.product.name,
                'productPrice': pageState.product.price,
                'eventCategory': 'product',
                'eventAction': 'view_details'
            });
        }
        
    } catch (error) {
        console.error('Erro ao carregar página:', error);
        showErrorAndRedirect('Erro ao carregar produto');
    }
}

/**
 * Obtém o ID do produto da query string
 */
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

/**
 * Gera slug para URL baseado no nome do produto
 */
function generateProductSlug(productName) {
    return productName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
}

/**
 * Atualiza meta tags da página com informações do produto
 */
function updatePageMeta() {
    const product = pageState.product;
    
    // Atualiza título
    document.title = `${product.name} - Vida Saudável BR`;
    
    // Atualiza breadcrumb
    document.getElementById('breadcrumb-product').textContent = product.name;
    
    // Atualiza meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', `${product.name} - ${product.fullDescription.substring(0, 150)}...`);
    }
}

/**
 * Renderiza os detalhes do produto
 */
function renderProductDetail() {
    const product = pageState.product;
    
    // Inicializa com a primeira variação se disponível
    if (product.variations && product.variations.length > 0) {
        pageState.selectedVariation = product.variations[0];
    }
    
    const badgeHtml = product.bestseller 
        ? '<span class="badge-bestseller">🔥 Mais Vendido</span>' 
        : '';
    
    // HTML das variações se existirem
    const variationsHtml = product.variations ? `
        <div class="product-variations">
            <h3>Escolha sua Quantidade:</h3>
            <div class="variations-options">
                ${product.variations.map((variation, index) => `
                    <label class="variation-option ${index === 0 ? 'selected' : ''}">
                        <input type="radio" name="variation" value="${variation.id}" 
                               ${index === 0 ? 'checked' : ''} 
                               onchange="selectVariation('${variation.id}')">
                        <span class="variation-button">
                            <span class="variation-label">${escapeHtml(variation.label)}</span>
                            ${variation.badge ? `<span class="variation-badge">${variation.badge}</span>` : ''}
                        </span>
                    </label>
                `).join('')}
            </div>
        </div>
    ` : '';
    
    // Obter servings da variação ou produto
    const servings = pageState.selectedVariation?.servings || product.servings;
    
    const detailHtml = `
        <div class="product-detail-content">
            <div class="product-detail-image">
                ${badgeHtml}
                <img id="product-image" src="${getImageUrl(pageState.selectedVariation ? pageState.selectedVariation.image : product.image)}" alt="${product.name}">
            </div>
            
            <div class="product-detail-info">
                <h1>${escapeHtml(product.name)}</h1>
                
                <div class="product-price">
                    R$ <span id="product-price">${(pageState.selectedVariation ? pageState.selectedVariation.price : product.price).toFixed(2).replace('.', ',')}</span>
                </div>
                
                ${variationsHtml}
                
                <p class="product-detail-description">
                    ${escapeHtml(product.fullDescription)}
                </p>
                
                <div class="benefits-list">
                    <h3>Benefícios Principais</h3>
                    <ul>
                        ${product.benefits.map(benefit => 
                            `<li>${escapeHtml(benefit)}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="product-specs">
                    <h3>Especificações</h3>
                    <div class="spec-item">
                        <span class="spec-label">Dosagem por Porção:</span>
                        <span class="spec-value">${escapeHtml(product.serving)}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Quantidade de Porções:</span>
                        <span class="spec-value" id="spec-servings">${escapeHtml(servings)}</span>
                    </div>
                </div>
                
                <div class="product-actions-detail">
                    <button class="btn btn-secondary" onclick="goBack()">← Voltar</button>
                    <button class="btn btn-success" onclick="buyProductVariation()">
                        🛒 Comprar Agora
                    </button>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #FFF3CD; border-radius: 8px; font-size: 0.9rem;">
                    <strong>⚠️ Aviso Importante:</strong> Você será redirecionado para o site oficial do produto para finalizar sua compra. Clique no botão "Comprar Agora" acima.
                </div>
            </div>
        </div>
    `;
    
    productDetailEl.innerHTML = detailHtml;
}

/**
 * Renderiza produtos relacionados
 */
function renderRelatedProducts() {
    if (pageState.relatedProducts.length === 0) {
        relatedGridEl.style.display = 'none';
        return;
    }
    
    relatedGridEl.innerHTML = '';
    
    pageState.relatedProducts.forEach(product => {
        const card = createRelatedProductCard(product);
        relatedGridEl.appendChild(card);
    });
}

/**
 * Cria card para produtos relacionados
 */
function createRelatedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const badgeHtml = product.bestseller 
        ? '<span class="badge-bestseller">🔥 Mais Vendido</span>' 
        : '';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${getImageUrl(product.image)}" alt="${product.name}" loading="lazy">
            ${badgeHtml}
        </div>
        <div class="product-info">
            <h3 class="product-name">${escapeHtml(product.name)}</h3>
            <p class="product-description">${escapeHtml(product.description)}</p>
            <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            <div class="product-actions">
                <button class="btn btn-secondary" onclick="viewProduct(${product.id})">Ver Detalhes</button>
                <button class="btn btn-primary" onclick="buyProduct('${product.affiliate_link}')">Comprar</button>
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

/**
 * Redireciona para a página de detalhes de outro produto
 */
function viewProduct(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const slug = product?.slug || generateProductSlug(product?.name || '');
    window.location.href = `product.html?id=${productId}&slug=${slug}`;
}

/**
 * Seleciona uma variação de produto
 */
function selectVariation(variationId) {
    const product = pageState.product;
    const variation = product.variations.find(v => v.id === variationId);
    
    if (!variation) return;
    
    pageState.selectedVariation = variation;
    
    // Rastreia seleção de variação no GTM
    if (typeof trackCustomEvent === 'function') {
        trackCustomEvent('variation_selected', {
            'productId': product.id,
            'productName': product.name,
            'variationId': variationId,
            'variationLabel': variation.label,
            'variationPrice': variation.price,
            'eventCategory': 'product',
            'eventAction': 'select_variation'
        });
    }
    
    // Atualiza imagem
    const imageEl = document.getElementById('product-image');
    if (imageEl) {
        imageEl.src = getImageUrl(variation.image);
    }
    
    // Atualiza preço no display
    const priceEl = document.getElementById('product-price');
    if (priceEl) {
        priceEl.textContent = variation.price.toFixed(2).replace('.', ',');
    }
    
    // Atualiza especificações (servings)
    const servingsEl = document.getElementById('spec-servings');
    if (servingsEl && variation.servings) {
        servingsEl.textContent = variation.servings;
    }
    
    // Atualiza visual dos botões
    const options = document.querySelectorAll('.variation-option');
    options.forEach(option => {
        option.classList.remove('selected');
        const input = option.querySelector('input');
        if (input && input.value === variationId) {
            option.classList.add('selected');
        }
    });
}

/**
 * Redireciona para o link de afiliado com variação selecionada
 */
function buyProductVariation() {
    const variation = pageState.selectedVariation;
    
    if (!variation) {
        buyProduct(pageState.product.affiliate_link);
        return;
    }
    
    // Abre em nova aba
    window.open(variation.affiliate_link, '_blank');
    
    // Rastreia o clique
    trackAffiliateClick(variation.affiliate_link, variation);
}

/**
 * Redireciona para o link de afiliado
 */
function buyProduct(affiliateLink) {
    // Abre em nova aba
    window.open(affiliateLink, '_blank');
    
    // Rastreia o clique
    trackAffiliateClick(affiliateLink);
}

/**
 * Volta para a página anterior
 */
function goBack() {
    window.history.back();
}

/**
 * Escapa caracteres especiais HTML
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Mostra erro e redireciona
 */
function showErrorAndRedirect(message) {
    productDetailEl.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h2 style="color: #E74C3C;">Erro</h2>
            <p>${escapeHtml(message)}</p>
            <button class="btn btn-secondary" onclick="window.location.href='index.html'">
                Voltar para Home
            </button>
        </div>
    `;
}

/**
 * Rastreia cliques em links de afiliados
 */
function trackAffiliateClick(link, variation = null) {
    const product = pageState.product;
    
    console.log('Clique em afiliado:', link);
    
    // Rastreia no GTM
    if (typeof trackCustomEvent === 'function') {
        trackCustomEvent('affiliate_purchase', {
            'productId': product.id,
            'productName': product.name,
            'variationId': variation ? variation.id : null,
            'variationLabel': variation ? variation.label : null,
            'variationPrice': variation ? variation.price : product.price,
            'affiliateLink': link,
            'eventCategory': 'affiliate',
            'eventAction': 'purchase_click',
            'eventLabel': product.name
        });
    }
    
    // Armazena em localStorage para futuras análises
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    clicks.push({
        productId: product.id,
        productName: product.name,
        variation: variation ? variation.label : null,
        link: link,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
}
