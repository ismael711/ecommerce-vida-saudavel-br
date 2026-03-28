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
    logo: 'assets/logo.svg',
    tagline: 'Saúde e bem-estar em primeiro lugar',
    featured_product_id: 1  // ID do produto destaque na hero section
};

const PRODUCTS = [
    // PRODUTO DESTAQUE - Colágeno Tipo II Pro
    {
        id: 1,
        name: 'Colágeno Tipo II Pro',
        description: 'Suplemento voltado para saúde das articulações, mobilidade e qualidade de vida. Ideal para quem busca mais conforto no dia a dia.',
        fullDescription: 'Colágeno Tipo II Pro é formulado especificamente para promover a saúde das articulações e cartilagens. Com alta concentração de aminoácidos essenciais (glicina, prolina e hidroxiprolina), este suplemento melhora significativamente a mobilidade e flexibilidade. Perfeito para atletas, pessoas ativas e anyone buscando manter a qualidade de vida e conforto ao longo dos anos.',
        image: 'assets/produto-colageno-1pote.png',
        price: 119.90,
        affiliate_link: 'https://ev.braip.com/ref?pl=plaxpreq&ck=chevljvg&af=afiyd3x07l',
        bestseller: true,
        featured: true,  // Destaque na hero section
        benefits: ['Saúde articular', 'Maior mobilidade', 'Conforto no dia a dia', 'Pele mais firme'],
        serving: '10g (1 colher)',
        servings: '300 porções',
        // Variações de produto
        variations: [
            {
                id: 'variation-1pote',
                label: '1 pote',
                quantity: 1,
                price: 119.90,
                image: 'assets/produto-colageno-1pote.png',
                affiliate_link: 'https://ev.braip.com/ref?pl=plaxpreq&ck=chevljvg&af=afiyd3x07l',
                badge: null
            },
            {
                id: 'variation-3potes',
                label: '3 potes',
                quantity: 3,
                price: 297.90,
                image: 'assets/produto-colageno-3potes.png',
                affiliate_link: 'https://ev.braip.com/ref?pl=plagjg2x&ck=chevljvg&af=afiyd3x07l',
                badge: '🔥 MAIS VENDIDO'
            },
            {
                id: 'variation-5potes',
                label: '5 potes',
                quantity: 5,
                price: 387.90,
                image: 'assets/produto-colageno-5potes.png',
                affiliate_link: 'https://ev.braip.com/ref?pl=plal91dv&ck=chevljvg&af=afiyd3x07l',
                badge: '💎 MELHOR CUSTO'
            }
        ]
    },
    {
        id: 2,
        name: 'Silício Orgânico',
        description: 'Mineral essencial para fortalecer pele, cabelos e unhas. Restaura colágeno e elastina naturalmente.',
        fullDescription: 'O Silício Orgânico é um mineral vital para a estrutura e elasticidade da pele, fortalecimento de cabelos e unhas. Promove a síntese natural de colágeno e elastina, resultando em pele mais firme e jovem. Indicado também para saúde óssea e articular.',
        image: 'https://via.placeholder.com/300x300?text=Silício+Orgânico',
        price: 79.90,
        affiliate_link: 'https://braip.com/produto/silicio-organico?afiliado=suplementos-premium',
        bestseller: false,
        benefits: ['Pele firme', 'Cabelos fortes', 'Unhas saudáveis', 'Colágeno natural'],
        serving: '8ml (1 dose)',
        servings: '30 doses'
    },
    {
        id: 3,
        name: 'Maca Peruana Premium',
        description: 'Raiz adaptógena que aumenta energia, disposição e vitalidade. 100% puro, sem aditivos.',
        fullDescription: 'Maca Peruana é uma raiz adaptógena poderosa originária dos Andes que aumenta significativamente os níveis de energia e disposição. Rico em nutrientes essenciais, equilibra hormônios e melhora o bem-estar geral. Perfeito para quem busca vitalidade e resistência.',
        image: 'https://via.placeholder.com/300x300?text=Maca+Peruana',
        price: 69.90,
        affiliate_link: 'https://braip.com/produto/maca-peruana?afiliado=suplementos-premium',
        bestseller: true,
        benefits: ['Energia', 'Disposição', 'Vitalidade', 'Equilíbrio hormonal'],
        serving: '500mg',
        servings: '60 cápsulas'
    },
    {
        id: 4,
        name: 'Whey Protein Concentrado',
        description: 'Proteína concentrada para ganho muscular rápido. Sabor delicioso e fácil mistura. Ideal pós-treino.',
        fullDescription: 'Whey Protein Concentrado é a proteína mais completa para ganho muscular. Contém todos os aminoácidos essenciais, especialmente BCAA e leucina, que estimulam síntese proteica muscular. Absorção rápida, ótima para pós-treino e recuperação.',
        image: 'https://via.placeholder.com/300x300?text=Whey+Protein',
        price: 129.90,
        affiliate_link: 'https://braip.com/produto/whey-protein?afiliado=suplementos-premium',
        bestseller: true,
        benefits: ['Ganho muscular', 'Recuperação', 'Proteína completa', 'BCAA'],
        serving: '30g (1 scoop)',
        servings: '33 doses'
    },
    {
        id: 5,
        name: 'Creatina Monohidratada',
        description: 'Creatina pura para força e hipertrofia. Aumenta produção de ATP e performance em treinos.',
        fullDescription: 'Creatina Monohidratada é o suplemento mais estudado e eficaz para aumentar força e ganho muscular. Melhora a produção de ATP, energia celular, permitindo treinos mais intensos e recuperação acelerada. Indicada para musculação e esportes de força.',
        image: 'https://via.placeholder.com/300x300?text=Creatina',
        price: 59.90,
        affiliate_link: 'https://braip.com/produto/creatina-monohidratada?afiliado=suplementos-premium',
        bestseller: true,
        benefits: ['Força muscular', 'Hipertrofia', 'Energia celular', 'Performance'],
        serving: '5g',
        servings: '200 doses'
    },
    {
        id: 6,
        name: 'Multivitamínico Completo',
        description: 'Fórmula completa com 25 nutrientes essenciais para saúde integral e imunidade forte.',
        fullDescription: 'Multivitamínico Completo é uma fórmula abrangente contendo vitaminas A, B complex, C, D3, E, K2 e minerais essenciais como zinco, selênio e magnésio. Fortalece o sistema imunológico, melhora energia e bem-estar geral. Recomendado para toda a família.',
        image: 'https://via.placeholder.com/300x300?text=Multivitamínico',
        price: 99.90,
        affiliate_link: 'https://braip.com/produto/multivitaminico?afiliado=suplementos-premium',
        bestseller: false,
        benefits: ['Imunidade', 'Energia', 'Saúde geral', '25 nutrientes'],
        serving: '1 cápsula',
        servings: '60 cápsulas'
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
