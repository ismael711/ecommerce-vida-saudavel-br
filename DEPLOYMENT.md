# 🚀 Guia de Deployment para GitHub Pages

## Pré-requisitos

- Conta GitHub
- Git instalado localmente
- Um repositório GitHub criado

## Passo 1: Preparar Repositório Local

```bash
cd /Users/ismaelrojas/Library/CloudStorage/OneDrive-IBM/Documents/Projetos/ecommerce-vida-saudavel-br
git init
git add .
git commit -m "Initial commit: E-commerce estático Suplementos Premium"
```

## Passo 2: Conectar ao GitHub

```bash
git remote add origin https://github.com/seu-usuario/ecommerce-vida-saudavel-br.git
git branch -M main
git push -u origin main
```

## Passo 3: Ativar GitHub Pages

1. Acesse seu repositório no GitHub
2. Clique em **Settings** (Configurações)
3. Vá para **Pages** no menu lateral esquerdo
4. Em "Source", selecione:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Clique em **Save**

## Passo 4: Aguardar Build

- GitHub Pages construirá automaticamente o site
- Você verá um link tipo: `https://seu-usuario.github.io/ecommerce-vida-saudavel-br`
- Pode levar alguns minutos

## 🔧 Atualizando o Site

Para fazer alterações e atualizar o site:

```bash
# 1. Faça suas alterações nos arquivos

# 2. Adicione e commite as mudanças
git add .
git commit -m "Descrição das alterações"

# 3. Push para GitHub
git push origin main
```

As mudanças serão publicadas automaticamente!

## 📝 Customização

### Mudar Nome da Loja

Edite em `index.html` e `product.html`:
```html
<h1>Seu Nome de Loja</h1>
```

### Adicionar Produtos

Edite `products.js` e adicione ao array PRODUCTS:

```javascript
{
    id: 7,
    name: 'Nome do Produto',
    description: 'Descrição breve',
    fullDescription: 'Descrição completa...',
    image: 'URL da imagem',
    price: 99.90,
    affiliate_link: 'seu-link-de-afiliado',
    bestseller: false,
    benefits: ['Benefício 1', 'Benefício 2'],
    serving: '10g',
    servings: '100 porções'
}
```

### Trocar Cores

Edite as variáveis CSS no início de `style.css`:

```css
:root {
    --primary-color: #27AE60;        /* Cor principal */
    --secondary-color: #4ECDC4;      /* Cor secundária */
    --dark-color: #2C3E50;           /* Cor escura */
    --light-color: #ECF0F1;          /* Cor clara */
}
```

## 🖼️ Usando Imagens Reais

Substitua as URLs de placeholder por imagens reais:

```javascript
// Em vez de:
image: 'https://via.placeholder.com/300x300?text=Colágeno'

// Use:
image: 'https://seu-dominio.com/imagens/colageno.jpg'
```

## 📊 Monitorar Afiliados

Os cliques são rastreados localmente. Para verificar:

1. Abra o DevTools (F12)
2. Vá para Console
3. Execute:
```javascript
JSON.parse(localStorage.getItem('affiliate_clicks'))
```

## 🆘 Solução de Problemas

### Site não aparece
- Aguarde 5-10 minutos após o push
- Verifique se a branch é `main`
- Confirme que está em "/ (root)"

### Links de afiliados não funcionam
- Verifique se as URLs estão completas
- Teste abrindo em nova aba
- Confirme que os links externos estão ativos

### Imagens não carregam
- Use URLs HTTPS completas
- Teste a URL em um navegador
- Considere usar um CDN

## 🔐 Adicionar Domínio Personalizado

1. Em Settings → Pages
2. Em "Custom domain", adicione seu domínio
3. Configure DNS no provedor
4. Ative HTTPS (recomendado)

## 📚 Recursos Úteis

- [Documentação GitHub Pages](https://docs.github.com/en/pages)
- [Como configurar domínio personalizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/troubleshooting)

---

**Pronto! Seu site estará online em poucos minutos! 🎉**
