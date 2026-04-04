/**
 * Google Tag Manager Configuration
 * Configuração de variáveis padrões e eventos de rastreamento de cliques
 * 
 * Este arquivo initializa o data layer e configura listeners para capturar
 * as variáveis padrões do GTM como Click URL, Click Text, Click Element, etc.
 */

// Inicializa o data layer se não existir
window.dataLayer = window.dataLayer || [];

/**
 * Função auxiliar para fazer push ao data layer
 */
function pushDataLayer(data) {
    window.dataLayer.push(data);
    console.log('[GTM] Data Layer Push:', data);
}

/**
 * Configuração padrão de variáveis do GTM
 */
const GTM_CONFIG = {
    // Variáveis padrões de cliques que o GTM captura
    clickVariables: {
        'Click URL': null,
        'Click Text': null,
        'Click Element': null,
        'Click Classes': null,
        'Click ID': null,
        'Click Target': null,
        'Click URL hostname': null
    },
    
    // Tipos de eventos a rastrear
    events: {
        AFFILIATE_CLICK: 'affiliate_purchase',
        VIEW_PRODUCT: 'view_product_details',
        FILTER_APPLIED: 'filter_applied',
        FEATURED_CLICK: 'featured_product_click',
        ADD_TO_CART: 'add_to_cart'
    },
    
    // Categorias de eventos
    categories: {
        AFFILIATE: 'affiliate',
        PRODUCT: 'product',
        FILTER: 'filter',
        ENGAGEMENT: 'engagement'
    }
};

/**
 * Inicializa listeners globais para cliques
 * Captura automaticamente as variáveis padrões do GTM
 */
function initializeClickTracking() {
    document.addEventListener('click', function(event) {
        const target = event.target.closest('a, button, [role="button"]');
        
        if (!target) return;
        
        // Extrai informações do elemento clicado
        const clickData = {
            'Click URL': target.href || target.getAttribute('data-link') || '',
            'Click Text': target.textContent?.trim() || '',
            'Click Element': target.tagName.toLowerCase(),
            'Click Classes': target.className || '',
            'Click ID': target.id || '',
            'Click Target': target.target || '_self'
        };
        
        // Extrai hostname se houver URL
        if (clickData['Click URL']) {
            try {
                clickData['Click URL hostname'] = new URL(clickData['Click URL']).hostname;
            } catch (e) {
                clickData['Click URL hostname'] = 'internal';
            }
        }
        
        // Verifica se é um clique em elemento de compra/afiliado
        if (isAffiliateClick(target)) {
            trackAffiliateClick(target, clickData);
        }
        
        // Verifica se é um clique em produto
        if (isProductClick(target)) {
            trackProductClick(target, clickData);
        }
        
        // Verifica se é um filtro
        if (isFilterClick(target)) {
            trackFilterClick(target, clickData);
        }
    }, true); // Usa capture para garantir que capture antes
}

/**
 * Detecta se o clique é em um elemento de compra (afiliado)
 */
function isAffiliateClick(element) {
    return element.classList.contains('btn-primary') || 
           element.classList.contains('btn-featured-primary') ||
           element.getAttribute('onclick')?.includes('buyProduct') ||
           element.getAttribute('onclick')?.includes('buyFeaturedProduct');
}

/**
 * Detecta se o clique é em um elemento de produto
 */
function isProductClick(element) {
    return element.classList.contains('btn-secondary') ||
           element.classList.contains('btn-featured-secondary') ||
           element.getAttribute('onclick')?.includes('viewProduct') ||
           element.closest('.product-card') ||
           element.closest('.featured-hero-content');
}

/**
 * Detecta se o clique é em um filtro
 */
function isFilterClick(element) {
    return element.classList.contains('filter-btn');
}

/**
 * Rastreia cliques em links de afiliados
 */
function trackAffiliateClick(element, clickData) {
    const affiliateLink = element.href || 
                         element.getAttribute('data-link') ||
                         element.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || '';
    
    // Extrai informações do elemento pai (produto)
    const productCard = element.closest('.product-card') || element.closest('.featured-hero-content');
    const productName = productCard?.querySelector('.product-name, h2')?.textContent?.trim() || 'Unknown';
    const productId = extractProductId(element);
    
    const eventData = {
        'event': GTM_CONFIG.events.AFFILIATE_CLICK,
        'eventCategory': GTM_CONFIG.categories.AFFILIATE,
        'eventAction': 'click',
        'eventLabel': productName,
        'productId': productId,
        'productName': productName,
        'affiliateLink': affiliateLink,
        ...clickData
    };
    
    pushDataLayer(eventData);
    console.log('[GTM] Affiliate Click Tracked:', eventData);
}

