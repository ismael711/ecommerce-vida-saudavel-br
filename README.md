# 💊 Suplementos Premium - E-commerce Estático

Um site estático de e-commerce (vitrine de afiliados) completo, moderno e responsivo, pronto para ser hospedado no GitHub Pages.

## ✨ Características

- ✅ **HTML5 Semântico** - Estrutura moderna e acessível
- ✅ **CSS3 Moderno** - Flexbox, Grid e animações suaves
- ✅ **JavaScript Puro** - Sem dependências externas
- ✅ **100% Responsivo** - Funciona perfeitamente em mobile
- ✅ **SEO Otimizado** - Meta tags, títulos dinâmicos
- ✅ **GitHub Pages Ready** - Deploy automático
- ✅ **Link de Afiliados** - Sistema de redirecionamento integrado
- ✅ **Badges de Produtos** - Destaque visual para bestsellers
- ✅ **Preparado para API** - Estrutura pronta para integração com dados externos

## 📁 Estrutura do Projeto

```
ecommerce-vida-saudavel-br/
├── index.html              # Página inicial com listagem de produtos
├── product.html            # Página de detalhes do produto
├── style.css              # Estilos CSS moderno (Flexbox + Grid)
├── products.js            # Dados dos produtos (mockados)
├── script.js              # Lógica da página inicial
├── product-detail.js      # Lógica da página de detalhes
└── README.md              # Este arquivo
```

## 🚀 Como Usar

### Localmente

1. Clone ou baixe o repositório:
```bash
git clone https://github.com/seu-usuario/ecommerce-vida-saudavel-br.git
cd ecommerce-vida-saudavel-br
```

2. Abra o arquivo `index.html` no navegador ou use um servidor local:
```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js
npx http-server
```

3. Acesse em `http://localhost:8000`

### No GitHub Pages

1. Crie um repositório com o nome `ecommerce-vida-saudavel-br`

2. Push dos arquivos:
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

3. Ative GitHub Pages:
   - Vá em **Settings** → **Pages**
   - Selecione **main branch** como source
   - Clique em **Save**

4. Acesse em `https://seu-usuario.github.io/ecommerce-vida-saudavel-br`

## 📦 Produtos Inclusos

1. **Colágeno Tipo 2** - R$ 89,90
   - Saúde articular e pele radiante

2. **Silício Orgânico** - R$ 79,90
   - Fortalecimento de pele, cabelos e unhas

3. **Maca Peruana Premium** - R$ 69,90
   - Energia e disposição

4. **Whey Protein Concentrado** - R$ 129,90
   - Ganho muscular e recuperação

5. **Creatina Monohidratada** - R$ 59,90
   - Força e hipertrofia

6. **Multivitamínico Completo** - R$ 99,90
   - Saúde integral e imunidade

## 🎨 Design

### Paleta de Cores
- **Primária**: #FF6B6B (Vermelho vibrante)
- **Secundária**: #4ECDC4 (Turquesa)
- **Escura**: #2C3E50 (Cinza escuro)
- **Clara**: #ECF0F1 (Cinza claro)

### Responsividade
- Desktop: Grid com múltiplas colunas
- Tablet: Grid adaptado
- Mobile: Single column

## 💻 Funcionalidades JavaScript

### Home (index.html)
- Carregamento dinâmico de produtos
- Sistema de filtros (Todos / Mais Vendidos)
- Redirecionamento para página de detalhes
- Links de afiliados rastreáveis

### Detalhes do Produto (product.html)
- Exibição completa do produto via query string
- Imagem ampliada
- Benefícios e especificações
- Produtos relacionados
- Botão "Voltar"

### Features Técnicas
- **Local Storage** - Rastreamento de cliques em afiliados
- **Query String** - Navegação entre produtos
- **Lazy Loading** - Imagens otimizadas
- **Error Handling** - Tratamento de erros robusto
- **Escape HTML** - Proteção contra XSS

## 🔧 Como Adicionar Novos Produtos

Edite o arquivo `products.js` e adicione um novo objeto ao array `PRODUCTS`:

```javascript
{
    id: 7,
    name: 'Novo Produto',
    description: 'Descrição breve',
    fullDescription: 'Descrição completa...',
    image: 'https://via.placeholder.com/300x300?text=Novo',
    price: 99.90,
    affiliate_link: 'https://braip.com/seu-link',
    bestseller: false,
    benefits: ['Benefício 1', 'Benefício 2'],
    serving: '10g',
    servings: '100 porções'
}
```

## 🔗 Como Integrar com API Externa

Para usar dados de uma API real em vez de dados mockados:

1. Edite o arquivo `products.js`:

```javascript
async function fetchProducts() {
    try {
        const response = await fetch('https://sua-api.com/produtos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return PRODUCTS; // Fallback para dados mockados
    }
}
```

2. Certifique-se de que a API retorna dados no mesmo formato dos PRODUCTS.

## 📊 Rastreamento de Afiliados

Os cliques são armazenados em LocalStorage e podem ser consultados:

```javascript
const clicks = JSON.parse(localStorage.getItem('affiliate_clicks'));
console.log(clicks); // Array com histórico de cliques
```

## ♿ Acessibilidade

- Semântica HTML5 apropriada
- Atributos `alt` em todas as imagens
- Contraste de cores WCAG AA
- Navegação por teclado funcional
- Meta tags de acessibilidade

## 🔒 Segurança

- Escape de caracteres HTML (XSS protection)
- Sem dados sensíveis no cliente
- Links abrem em novas abas
- HTTPS recomendado no GitHub Pages

## 📱 Compatibilidade

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers modernos
- ✅ IE 11 (com fallbacks limitados)

## 🚦 Performance

- Carregamento lazy de imagens
- CSS minified
- Sem bloqueio de renderização
- Sem dependências externas
- Muito rápido em redes lentas

## 📝 Licença

Uso livre para fins pessoais e comerciais.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para:
- Adicionar novos produtos
- Melhorar o design
- Implementar novas funcionalidades
- Corrigir bugs

## 📧 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

Feito com ❤️ para creators e afiliados
