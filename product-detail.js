/**
 * Vida Saudável BR - Página de Detalhes do Produto
 * Gerencia a exibição de detalhes individuais dos produtos
 */

// Estado da página
const pageState = {
    product: null,
    relatedProducts: [],
    loading: true
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
    
    const badgeHtml = product.bestseller 
        ? '<span class="badge-bestseller">🔥 Mais Vendido</span>' 
        : '';
    
    const detailHtml = `
        <div class="product-detail-content">
            <div class="product-detail-image">
                ${badgeHtml}
                <img src="${product.image}" alt="${product.name}">
            </div>
            
            <div class="product-detail-info">
                <h1>${escapeHtml(product.name)}</h1>
                
                <div class="product-price">
                    R$ ${product.price.toFixed(2).replace('.', ',')}
                </div>
                
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
                        <span class="spec-value">${escapeHtml(product.servings)}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Compatível com:</span>
                        <span class="spec-value">GitHub Pages</span>
                    </div>
                </div>
                
                <div class="product-actions-detail">
                    <button class="btn btn-secondary" onclick="goBack()">← Voltar</button>
                    <button class="btn btn-success" onclick="buyProduct('${product.affiliate_link}')">
                        🛒 Comprar Agora - R$ ${product.price.toFixed(2).replace('.', ',')}
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
            <img src="${product.image}" alt="${product.name}" loading="lazy">
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
    window.location.href = `product.html?id=${productId}`;
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
function trackAffiliateClick(link) {
    console.log('Clique em afiliado:', link);
    
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    clicks.push({
        productId: pageState.product.id,
        productName: pageState.product.name,
        link: link,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
}
