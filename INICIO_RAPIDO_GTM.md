# 🚀 Início Rápido - Rastreamento GTM

## ⚡ Em 5 Minutos

### 1. Verificar que está funcionando
```bash
# Abra no navegador:
# - index.html (página inicial)
# - product.html?id=1 (página de detalhes)
```

### 2. Abrir DevTools
- Windows/Linux: **F12**
- Mac: **Cmd + Option + I**

### 3. Ir para Console
- Clique na aba "Console"

### 4. Ver eventos
```javascript
// No console, digite:
window.dataLayer

// Ou veja os logs:
// [GTM] Affiliate Click Tracked: {...}
// [GTM] Product View Tracked: {...}
// [GTM] Filter Applied Tracked: {...}
```

### 5. Testar eventos
- 🖱️ Clique em "Filtros" → vê `filter_applied`
- 🖱️ Clique em "Ver Detalhes" → vê `view_product_details`
- 🖱️ Clique em "Comprar" → vê `affiliate_purchase`
- 🖱️ Selecione variação → vé `variation_selected`

---

## 📊 Próximos: Configurar no GTM

### Passo 1: Acesse GTM
```
https://tagmanager.google.com
→ Abra o container GTM-MNDQF3HM
```

### Passo 2: Crie Variáveis
```
Admin > Variáveis > Nova
Tipo: Variável de Camada de Dados

Crie estas:
- productId
- productName
- productPrice
- eventCategory
- eventAction
- eventLabel
- affiliateLink
- variationId
- variationLabel
```

### Passo 3: Crie Tags
```
Tags > Nova Tag
Tipo: Google Analytics 4
Evento: affiliate_purchase

Parâmetros:
- product_id = {{productId}}
- product_name = {{productName}}
```

### Passo 4: Crie Triggers
```
Triggers > Nova Trigger
Tipo: Evento Customizado
Nome do Evento: affiliate_purchase
```

### Passo 5: Preview
```
Clique "Preview" no GTM
Abra seu site em outra aba
Veja os eventos em tempo real
```

---

## �� Eventos e Dados

| Evento | Onde Dispara | Dados Principais |
|--------|-------------|-----------------|
| **affiliate_purchase** | Clique em "Comprar" | productId, productName, variationLabel, affiliateLink |
| **view_product_details** | Clique em "Ver Detalhes" | productId, productName, eventLabel |
| **filter_applied** | Clique em filtro | filterType, eventCategory, eventAction |
| **variation_selected** | Selecionar quantidade | productId, variationId, variationLabel, variationPrice |
| **product_viewed** | Carregar página produto | productId, productName, productPrice |
| **page_view** | Carregar qualquer página | pageName, pageType, pageUrl |

---

## 🔗 Integração com GA4

Se já tem GA4 configurado:

1. Crie as mesmas Tags e Triggers
2. Vá em GA4 > Real-time
3. Execute ações no site
4. Veja eventos aparecendo em tempo real

---

## 🐛 Debugging

### Console não mostra eventos?
```javascript
// Digite no console:
console.clear()
// Depois execute uma ação e veja
```

### Data layer vazio?
- Verifique que gtm-config.js está sendo carregado
- Veja abas "Network" em DevTools

### Eventos não chegam no GTM?
- Use Preview Mode do GTM
- Verifique se as tags estão publicadas
- Valide em tempo real

---

## 📞 Suporte Rápido

**Problema** | **Solução**
---|---
Sem logs no console | F12 > Console > Limpar > Clicar botão
Data layer undefined | Aguarde carregamento da página
GTM não recebe eventos | Use Preview Mode para debug
GA4 vazio | Verifique se a tag foi criada e publicada

---

## 📚 Documentação Completa

Para mais detalhes, veja:
- **GTM_TRACKING_GUIDE.md** - Guia completo
- **GTM_TEST_CHECKLIST.md** - Checklist de testes

---

**Pronto! Seus cliques estão sendo rastreados! 🎉**
