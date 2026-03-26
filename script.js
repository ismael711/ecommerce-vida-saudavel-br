/**
 * Suplementos Premium - Main JavaScript
 * Gerencia a página inicial com listagem de produtos
 */

// Estado da aplicação
const appState = {
    products: [],
    filteredProducts: [],
    currentFilter: 'all',
    loading: true
};

// Referências ao DOM
const productsGrid = document.getElementById('products-grid');
const loadingEl = document.getElementById('loading');
const emptyStateEl = document.getElementById('empty-state');
const filterBtns = document.querySelectorAll('.filter-btn');

/**
 * Inicializa a aplicação ao carregar o DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Função principal de inicialização
 */
async function initializeApp() {
    try {
        // Carrega os produtos
        appState.products = await fetchProducts();
        appState.filteredProducts = appState.products;
        
        // Renderiza o produto destaque (featured)
        renderFeaturedProduct();
        
        // Renderiza os produtos
        renderProducts(appState.filteredProducts);
        
        // Oculta o loading
        loadingEl.style.display = 'none';
        
        // Configura event listeners
        setupEventListeners();
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
        showErrorMessage();
    }
}

/**
 * Renderiza a seção hero com o produto destaque
 */
function renderFeaturedProduct() {
    const featuredHeroEl = document.getElementById('featured-hero');
    
    // Busca o produto destaque pela configuração
    const featuredProduct = appState.products.find(p => p.featured);
    
    if (!featuredProduct) {
        featuredHeroEl.style.display = 'none';
        return;
    }
    
    const featuredHtml = `
        <div class="featured-hero-content">
            <div class="featured-hero-image">
                <img src="${featuredProduct.image}" alt="${featuredProduct.name}" loading="lazy">
            </div>
            
            <div class="featured-hero-info">
                <h2>${escapeHtml(featuredProduct.name)}</h2>
                <p class="featured-hero-description">${escapeHtml(featuredProduct.description)}</p>
                
                <div class="featured-hero-price">
                    R$ ${featuredProduct.price.toFixed(2).replace('.', ',')}
                </div>
                
                <div class="featured-hero-benefits">
                    <h4>Principais Benefícios:</h4>
                    <ul>
                        ${featuredProduct.benefits.map(benefit => 
                            `<li>${escapeHtml(benefit)}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="featured-hero-cta">
                    <button class="btn btn-featured btn-featured-secondary" onclick="viewProduct(${featuredProduct.id})">
                        ℹ️ Saiba Mais
                    </button>
                    <button class="btn btn-featured btn-featured-primary" onclick="buyFeaturedProduct('${featuredProduct.affiliate_link}')">
                        🎁 Comprar com Desconto
                    </button>
                </div>
            </div>
        </div>
    `;
    
    featuredHeroEl.innerHTML = featuredHtml;
}

/**
 * Função específica para compra do produto destaque
 */
function buyFeaturedProduct(affiliateLink) {
    window.open(affiliateLink, '_blank');
    trackAffiliateClick(affiliateLink);
}
function renderProducts(products) {
    // Limpa a grid
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        emptyStateEl.style.display = 'block';
        productsGrid.style.display = 'none';
        return;
    }
    
    emptyStateEl.style.display = 'none';
    productsGrid.style.display = 'grid';
    
    // Cria cards para cada produto
    products.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}

/**
 * Cria um card de produto
 */
function createProductCard(product) {
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
    
    // Event listener para clique no card (redireciona para detalhes)
    card.addEventListener('click', (e) => {
        // Evita redirecionar se clicou nos botões
        if (!e.target.closest('.product-actions')) {
            viewProduct(product.id);
        }
    });
    
    return card;
}

/**
 * Configura os event listeners dos filtros
 */
function setupEventListeners() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove classe active de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Adiciona active ao botão clicado
            btn.classList.add('active');
            
            // Aplica o filtro
            const filter = btn.getAttribute('data-filter');
            applyFilter(filter);
        });
    });
}

/**
 * Aplica o filtro de produtos
 */
function applyFilter(filter) {
    appState.currentFilter = filter;
    appState.filteredProducts = filterProducts(filter);
    renderProducts(appState.filteredProducts);
    
    // Scroll suave para a grid
    scrollToProducts();
}

/**
 * Redireciona para a página de detalhes do produto
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
    
    // Tracking simples (pode ser expandido para Google Analytics)
    trackAffiliateClick(affiliateLink);
}

/**
 * Função de scroll suave para produtos
 */
function scrollToProducts() {
    const productsSection = document.querySelector('.products-section');
    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
 * Mostra mensagem de erro
 */
function showErrorMessage() {
    loadingEl.innerHTML = '<p style="color: #E74C3C;">Erro ao carregar produtos. Tente novamente mais tarde.</p>';
}

/**
 * Rastreia cliques em links de afiliados (preparado para Google Analytics)
 */
function trackAffiliateClick(link) {
    // Implementação básica - pode ser expandida com Google Analytics
    // Exemplo: ga('send', 'event', 'affiliate', 'click', link);
    console.log('Clique em afiliado:', link);
    
    // Armazena em localStorage para futuras análises
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    clicks.push({
        link: link,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
}

/**
 * Função auxiliar: busca produto por ID (para futuros usos)
 */
function getProductById(id) {
    return appState.products.find(p => p.id === parseInt(id));
}

/**
 * Função auxiliar: busca produtos por filtro
 */
function getProductsByFilter(filter) {
    if (filter === 'bestseller') {
        return appState.products.filter(p => p.bestseller);
    }
    return appState.products;
}
