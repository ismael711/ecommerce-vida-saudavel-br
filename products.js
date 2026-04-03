/**
 * Products Database
 * Este arquivo contém todos os produtos disponíveis na loja.
 * Estrutura preparada para futura integração com API externa (JSON/REST)
 * 
 * CONFIGURAÇÃO DE BRANDING:
 * Altere os valores abaixo para customizar sua loja:
 */

const STORE_CONFIG = {
    name: 'Vida Saudável BR',
    logo: './assets/logo.svg',
    tagline: 'Saúde e bem-estar em primeiro lugar',
    featured_product_id: 1  // ID do produto destaque na hero section
};

const PRODUCTS = [
    // PRODUTO DESTAQUE - Colágeno Tipo II Pro
    {
        id: 1,
        slug: 'colageno-tipo2',
        name: 'Colágeno Tipo II',
        description: 'Suplemento voltado para saúde das articulações, mobilidade e qualidade de vida. Ideal para quem busca mais conforto no dia a dia.',
        fullDescription: 'Colágeno Tipo II Pro é formulado especificamente para promover a saúde das articulações e cartilagens. Com alta concentração de aminoácidos essenciais (glicina, prolina e hidroxiprolina), este suplemento melhora significativamente a mobilidade e flexibilidade. Perfeito para atletas, pessoas ativas e anyone buscando manter a qualidade de vida e conforto ao longo dos anos.',
        image: './assets/produto-colageno-1pote.svg',
        price: 119.90,
        affiliate_link: 'https://ev.braip.com/ref?pl=plaxpreq&ck=chevljvg&af=afiyd3x07l',
        bestseller: true,
        featured: true,
        benefits: ['Saúde articular', 'Maior mobilidade', 'Conforto no dia a dia', 'Pele mais firme'],
        serving: '20g (1 cápsula)',
        servings: '30 cápsulas',
        weightTotal: '600mg',
        variations: [
            {
                id: 'variation-1pote',
                label: '1 pote',
                quantity: 1,
                price: 119.90,
                image: './assets/produto-colageno-1pote.svg',
                affiliate_link: 'https://ev.braip.com/ref?pl=plaxpreq&ck=chevljvg&af=afiyd3x07l',
                badge: null,
                servings: '30 cápsulas',
                weightTotal: '600mg'
            },
            {
                id: 'variation-3potes',
                label: '3 potes',
                quantity: 3,
                price: 297.90,
                image: './assets/produto-colageno-3potes.svg',
                affiliate_link: 'https://ev.braip.com/ref?pl=plagjg2x&ck=chevljvg&af=afiyd3x07l',
                badge: '🔥 MAIS VENDIDO',
                servings: '90 cápsulas',
                weightTotal: '1800mg'
            },
            {
                id: 'variation-5potes',
                label: '5 potes',
                quantity: 5,
                price: 387.90,
                image: './assets/produto-colageno-5potes.svg',
                affiliate_link: 'https://ev.braip.com/ref?pl=plal91dv&ck=chevljvg&af=afiyd3x07l',
                badge: '💎 MELHOR CUSTO',
                servings: '150 cápsulas',
                weightTotal: '3000mg'
            }
        ]
    },
    {
        id: 2,
        slug: 'action-coffee',
        name: 'Action Coffee',
        description: 'Uma excelente opção para se obter energia ao longo do dia com ingredientes exclusivamente combinados.',
        fullDescription: 'Uma excelente opção para se obter energia ao longo do dia! Ele conta com ingredientes exclusivamente combinados para te entregar mais energia e disposição, ajudando também a promover melhores funções cerebrais como atenção, memória e foco. Possui ingredientes capazes de promover saciedade e diminuir a compulsão por doces, além de aumentar a queima de gordura. A fórmula do ACTION COFFEE é produzida com leite de coco, sendo recomendado para pessoas que seguem uma dieta com baixo carboidrato (low carb) e sem lactose.',
        image: './assets/produto-actioncoffee1.svg',
        price: 144.90,
        affiliate_link: 'https://ev.braip.com/checkout/pla8lxz1/chepjd8j?pl=pla8lxz1&ck=chepjd8j&af=afilx320l6&currency=BRL',
        bestseller: true,
        featured: false,
        benefits: ['Mais energia', 'Melhor foco e memória', 'Sem lactose', 'Low carb'],
        serving: '1 pote',
        servings: 'Conforme uso',
        variations: [
            {
                id: 'variation-1pote-ac',
                label: '1 Pote',
                quantity: 1,
                price: 144.90,
                image: './assets/produto-actioncoffee1.svg',
                affiliate_link: 'https://ev.braip.com/checkout/pla8lxz1/chepjd8j?pl=pla8lxz1&ck=chepjd8j&af=afilx320l6&currency=BRL',
                badge: null
            },
            {
                id: 'variation-3potes-ac',
                label: '3 Potes',
                quantity: 3,
                price: 419.00,
                image: './assets/produto-actioncoffee3.svg',
                affiliate_link: 'https://ev.braip.com/checkout/plaelwe6/chepjd8j?pl=plaelwe6&ck=chepjd8j&af=afilx320l6&currency=BRL',
                badge: '🔥 MAIS VENDIDO'
            },
            {
                id: 'variation-6potes-ac',
                label: '6 Potes',
                quantity: 6,
                price: 798.00,
                image: './assets/produto-actioncoffee5.svg',
                affiliate_link: 'https://ev.braip.com/checkout/plaqjwel/chepjd8j?af=afilx320l6&ck=chepjd8j&currency=BRL&pl=plaqjwel',
                badge: '💎 MELHOR CUSTO'
            }
        ]
    },
    {
        id: 3,
        slug: 'nervocure',
        name: 'Nervocure',
        description: 'Cura pela raiz a lombalgia (dor nas costas), diminui inchaço e inflamação, protege cartilagens.',
        fullDescription: 'Cura Pela Raiz a LOMBALGIA (DOR NAS COSTAS) ATÉ MESMO CRÕNICA; Diminui inchaço, inflamação e compressão dos nervos; Protege e regenera as Cartilagens e ossos, podendo Reverter até mesmo casos mais extremos de Atrose e Osteoporose; Ajuda a se libertar dos analgésicos; Melhore suas noites de sono',
        image: './assets/produto-nervocure-1caixa.svg',
        price: 177.00,
        affiliate_link: 'https://ev.braip.com/checkout/plaxw84g/cherq188?pl=plaxw84g&ck=cherq188&af=afig5g2l9o&currency=BRL',
        bestseller: true,
        featured: false,
        benefits: ['Alívio de dor nas costas', 'Reduz inchaço e inflamação', 'Protege cartilagens', 'Melhora o sono'],
        serving: '1 caixa',
        servings: 'Conforme recomendado',
        variations: [
            {
                id: 'variation-1caixa',
                label: '1 CAIXA NERVOCUREMAX',
                quantity: 1,
                price: 177.00,
                image: './assets/produto-nervocure-1caixa.svg',
                affiliate_link: 'https://ev.braip.com/checkout/plaxw84g/cherq188?pl=plaxw84g&ck=cherq188&af=afig5g2l9o&currency=BRL',
                badge: null
            }
        ]
    }
];

/**
 * Função para buscar produtos (preparada para integração com API)
 * Atualmente retorna dados mockados, mas pode ser adaptada para chamar um endpoint
 */
async function fetchProducts() {
    // Simula latência de rede
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(PRODUCTS);
        }, 300);
    });
}

/**
 * Função para buscar um produto específico por ID
 */
function getProductById(id) {
    return PRODUCTS.find(product => product.id === parseInt(id));
}

/**
 * Função para filtrar produtos (pode ser expandida)
 */
function filterProducts(filter = 'all') {
    if (filter === 'bestseller') {
        return PRODUCTS.filter(product => product.bestseller);
    }
    return PRODUCTS;
}

/**
 * Função para buscar produtos relacionados (mesmo que a categoria)
 */
function getRelatedProducts(currentProductId, limit = 3) {
    return PRODUCTS.filter(p => p.id !== currentProductId).slice(0, limit);
}
