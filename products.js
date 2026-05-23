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
    tagline: 'Saúde e bem-estar em primeiro lugar'
};

const PRODUCTS = [
    // Colágeno Tipo II Pro
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
        benefits: ['Saúde articular', 'Maior mobilidade', 'Conforto no dia a dia', 'Pele mais firme'],
        serving: '600mg (1 cápsula)',
        servings: '30 cápsulas',
        variations: [
            {
                id: 'variation-1pote',
                label: '1 pote',
                quantity: 1,
                price: 119.90,
                image: './assets/produto-colageno-1pote.svg',
                affiliate_link: 'https://ev.braip.com/ref?pl=plaxpreq&ck=chevljvg&af=afiyd3x07l',
                badge: null,
                servings: '30 cápsulas'
            },
            {
                id: 'variation-3potes',
                label: '3 potes',
                quantity: 3,
                price: 297.90,
                image: './assets/produto-colageno-3potes.svg',
                affiliate_link: 'https://ev.braip.com/ref?pl=plagjg2x&ck=chevljvg&af=afiyd3x07l',
                badge: '🔥 MAIS VENDIDO',
                servings: '90 cápsulas'
            },
            {
                id: 'variation-5potes',
                label: '5 potes',
                quantity: 5,
                price: 387.90,
                image: './assets/produto-colageno-5potes.svg',
                affiliate_link: 'https://ev.braip.com/ref?pl=plal91dv&ck=chevljvg&af=afiyd3x07l',
                badge: '💎 MELHOR CUSTO',
                servings: '150 cápsulas'
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
    },
    // Novos Produtos
    {
        id: 4,
        slug: 'creatina-monohidratada',
        name: 'Creatina Monohidratada',
        description: 'Aumente sua força e performance com creatina pura de alta qualidade. Ideal para ganho de massa muscular.',
        fullDescription: 'Creatina Monohidratada pura, o suplemento mais estudado e eficaz para ganho de força e massa muscular. Aumenta a produção de ATP, melhora a performance em exercícios de alta intensidade e acelera a recuperação muscular. Perfeita para atletas e praticantes de musculação que buscam resultados superiores.',
        image: './assets/produto-creatina.svg',
        price: 89.90,
        affiliate_link: 'https://ev.braip.com/ref?pl=plaxpreq&ck=chevljvg&af=afiyd3x07l',
        bestseller: true,
        benefits: ['Aumento de força', 'Ganho de massa muscular', 'Melhor performance', 'Recuperação acelerada'],
        serving: '3g por dose',
        servings: '100 doses',
        variations: [
            {
                id: 'variation-creatina-300g',
                label: '300g',
                quantity: 1,
                price: 89.90,
                image: './assets/produto-creatina.svg',
                affiliate_link: 'https://ev.braip.com/ref?pl=plaxpreq&ck=chevljvg&af=afiyd3x07l',
                badge: null
            }
        ]
    },
    {
        id: 5,
        slug: 'whey-protein-concentrado',
        name: 'Whey Protein Concentrado',
        description: 'Proteína de alta qualidade para construção muscular e recuperação pós-treino. Sabor chocolate.',
        fullDescription: 'Whey Protein Concentrado de altíssima qualidade, rico em aminoácidos essenciais e BCAAs. Auxilia na construção e recuperação muscular, fortalece o sistema imunológico e promove saciedade. Ideal para quem busca hipertrofia e manutenção da massa magra. Sabor chocolate irresistível.',
        image: './assets/produto-whey.svg',
        price: 129.90,
        affiliate_link: 'https://ev.braip.com/checkout/pla8lxz1/chepjd8j?pl=pla8lxz1&ck=chepjd8j&af=afilx320l6&currency=BRL',
        bestseller: true,
        benefits: ['Construção muscular', 'Recuperação rápida', 'Rico em BCAAs', 'Fortalece imunidade'],
        serving: '30g por dose',
        servings: '33 doses',
        variations: [
            {
                id: 'variation-whey-1kg',
                label: '1kg',
                quantity: 1,
                price: 129.90,
                image: './assets/produto-whey.svg',
                affiliate_link: 'https://ev.braip.com/checkout/pla8lxz1/chepjd8j?pl=pla8lxz1&ck=chepjd8j&af=afilx320l6&currency=BRL',
                badge: '🔥 MAIS VENDIDO'
            }
        ]
    },
    {
        id: 6,
        slug: 'melatonina-5mg',
        name: 'Melatonina 5mg',
        description: 'Melhore a qualidade do seu sono naturalmente. Regula o ciclo circadiano e promove descanso profundo.',
        fullDescription: 'Melatonina 5mg de alta pureza, o hormônio natural do sono. Ajuda a regular o ciclo circadiano, reduz o tempo para adormecer e melhora a qualidade do sono. Ideal para quem sofre de insônia, trabalha em turnos ou viaja frequentemente. Não causa dependência e promove um despertar revigorante.',
        image: './assets/produto-destaque.svg',
        price: 49.90,
        affiliate_link: 'https://ev.braip.com/checkout/plaxw84g/cherq188?pl=plaxw84g&ck=cherq188&af=afig5g2l9o&currency=BRL',
        bestseller: false,
        benefits: ['Melhora o sono', 'Regula ciclo circadiano', 'Não causa dependência', 'Despertar revigorante'],
        serving: '5mg por cápsula',
        servings: '60 cápsulas',
        variations: [
            {
                id: 'variation-melatonina-60caps',
                label: '60 cápsulas',
                quantity: 1,
                price: 49.90,
                image: './assets/produto-destaque.svg',
                affiliate_link: 'https://ev.braip.com/checkout/plaxw84g/cherq188?pl=plaxw84g&ck=cherq188&af=afig5g2l9o&currency=BRL',
                badge: null
            }
        ]
    },
    {
        id: 7,
        slug: 'magnesio-dimalato',
        name: 'Magnésio Dimalato',
        description: 'Combate cãibras, fadiga e melhora a saúde muscular. Essencial para mais de 300 reações no corpo.',
        fullDescription: 'Magnésio Dimalato de alta biodisponibilidade, essencial para mais de 300 reações enzimáticas no organismo. Combate cãibras musculares, reduz fadiga, melhora a qualidade do sono e auxilia na saúde cardiovascular. Ideal para atletas, pessoas com estresse e quem busca mais disposição no dia a dia.',
        image: './assets/produto-multivitamina.svg',
        price: 59.90,
        affiliate_link: 'https://ev.braip.com/ref?pl=plaxpreq&ck=chevljvg&af=afiyd3x07l',
        bestseller: false,
        benefits: ['Combate cãibras', 'Reduz fadiga', 'Melhora o sono', 'Saúde cardiovascular'],
        serving: '500mg por cápsula',
        servings: '60 cápsulas',
        variations: [
            {
                id: 'variation-magnesio-60caps',
                label: '60 cápsulas',
                quantity: 1,
                price: 59.90,
                image: './assets/produto-multivitamina.svg',
                affiliate_link: 'https://ev.braip.com/ref?pl=plaxpreq&ck=chevljvg&af=afiyd3x07l',
                badge: null
            }
        ]
    },
    {
        id: 8,
        slug: 'omega-3-1000mg',
        name: 'Ômega 3 1000mg',
        description: 'Saúde cardiovascular e cerebral. Rico em EPA e DHA para proteção do coração e melhora cognitiva.',
        fullDescription: 'Ômega 3 1000mg de alta concentração, rico em EPA e DHA. Protege o coração, reduz inflamações, melhora a função cerebral e auxilia na saúde ocular. Essencial para quem busca longevidade e qualidade de vida. Cápsulas fáceis de engolir sem gosto de peixe.',
        image: './assets/produto-silicio.svg',
        price: 79.90,
        affiliate_link: 'https://ev.braip.com/checkout/pla8lxz1/chepjd8j?pl=pla8lxz1&ck=chepjd8j&af=afilx320l6&currency=BRL',
        bestseller: true,
        benefits: ['Saúde cardiovascular', 'Função cerebral', 'Anti-inflamatório', 'Saúde ocular'],
        serving: '1000mg por cápsula',
        servings: '60 cápsulas',
        variations: [
            {
                id: 'variation-omega3-60caps',
                label: '60 cápsulas',
                quantity: 1,
                price: 79.90,
                image: './assets/produto-silicio.svg',
                affiliate_link: 'https://ev.braip.com/checkout/pla8lxz1/chepjd8j?pl=pla8lxz1&ck=chepjd8j&af=afilx320l6&currency=BRL',
                badge: null
            }
        ]
    },
    {
        id: 9,
        slug: 'maca-peruana-500mg',
        name: 'Maca Peruana 500mg',
        description: 'Aumente energia, libido e disposição naturalmente. Adaptógeno poderoso para equilíbrio hormonal.',
        fullDescription: 'Maca Peruana 500mg pura e concentrada, o superalimento dos Andes. Aumenta energia, disposição, libido e fertilidade. Auxilia no equilíbrio hormonal, melhora o humor e combate o estresse. Ideal para homens e mulheres que buscam mais vitalidade e bem-estar.',
        image: './assets/produto-maca.svg',
        price: 69.90,
        affiliate_link: 'https://ev.braip.com/checkout/plaxw84g/cherq188?pl=plaxw84g&ck=cherq188&af=afig5g2l9o&currency=BRL',
        bestseller: false,
        benefits: ['Aumenta energia', 'Melhora libido', 'Equilíbrio hormonal', 'Combate estresse'],
        serving: '500mg por cápsula',
        servings: '60 cápsulas',
        variations: [
            {
                id: 'variation-maca-60caps',
                label: '60 cápsulas',
                quantity: 1,
                price: 69.90,
                image: './assets/produto-maca.svg',
                affiliate_link: 'https://ev.braip.com/checkout/plaxw84g/cherq188?pl=plaxw84g&ck=cherq188&af=afig5g2l9o&currency=BRL',
                badge: null
            }
        ]
    },
    {
        id: 10,
        slug: 'vitamina-b12-metilcobalamina',
        name: 'Vitamina B12 Metilcobalamina',
        description: 'Energia, disposição e saúde neurológica. Forma ativa de B12 para máxima absorção.',
        fullDescription: 'Vitamina B12 Metilcobalamina, a forma mais biodisponível e ativa da vitamina B12. Essencial para produção de energia, saúde neurológica, formação de células vermelhas e metabolismo. Ideal para vegetarianos, veganos e pessoas com fadiga crônica. Combate anemia e melhora o humor.',
        image: './assets/produto-nervocure1.webp',
        price: 44.90,
        affiliate_link: 'https://ev.braip.com/ref?pl=plaxpreq&ck=chevljvg&af=afiyd3x07l',
        bestseller: false,
        benefits: ['Mais energia', 'Saúde neurológica', 'Combate anemia', 'Melhora o humor'],
        serving: '1000mcg por cápsula',
        servings: '60 cápsulas',
        variations: [
            {
                id: 'variation-b12-60caps',
                label: '60 cápsulas',
                quantity: 1,
                price: 44.90,
                image: './assets/produto-nervocure1.webp',
                affiliate_link: 'https://ev.braip.com/ref?pl=plaxpreq&ck=chevljvg&af=afiyd3x07l',
                badge: null
            }
        ]
    },
    {
        id: 11,
        slug: 'multivitaminico-completo',
        name: 'Multivitamínico Completo',
        description: 'Fórmula completa com vitaminas e minerais essenciais. Preencha as lacunas nutricionais do dia a dia.',
        fullDescription: 'Multivitamínico Completo com mais de 20 vitaminas e minerais essenciais. Fortalece o sistema imunológico, aumenta a energia, melhora a saúde da pele, cabelos e unhas. Ideal para quem tem rotina corrida e busca garantir todos os nutrientes necessários para uma vida saudável.',
        image: './assets/produto-multivitamina.svg',
        price: 54.90,
        affiliate_link: 'https://ev.braip.com/checkout/pla8lxz1/chepjd8j?pl=pla8lxz1&ck=chepjd8j&af=afilx320l6&currency=BRL',
        bestseller: false,
        benefits: ['Imunidade forte', 'Mais energia', 'Pele saudável', 'Fórmula completa'],
        serving: '1 cápsula por dia',
        servings: '60 cápsulas',
        variations: [
            {
                id: 'variation-multi-60caps',
                label: '60 cápsulas',
                quantity: 1,
                price: 54.90,
                image: './assets/produto-multivitamina.svg',
                affiliate_link: 'https://ev.braip.com/checkout/pla8lxz1/chepjd8j?pl=pla8lxz1&ck=chepjd8j&af=afilx320l6&currency=BRL',
                badge: null
            }
        ]
    },
    {
        id: 12,
        slug: 'coenzima-q10-100mg',
        name: 'Coenzima Q10 100mg',
        description: 'Poderoso antioxidante para energia celular e saúde cardiovascular. Combate o envelhecimento.',
        fullDescription: 'Coenzima Q10 100mg de alta pureza, essencial para produção de energia celular. Poderoso antioxidante que protege o coração, combate o envelhecimento precoce e melhora a performance física. Ideal para pessoas acima de 40 anos, atletas e quem busca longevidade com qualidade.',
        image: './assets/produto-silicio.svg',
        price: 84.90,
        affiliate_link: 'https://ev.braip.com/checkout/plaxw84g/cherq188?pl=plaxw84g&ck=cherq188&af=afig5g2l9o&currency=BRL',
        bestseller: false,
        benefits: ['Energia celular', 'Saúde do coração', 'Antioxidante potente', 'Anti-envelhecimento'],
        serving: '100mg por cápsula',
        servings: '60 cápsulas',
        variations: [
            {
                id: 'variation-q10-60caps',
                label: '60 cápsulas',
                quantity: 1,
                price: 84.90,
                image: './assets/produto-silicio.svg',
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
