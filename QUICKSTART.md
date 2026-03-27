# ⚡ Guia Rápido - Vida Saudável BR

## Começar em 5 Minutos

### 1️⃣ Testar Localmente (Imediatamente)

```bash
# No diretório do projeto
python3 -m http.server 8000

# Abra no navegador
http://localhost:8000
```

### 2️⃣ Publicar no GitHub Pages

```bash
# Inicializar git
git init
git add .
git commit -m "E-commerce Suplementos Premium"

# Conectar ao GitHub (substitua seu-usuario/seu-repo)
git remote add origin https://github.com/seu-usuario/seu-repo.git
git branch -M main
git push -u origin main

# GitHub Pages ativa automaticamente
# Seu site será publicado em: https://seu-usuario.github.io/seu-repo
```

## 📁 Estrutura Essencial

```
index.html          → Página inicial
product.html        → Detalhes do produto
products.js         → Dados dos produtos
script.js           → Lógica da home
product-detail.js   → Lógica do detalhe
style.css           → Estilos
```

## 🎨 Customizações Rápidas

### Trocar Nome da Loja
```html
<!-- Em index.html e product.html -->
<h1>Seu Nome Aqui</h1>
```

### Adicionar Novo Produto
```javascript
// Em products.js, adicione ao array PRODUCTS:
{
    id: 7,
    name: 'Novo Produto',
    price: 99.90,
    image: 'https://via.placeholder.com/300?text=Novo',
    affiliate_link: 'seu-link-braip',
    // ... outros campos
}
```

### Trocar Cores
```css
/* Em style.css */
:root {
    --primary-color: #27AE60;    /* Cor principal */
    --secondary-color: #4ECDC4;  /* Cor secundária */
}
```

## ✅ Verificação Final

- [ ] Site carrega sem erros
- [ ] Produtos aparecem na grid
- [ ] Clique em produto abre detalhes
- [ ] Botão "Comprar" abre link externo
- [ ] Design responsivo em mobile
- [ ] Links de afiliados funcionam

## 📚 Documentação Completa

- **README.md** - Guia completo do projeto
- **DEPLOYMENT.md** - Instruções de deploy detalhadas
- **examples.html** - Exemplos de código e extensões
- **products.js** - Documentação dos produtos
- **script.js** - Código comentado

## 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Site não carrega | Verifique se está em http://localhost:8000 |
| Produtos não aparecem | Abra DevTools (F12) e verifique console |
| Links de afiliados não funcionam | Verifique URLs em `products.js` |
| Imagens não carregam | Use URLs HTTPS completas |
| GitHub Pages não atualiza | Aguarde 5 minutos ou limpe cache |

## 🚀 Próximos Passos

1. Adicionar mais produtos
2. Customizar com seu branding
3. Integrar com API (opcional)
4. Implementar analytics
5. Adicionar domínio personalizado

## 📧 Precisa de Ajuda?

Consulte os arquivos:
- Funcionalidades → Veja `script.js`
- Estrutura dados → Veja `products.js`
- Estilos → Veja `style.css`
- Deploy → Veja `DEPLOYMENT.md`

---

**Você está pronto! 🎉 Comece agora!**