/**
 * Rastreia cliques em produtos (visualizar detalhes)
 */
function trackProductClick(element, clickData) {
    const productCard = element.closest('.product-card') || element.closest('.featured-hero-content');
    const productName = productCard?.querySelector('.product-name, h2')?.textContent?.trim() || 'Unknown';
    const productId = extractProductId(element);
    
    // Só rastreia se não for um clique de compra
    if (isAffiliateClick(element)) return;
    
    const eventData = {
        'event': GTM_CONFIG.events.VIEW_PRODUCT,
        'eventCategory': GTM_CONFIG.categories.PRODUCT,
        'eventAction': 'view_details',
        'eventLabel': productName,
        'productId': productId,
        'productName': productName,
        ...clickData
    };
    
    pushDataLayer(eventData);
    console.log('[GTM] Product View Tracked:', eventData);
}

/**
 * Rastreia cliques em filtros
 */
function trackFilterClick(element, clickData) {
    const filterType = element.getAttribute('data-filter') || 'unknown';
    
    const eventData = {
        'event': GTM_CONFIG.events.FILTER_APPLIED,
        'eventCategory': GTM_CONFIG.categories.FILTER,
        'eventAction': 'apply_filter',
        'eventLabel': filterType,
        'filterType': filterType,
        ...clickData
    };
    
    pushDataLayer(eventData);
    console.log('[GTM] Filter Applied Tracked:', eventData);
}

/**
 * Extrai o ID do produto do elemento ou seus parentes
 */
function extractProductId(element) {
    // Tenta encontrar em onclick
    const onclickAttr = element.getAttribute('onclick');
    if (onclickAttr) {
        const match = onclickAttr.match(/\((\d+)\)/);
        if (match) return parseInt(match[1]);
    }
    
    // Tenta encontrar em data attributes
    if (element.dataset.productId) return element.dataset.productId;
    
    // Tenta encontrar no elemento pai
    const card = element.closest('[data-product-id]');
    if (card) return card.dataset.productId;
    
    return 'unknown';
}

/**
 * Rastreia evento customizado (uso manual quando necessário)
 */
function trackCustomEvent(eventName, data = {}) {
    const eventData = {
        'event': eventName,
        'timestamp': new Date().toISOString(),
        ...data
    };
    
    pushDataLayer(eventData);
    console.log('[GTM] Custom Event Tracked:', eventData);
}

/**
 * Rastreia visualização de página
 */
function trackPageView(pageName, pageType = 'page') {
    const eventData = {
        'event': 'page_view',
        'pageName': pageName,
        'pageType': pageType,
        'pageUrl': window.location.href,
        'pageTitle': document.title,
        'timestamp': new Date().toISOString()
    };
    
    pushDataLayer(eventData);
    console.log('[GTM] Page View Tracked:', eventData);
}

/**
 * Rastreia erro
 */
function trackError(errorMessage, errorType = 'javascript') {
    const eventData = {
        'event': 'error_occurred',
        'errorMessage': errorMessage,
        'errorType': errorType,
        'errorPage': window.location.href,
        'timestamp': new Date().toISOString()
    };
    
    pushDataLayer(eventData);
    console.error('[GTM] Error Tracked:', eventData);
}

/**
 * Rastreia engajamento (scroll, tempo na página, etc)
 */
function trackEngagement(engagementType, engagementValue) {
    const eventData = {
        'event': 'user_engagement',
        'engagementType': engagementType,
        'engagementValue': engagementValue,
        'timestamp': new Date().toISOString()
    };
    
    pushDataLayer(eventData);
    console.log('[GTM] Engagement Tracked:', eventData);
}

/**
 * Inicializa tudo quando o DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('[GTM] Initializing Google Tag Manager tracking...');
    
    // Rastreia visualização de página
    trackPageView(document.title, 'product_listing');
    
    // Inicializa rastreamento de cliques
    initializeClickTracking();
    
    console.log('[GTM] Tracking initialized successfully');
});

/**
 * Rastreador de scroll (opcional)
 */
function initializeScrollTracking() {
    let scrollTracked = false;
    
    window.addEventListener('scroll', function() {
        if (!scrollTracked && window.scrollY > 300) {
            scrollTracked = true;
            trackEngagement('scroll', 'below_fold');
        }
    });
}

// Inicia rastreamento de scroll após page load
window.addEventListener('load', initializeScrollTracking);
