/**
 * Vida Saudável BR - Enhanced JavaScript
 * Modern, Performant, High-Conversion
 * Features: Lazy Loading, Intersection Observer, Smooth Animations
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

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// APPLICATION STATE
// ============================================

const appState = {
    products: [],
    filteredProducts: [],
    currentFilter: 'all',
    loading: true,
    observer: null
};

// ============================================
// DOM REFERENCES
// ============================================

const DOM = {
    productsGrid: document.getElementById('products-grid'),
    loadingEl: document.getElementById('loading'),
    emptyStateEl: document.getElementById('empty-state'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    featuredHero: document.getElementById('featured-hero'),
    logoImg: document.getElementById('site-logo')
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupIntersectionObserver();
    setupAccessibility();
});

/**
 * Main initialization function
 */
async function initializeApp() {
    try {
        // Load logo
        if (DOM.logoImg) {
            DOM.logoImg.src = getImageUrl(window.CONFIG.BRANDING.logoPath);
        }

        // Fetch products
        appState.products = await fetchProducts();
        appState.filteredProducts = appState.products;
        
        // Render featured product
        renderFeaturedProduct();
        
        // Render products
        renderProducts(appState.filteredProducts);
        
        // Hide loading
        DOM.loadingEl.style.display = 'none';
        
        // Setup event listeners
        setupEventListeners();
        
        // Track page view
        trackPageView();
        
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
        showErrorMessage();
    }
}

// ============================================
// INTERSECTION OBSERVER (Lazy Loading)
// ============================================

function setupIntersectionObserver() {
    const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    appState.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    appState.observer.unobserve(img);
                }
            }
        });
    }, options);
}

// ============================================
// FEATURED PRODUCT RENDERING
// ============================================

function renderFeaturedProduct() {
    const featuredProduct = appState.products.find(p => p.featured);
    
    if (!featuredProduct) {
        DOM.featuredHero.style.display = 'none';
        return;
    }
    
    const benefitsList = featuredProduct.benefits
        .map(benefit => `<li>${escapeHtml(benefit)}</li>`)
        .join('');
    
    const featuredHtml = `
        <div class="featured-hero-content">
            <div class="featured-hero-image">
                <img src="${getImageUrl(featuredProduct.image)}" 
                     alt="${escapeHtml(featuredProduct.name)}" 
                     loading="eager">
            </div>
            
            <div class="featured-hero-info">
                <h2 id="featured-title">${escapeHtml(featuredProduct.name)}</h2>
                <p class="featured-hero-description">${escapeHtml(featuredProduct.description)}</p>
                
                <div class="featured-hero-price" aria-label="Preço: R$ ${formatPrice(featuredProduct.price)}">
                    R$ ${formatPrice(featuredProduct.price)}
                </div>
                
                <div class="featured-hero-benefits">
                    <h4>✨ Principais Benefícios:</h4>
                    <ul>${benefitsList}</ul>
                </div>
                
                <div class="featured-hero-cta">
                    <button class="btn btn-featured btn-featured-secondary" 
                            onclick="viewProduct(${featuredProduct.id})"
                            aria-label="Ver mais detalhes sobre ${escapeHtml(featuredProduct.name)}">
                        ℹ️ Saiba Mais
                    </button>
                    <button class="btn btn-featured btn-featured-primary" 
                            onclick="buyFeaturedProduct('${featuredProduct.affiliate_link}', '${escapeHtml(featuredProduct.name)}')"
                            aria-label="Comprar ${escapeHtml(featuredProduct.name)} com desconto">
                        🎁 Comprar com Desconto
                    </button>
                </div>
            </div>
        </div>
    `;
    
    DOM.featuredHero.innerHTML = featuredHtml;
    
    // Add fade-in animation
    DOM.featuredHero.classList.add('fade-in');
}

/**
 * Handle featured product purchase
 */
function buyFeaturedProduct(affiliateLink, productName) {
    trackAffiliateClick(affiliateLink, productName, 'featured');
    window.open(affiliateLink, '_blank', 'noopener,noreferrer');
}

// ============================================
// PRODUCTS RENDERING
// ============================================

