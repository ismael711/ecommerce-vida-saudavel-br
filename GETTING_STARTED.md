# 🚀 Como Começar - Vida Saudável BR

## Opção 1: Testar Agora (2 minutos)

```bash
cd /Users/ismaelrojas/Library/CloudStorage/OneDrive-IBM/Documents/Projetos/ecommerce-vida-saudavel-br
python3 -m http.server 8000
```

Abra: **http://localhost:8000**

## Opção 2: Publicar no GitHub (5 minutos)

### Passo 1: Criar Repositório
- Vá para [github.com/new](https://github.com/new)
- Nome: `ecommerce-vida-saudavel-br`
- Clique em "Create repository"

### Passo 2: Fazer Upload
```bash
git init
git add .
git commit -m "E-commerce Suplementos Premium 🎉"
git branch -M main

# Copie a URL do seu repo do GitHub
git remote add origin https://github.com/SEU-USUARIO/ecommerce-vida-saudavel-br.git
git push -u origin main
```

### Passo 3: Ativar GitHub Pages
- No repositório, vá em **Settings**
- Procure **Pages** (lado esquerdo)
- Em "Source" selecione **main branch**
- Clique em **Save**

**Pronto! 🎉** Seu site estará em:
```
https://seu-usuario.github.io/ecommerce-vida-saudavel-br
```

---

## 📝 Customizar Seu Site

### 1. Trocar Nome da Loja
**Arquivo:** `index.html` e `product.html`

Procure:
```html
<h1>Vida Saudável BR</h1>
```

Troque por:
```html
<h1>Seu Nome de Loja</h1>
```

### 2. Trocar Tagline
**Arquivo:** `index.html` e `product.html`

Procure:
```html
<p class="tagline">Os melhores suplementos para sua saúde</p>
```

Troque por:
```html
<p class="tagline">Sua mensagem aqui</p>
```

### 3. Adicionar Novos Produtos
**Arquivo:** `products.js`

Encontre o array `PRODUCTS` e adicione:
```javascript
{
    id: 7,
    name: 'Seu Produto',
    description: 'Descrição breve aqui',
    fullDescription: 'Descrição completa aqui...',
    image: 'https://via.placeholder.com/300x300?text=Seu+Produto',
    price: 99.90,
    affiliate_link: 'https://braip.com/seu-link-aqui',
    bestseller: true,  // ou false
    benefits: ['Benefício 1', 'Benefício 2', 'Benefício 3'],
    serving: '10g',
    servings: '60 porções'
}
```

### 4. Trocar Cores
**Arquivo:** `style.css` (linhas 1-15)

```css
:root {
    --primary-color: #27AE60;      /* Verde primário */
    --secondary-color: #4ECDC4;    /* Turquesa */
    --dark-color: #2C3E50;         /* Cinza escuro */
    --light-color: #ECF0F1;        /* Cinza claro */
}
```

Trocar por suas cores:
```css
:root {
    --primary-color: #007BFF;      /* Azul */
    --secondary-color: #28A745;    /* Verde */
    --dark-color: #333333;         /* Preto */
    --light-color: #F5F5F5;        /* Cinza */
}
```

### 5. Usar Imagens Reais
Substitua URLs de placeholder:

```javascript
// De:
image: 'https://via.placeholder.com/300x300?text=Produto'

// Para:
image: 'https://cdn.seu-site.com/imagens/produto.jpg'
```

---

## 🎨 Dicas de Design

### Paletas de Cores Prontas

**🔴 Vermelha (Padrão)**
```css
--primary-color: #27AE60;
--secondary-color: #FF8C8C;
--dark-color: #C92A2A;
```

**🔵 Azul Profissional**
```css
--primary-color: #0066CC;
--secondary-color: #0082FF;
--dark-color: #003D99;
```

**🟢 Verde Natural**
```css
--primary-color: #27AE60;
--secondary-color: #52BE80;
--dark-color: #1E8449;
```

**🟠 Laranja Energético**
```css
--primary-color: #F39C12;
--secondary-color: #F5B041;
--dark-color: #D68910;
```

**🟣 Roxo Premium**
```css
--primary-color: #8E44AD;
--secondary-color: #AF7AC5;
--dark-color: #6C3483;
```

---

## ✅ Checklist Antes de Publicar

- [ ] Atualizou nome da loja
- [ ] Adicionou/editou produtos
- [ ] Testou em mobile (F12 > Responsive)
- [ ] Verificou links de afiliados
- [ ] Mudou cores se desejar
- [ ] Testou tudo localmente
- [ ] Fez commit do git
- [ ] Ativou GitHub Pages

---

## 🧪 Testar Responsividade

No navegador, pressione **F12** e:
1. Clique no ícone de dispositivo (canto superior esquerdo)
2. Selecione diferentes dispositivos
3. Verifique se tudo funciona

---

## 🔗 Links Importantes

| Link | Descrição |
|------|-----------|
| [GitHub Pages](https://docs.github.com/en/pages) | Documentação oficial |
| [Braip Afiliados](https://braip.com) | Plataforma de afiliados |
| [Placeholder Images](https://via.placeholder.com) | Imagens de teste |
| [Coolors](https://coolors.co) | Gerador de paletas |
| [Font Awesome](https://fontawesome.com) | Ícones (opcional) |

---

## 💡 Próximos Passos

1. **Domínio Personalizado** - Configure seu domínio no GitHub Pages
2. **Google Analytics** - Rastreie visitantes
3. **Email Marketing** - Integre com Mailchimp
4. **Checkout** - Adicione Stripe ou Hotmart
5. **Blog** - Crie conteúdo para SEO

---

## 🆘 Precisa de Ajuda?

1. **Consulte** `README.md` para guia completo
2. **Visite** `examples.html` no seu navegador
3. **Leia** `DEPLOYMENT.md` para troubleshooting
4. **Execute** `./test-validation.sh` para verificar

---

**Você está pronto! Comece agora! 🎉**

Perguntas? Leia a documentação incluída no projeto.
