# 🎨 Guia de Customização - Vida Saudável BR

> Todas as customizações em um só lugar!

---

## 📝 Como Customizar Sua Loja

### 1. Trocar Nome e Branding

**Arquivo:** `config.js`

```javascript
const BRANDING = {
    storeName: 'Seu Nome Aqui',
    tagline: 'Sua frase de impacto',
    // ... mais configurações
};
```

**Também edite:**
- `index.html` - linha ~20 (dentro do header)
- `product.html` - linha ~20 (dentro do header)

### 2. Mudar Logo

**Passo 1:** Coloque seu logo em `assets/` (SVG ou PNG)

**Passo 2:** Edite `config.js`:
```javascript
logoPath: 'assets/seu-logo.svg'  // ou .png
```

**Passo 3:** Logo aparecerá automaticamente!

### 3. Trocar Cores

**Arquivo:** `style.css` (linhas 1-15)

```css
:root {
    --primary-color: #27AE60;      /* Verde - mude aqui */
    --secondary-color: #4ECDC4;    /* Turquesa - mude aqui */
    --dark-color: #2C3E50;         /* Cinza escuro */
    --light-color: #ECF0F1;        /* Cinza claro */
}
```

**Paletas prontas:**

🔵 **Azul Profissional**
```css
--primary-color: #0066CC;
--secondary-color: #0099FF;
--dark-color: #003D99;
```

🟢 **Verde Natural**
```css
--primary-color: #27AE60;
--secondary-color: #52BE80;
--dark-color: #1E8449;
```

🟠 **Laranja Energético**
```css
--primary-color: #E67E22;
--secondary-color: #F39C12;
--dark-color: #D35400;
```

### 4. Customizar Produto Destaque

**Arquivo:** `products.js`

O primeiro produto com `featured: true` aparecerá na hero section.

```javascript
{
    id: 1,
    name: 'Seu Produto Destaque',
    description: '...',
    image: 'assets/seu-produto.svg',
    featured: true,  // ← Deixe como true
    // ... outros campos
}
```

### 5. Adicionar Imagem de Produto

**Passo 1:** Salve sua imagem em `assets/`
```
assets/
├─ logo.svg
├─ produto-destaque.svg
└─ seu-produto.jpg  ← Adicione aqui
```

**Passo 2:** Referencie em `products.js`:
```javascript
{
    image: 'assets/seu-produto.jpg'
    // ou URL externa:
    // image: 'https://cdn.seu-site.com/produto.jpg'
}
```

### 6. Trocar Link de Afiliado

**Arquivo:** `products.js`

```javascript
{
    affiliate_link: 'https://braip.com/seu-link?afiliado=seu-codigo'
    // Mude para seu link
}
```

---

## 📁 Estrutura de Arquivos

```
Vida Saudável BR/
├─ index.html              ← Página inicial
├─ product.html            ← Detalhes do produto
├─ config.js               ← Configurações (EDITE AQUI!)
├─ products.js             ← Seus produtos
├─ script.js               ← Lógica (não edite)
├─ style.css               ← Estilos (Colors aqui)
├─ assets/
│  ├─ logo.svg            ← Seu logo
│  └─ produto-destaque.svg ← Imagem destaque
└─ ... (outros arquivos)
```

---

## 🎯 Checklist de Customização

- [ ] Coloquei meu logo em `assets/logo.svg`
- [ ] Mudei o nome em `config.js`
- [ ] Escolhi minhas cores em `style.css`
- [ ] Atualizei meu link de afiliado
- [ ] Customizei o produto destaque
- [ ] Testei localmente: `python3 -m http.server 8000`
- [ ] Tudo funciona corretamente!

---

## 🚀 Próximos Passos

1. Customize conforme acima
2. Teste localmente
3. Faça push para GitHub
4. Seu site estará online!

---

## 💡 Dicas

✅ **Use imagens em SVG** - Melhor que PNG (menor tamanho)

✅ **URLs de imagens** - Use HTTPS completas

✅ **Cache do navegador** - Limpe com Ctrl+Shift+Del

✅ **Modo escuro** - GitHub Pages tem tema escuro por padrão

---

**Dúvidas?** Consulte `README.md` para documentação técnica completa.