function renderProducts(products) {
    DOM.productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        DOM.emptyStateEl.style.display = 'block';
        DOM.productsGrid.style.display = 'none';
        return;
    }
    
    DOM.emptyStateEl.style.display = 'none';
    DOM.productsGrid.style.display = 'grid';
    
    // Create product cards
    products.forEach((product, index) => {
        const card = createProductCard(product, index);
        DOM.productsGrid.appendChild(card);
    });
}

/**
 * Create enhanced product card
 */
function createProductCard(product, index) {
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
                    Comprar Agora
                </button>
            </div>
        </div>
    `;
    
    // Add click handler for card (excluding buttons)
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.product-actions')) {
            viewProduct(product.id);
        }
    });
    
    // Add hover effect with micro-interaction
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
    
    return card;
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Filter buttons
    DOM.filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Keyboard navigation for filters
    DOM.filterBtns.forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFilterClick.call(btn);
            }
        });
    });
    
    // Smooth scroll to top button (if needed)
    window.addEventListener('scroll', debounce(handleScroll, 100));
}

function handleFilterClick() {
    // Remove active from all buttons
    DOM.filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    
    // Add active to clicked button
    this.classList.add('active');
    this.setAttribute('aria-pressed', 'true');
    
    // Apply filter
    const filter = this.getAttribute('data-filter');
    applyFilter(filter);
}

function handleScroll() {
    // Add scroll-based animations or effects here if needed
    const scrolled = window.pageYOffset;
    
    // Example: Add shadow to header on scroll
    const header = document.querySelector('.header');
    if (scrolled > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    }
}

// ============================================
// FILTER LOGIC
// ============================================

function applyFilter(filter) {
    appState.currentFilter = filter;
    appState.filteredProducts = filterProducts(filter);
    renderProducts(appState.filteredProducts);
    
    // Smooth scroll to products
    scrollToProducts();
    
    // Track filter usage
    trackFilterUsage(filter);
}

function filterProducts(filter) {
    if (filter === 'bestseller') {
        return appState.products.filter(p => p.bestseller);
    }
    return appState.products;
}

// ============================================
// NAVIGATION
// ============================================

function viewProduct(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const slug = product?.slug || generateProductSlug(product?.name || '');
    
    // Track product view
    trackProductView(product);
    
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

function buyProduct(affiliateLink, productName) {
    trackAffiliateClick(affiliateLink, productName, 'grid');
    window.open(affiliateLink, '_blank', 'noopener,noreferrer');
}

function scrollToProducts() {
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

function setupAccessibility() {
    // Announce dynamic content changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    window.announceToScreenReader = (message) => {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// ============================================
// ANALYTICS & TRACKING
// ============================================

function trackPageView() {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'page_view',
            'page_title': document.title,
            'page_location': window.location.href
        });
    }
}

function trackAffiliateClick(link, productName, location) {
    console.log(`🔗 Clique em afiliado: ${productName} (${location})`);
    
    // Google Tag Manager
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'affiliate_click',
            'product_name': productName,
            'affiliate_link': link,
            'click_location': location,
            'timestamp': new Date().toISOString()
        });
    }
    
    // Local storage for analytics
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    clicks.push({
        product: productName,
        link: link,
        location: location,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
}

function trackProductView(product) {
    if (typeof dataLayer !== 'undefined' && product) {
        dataLayer.push({
            'event': 'product_view',
            'product_id': product.id,
            'product_name': product.name,
            'product_price': product.price
        });
    }
}

function trackFilterUsage(filter) {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'filter_used',
            'filter_type': filter
        });
    }
}

// ============================================
// ERROR HANDLING
// ============================================

function showErrorMessage() {
    DOM.loadingEl.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <p style="color: #EF4444; font-size: 1.125rem; margin-bottom: 1rem;">
                😔 Ops! Algo deu errado ao carregar os produtos.
            </p>
            <button onclick="location.reload()" class="btn btn-primary">
                🔄 Tentar Novamente
            </button>
        </div>
    `;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getProductById(id) {
    return appState.products.find(p => p.id === parseInt(id));
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log performance metrics
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Página carregada em ${pageLoadTime}ms`);
    }
});

// ============================================
// EXPORT FOR GLOBAL ACCESS
// ============================================

window.viewProduct = viewProduct;
window.buyProduct = buyProduct;
window.buyFeaturedProduct = buyFeaturedProduct;

// Made with Bob
