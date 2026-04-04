# Checklist de Testes - Rastreamento GTM

## ✅ Testes Manuais

### Página Inicial (index.html)
1. **Verificar Data Layer**
   - [ ] Abrir DevTools (F12) > Console
   - [ ] Digitar `window.dataLayer` e verificar se existe

2. **Teste de Clique - Filtro**
   - [ ] Clicar no botão "Todos"
   - [ ] Verificar console para log: `[GTM] Filter Applied Tracked`
   - [ ] Verificar data layer push com `eventCategory: 'filter'`
   - [ ] Clicar em "🔥 Mais Vendidos"
   - [ ] Verificar data layer push

3. **Teste de Clique - Visualizar Detalhes**
   - [ ] Clicar em "Ver Detalhes" em qualquer produto
   - [ ] Verificar console para log: `[GTM] Product View Tracked`
   - [ ] Verificar data layer com `eventCategory: 'product'`

4. **Teste de Clique - Comprar**
   - [ ] Clicar em "Comprar" em qualquer produto
   - [ ] Verificar console para log: `[GTM] Affiliate Click Tracked`
   - [ ] Verificar data layer com `eventCategory: 'affiliate'`
   - [ ] Verificar se `affiliateLink` está preenchido

5. **Teste - Hero Destaque**
   - [ ] Clicar em "Saiba Mais" no hero
   - [ ] Verificar logs e data layer
   - [ ] Clicar em "Comprar com Desconto"
   - [ ] Verificar logs e data layer

### Página de Detalhes do Produto (product.html?id=1)
1. **Verificar Carregamento de Página**
   - [ ] Abrir DevTools > Console
   - [ ] Verificar log: `[GTM] Custom Event Tracked: product_viewed`
   - [ ] Verificar data layer com dados do produto

2. **Teste - Seleção de Variação**
   - [ ] Clicar em "3 potes" (ou outra variação)
   - [ ] Verificar console: `[GTM] Custom Event Tracked: variation_selected`
   - [ ] Verificar que `variationPrice` muda no data layer
   - [ ] Testar outras variações

3. **Teste - Comprar Agora**
   - [ ] Clicar em "Comprar Agora"
   - [ ] Verificar console: `[GTM] Custom Event Tracked: affiliate_purchase`
   - [ ] Verificar data layer com:
     - `productId`
     - `productName`
     - `variationLabel` (label da variação selecionada)
     - `variationPrice`
     - `affiliateLink`

4. **Teste - Produtos Relacionados**
   - [ ] Clicar em "Ver Detalhes" em produto relacionado
   - [ ] Verificar que navega corretamente
   - [ ] Verificar logs na página do novo produto

## 📊 Verificação de Data Layer

### Estrutura Esperada
```javascript
window.dataLayer[n] = {
    event: 'nome_do_evento',
    eventCategory: 'categoria',
    eventAction: 'ação',
    eventLabel: 'label',
    // ... dados específicos
    'Click URL': 'url',
    'Click Text': 'texto',
    'Click Element': 'button|a|div',
    'Click Classes': 'classes',
    'Click ID': 'id',
    timestamp: 'ISO date'
}
```

### Eventos Esperados
- [ ] `page_view` - ao carregar página
- [ ] `filter_applied` - ao aplicar filtro
- [ ] `affiliate_purchase` - ao clicar em comprar
- [ ] `view_product_details` - ao clicar em detalhes
- [ ] `product_viewed` - ao carregar página de detalhes
- [ ] `variation_selected` - ao selecionar variação

## 🔗 Integração com GTM

### No Google Tag Manager (https://tagmanager.google.com)
1. **Verificar Preview Mode**
   - [ ] Clique em "Preview"
   - [ ] Abra o site em outra aba
   - [ ] GTM Preview deve mostrar os eventos disparados

2. **Verificar Variables**
   - [ ] Confirme que consegue acessar `productId`
   - [ ] Confirme que consegue acessar `productName`
   - [ ] Confirme que consegue acessar `eventCategory`
   - [ ] Confirme que consegue acessar variáveis de clique

3. **Testar Triggers**
   - [ ] Crie um trigger de teste para evento `affiliate_purchase`
   - [ ] Crie uma tag de teste que faça log
   - [ ] Execute a ação e verifique se a tag foi acionada

## 🚀 Integração com GA4 (Se Configurado)

Se você configurou GA4:
1. **Real-Time**
   - [ ] Vá para GA4 > Real-time
   - [ ] Execute ações no site
   - [ ] Verifique se os eventos aparecem em tempo real

2. **Events**
   - [ ] Vá para GA4 > Events
   - [ ] Verifique se os eventos foram capturados
   - [ ] Verifique os parâmetros de cada evento

## 📝 Notas de Teste

- Todos os eventos devem aparecer no console do navegador com prefixo `[GTM]`
- O data layer pode ser inspecionado em qualquer momento com `window.dataLayer`
- Use o Preview Mode do GTM para debug em tempo real
- Verifique que os dados contêm informações corretas antes de integrar com GA4

## ⚠️ Possíveis Problemas

| Problema | Solução |
|----------|---------|
| Data layer vazio | Aguarde carregamento da página, verifique console para erros |
| Eventos não disparam | Verifique se gtm-config.js está sendo carregado antes dos outros scripts |
| Data layer com undefined | Verifique se o elemento foi capturado corretamente |
| URL vazia em Click URL | Verifique se o link tem href ou data-link attribute |

---

**Todos os testes devem passar antes de enviar para produção!**
