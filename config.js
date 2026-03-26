/**
 * CONFIGURAÇÃO RÁPIDA - VitaPower Suplementos
 * 
 * Edite este arquivo para customizar sua loja facilmente
 * sem precisar modificar outros arquivos do projeto
 */

// ================================================
// CONFIGURAÇÃO DE BRANDING
// ================================================

const BRANDING = {
    // Nome da loja - Aparece em todos os lugares
    storeName: 'VitaPower Suplementos',
    
    // Logo - Caminho da imagem SVG ou PNG
    // Coloque seu logo em: assets/logo.svg
    logoPath: 'assets/logo.svg',
    logoAlt: 'VitaPower Suplementos',
    
    // Tagline - Frase abaixo do nome
    tagline: 'Saúde e bem-estar em primeiro lugar',
    
    // Cores principais (copie os valores do style.css)
    colors: {
        primary: '#FF6B6B',      // Vermelho
        secondary: '#4ECDC4',    // Turquesa
        dark: '#2C3E50',         // Cinza escuro
        light: '#ECF0F1',        // Cinza claro
        success: '#27AE60'       // Verde
    },
    
    // Meta tags
    metaDescription: 'VitaPower Suplementos - Saúde e bem-estar em primeiro lugar',
    metaKeywords: 'suplementos, vitaminas, saúde, bem-estar, afiliados'
};

// ================================================
// CONFIGURAÇÃO DE PRODUTO DESTAQUE
// ================================================

const FEATURED_CONFIG = {
    // ID do produto que aparece em destaque na home
    productId: 1,
    
    // Mostrar seção de destaque?
    enabled: true,
    
    // Imagem do produto - Use caminho em assets/
    // Exemplo: 'assets/produto-destaque.svg'
    imagePath: 'assets/produto-destaque.svg'
};

// ================================================
// CONFIGURAÇÃO DE AFILIADOS
// ================================================

const AFFILIATE_CONFIG = {
    // Mostrar disclaimer sobre redirecionamento?
    showDisclaimer: true,
    
    // Texto do disclaimer
    disclaimerText: 'Importante: Somos uma vitrine de afiliados. Você será redirecionado para o site parceiro para finalizar sua compra. Nenhuma compra é realizada diretamente em nosso site.',
    
    // Rastrear cliques?
    trackClicks: true,
    
    // Mostrar qual site o usuário será redirecionado
    showRedirectInfo: true
};

// ================================================
// CONFIGURAÇÃO DE SEO
// ================================================

const SEO_CONFIG = {
    // Título da página
    pageTitle: 'VitaPower Suplementos - Saúde e Bem-estar',
    
    // Descrição padrão
    description: 'Descubra os melhores suplementos para sua saúde e bem-estar em VitaPower',
    
    // Palavras-chave
    keywords: 'suplementos, vitaminas, colágeno, whey protein, creatina, saúde',
    
    // Site name para Open Graph
    siteName: 'VitaPower Suplementos'
};

// ================================================
// CONFIGURAÇÃO DE FILTROS
// ================================================

const FILTER_CONFIG = {
    // Mostrar filtros?
    enabled: true,
    
    // Filtros disponíveis
    filters: [
        { id: 'all', label: 'Todos os Produtos' },
        { id: 'bestseller', label: '🔥 Mais Vendidos' }
    ]
};

// ================================================
// CONFIGURAÇÃO DE IMAGENS
// ================================================

const IMAGE_CONFIG = {
    // Diretório de imagens
    assetsPath: 'assets/',
    
    // Imagens dos produtos podem estar em:
    // 1. assets/ (local)
    // 2. URLs externas (https://...)
    // 3. URLs de placeholder (https://via.placeholder.com/...)
    
    // Lazy loading de imagens?
    lazyLoad: true,
    
    // Placeholder enquanto carrega
    placeholderBg: '#f0f0f0'
};

// ================================================
// EXPORTAR CONFIGURAÇÕES
// ================================================

window.CONFIG = {
    BRANDING,
    FEATURED_CONFIG,
    AFFILIATE_CONFIG,
    SEO_CONFIG,
    FILTER_CONFIG,
    IMAGE_CONFIG
};
