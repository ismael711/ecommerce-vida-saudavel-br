# Guia de Rastreamento com Google Tag Manager (GTM)

## 📊 Visão Geral

O site agora está totalmente configurado para rastreamento avançado de cliques através do Google Tag Manager (GTM). O GTM ID configurado é **GTM-MNDQF3HM**.

## 🎯 Variáveis Padrões do GTM Rastreadas

### Variáveis de Clique (Click Variables)
- **Click URL**: URL do link clicado
- **Click Text**: Texto do botão/link
- **Click Element**: Tipo de elemento (button, link, etc)
- **Click Classes**: Classes CSS do elemento
- **Click ID**: ID do elemento
- **Click Target**: Atributo target do link (_blank, _self, etc)
- **Click URL hostname**: Host/domínio da URL

## 📋 Eventos Rastreados

### 1. **affiliate_purchase** - Clique em Comprar
Disparado quando o usuário clica em um botão de compra de produto.

**Dados capturados:**
- `productId`: ID do produto
- `productName`: Nome do produto
- `variationId`: ID da variação selecionada (se aplicável)
- `variationLabel`: Label da variação (ex: "3 potes")
- `variationPrice`: Preço da variação
- `affiliateLink`: URL de afiliado
- `eventCategory`: "affiliate"
- `eventAction`: "purchase_click"
- `eventLabel`: Nome do produto

**Triggers:**
- Clique no botão "Comprar" na grid de produtos (página inicial)
- Clique no botão "Comprar com Desconto" no hero destaque
- Clique no botão "Comprar Agora" na página de detalhes
- Clique em "Comprar" nos produtos relacionados

### 2. **view_product_details** - Visualização de Detalhes
Disparado quando o usuário visualiza detalhes de um produto.

**Dados capturados:**
- `productId`: ID do produto
- `productName`: Nome do produto
- `eventCategory`: "product"
- `eventAction`: "view_details"
- `eventLabel`: Nome do produto

**Triggers:**
- Clique em "Ver Detalhes" na grid
- Clique em "Saiba Mais" no hero destaque
- Clique no card de produto relacionado

### 3. **filter_applied** - Filtro Aplicado
Disparado quando o usuário aplica um filtro.

**Dados capturados:**
- `filterType`: Tipo de filtro (all, bestseller)
- `eventCategory`: "filter"
- `eventAction`: "apply_filter"
- `eventLabel`: Tipo de filtro
- Variáveis padrões de clique

**Triggers:**
- Clique nos botões de filtro ("Todos", "🔥 Mais Vendidos")

### 4. **product_viewed** - Produto Visualizado (página de detalhes)
Disparado automaticamente quando a página de detalhes carrega.

**Dados capturados:**
- `productId`: ID do produto
- `productName`: Nome do produto
- `productPrice`: Preço do produto
- `eventCategory`: "product"
- `eventAction`: "view_details"

### 5. **variation_selected** - Variação Selecionada
Disparado quando o usuário seleciona uma variação (quantidade) de produto.

**Dados capturados:**
- `productId`: ID do produto
- `productName`: Nome do produto
- `variationId`: ID da variação
- `variationLabel`: Label da variação
- `variationPrice`: Preço da variação
- `eventCategory`: "product"
- `eventAction`: "select_variation"

### 6. **page_view** - Visualização de Página
Disparado automaticamente em cada página carregada.

**Dados capturados:**
- `pageName`: Título da página
- `pageType`: Tipo de página (product_listing)
- `pageUrl`: URL da página
- `pageTitle`: Título do documento

### 7. **user_engagement** - Engajamento do Usuário
Disparado quando o usuário rola a página abaixo do fold.

**Dados capturados:**
- `engagementType`: Tipo de engajamento (scroll)
- `engagementValue`: Valor (below_fold)

## 🔧 Funções Disponíveis para Desenvolvimento

### `pushDataLayer(data)`
Faz push de dados customizados ao data layer.

```javascript
pushDataLayer({
    'event': 'custom_event',
    'customData': 'value'
});
```

### `trackCustomEvent(eventName, data)`
Rastreia um evento customizado.

```javascript
trackCustomEvent('meu_evento', {
    'metrica1': 'valor1',
    'metrica2': 'valor2'
});
```

### `trackPageView(pageName, pageType)`
Rastreia visualização de página.

```javascript
trackPageView('Minha Página', 'custom_page');
```

### `trackEngagement(engagementType, engagementValue)`
Rastreia engajamento do usuário.

```javascript
trackEngagement('custom_engagement', 'valor');
```

### `trackError(errorMessage, errorType)`
Rastreia erros.

```javascript
trackError('Erro de carregamento', 'javascript');
```

## 📱 Estrutura de Eventos no Data Layer

Todos os eventos seguem a estrutura padrão:

```javascript
{
    'event': 'nome_do_evento',
    'eventCategory': 'categoria',
    'eventAction': 'ação',
    'eventLabel': 'label',
    'timestamp': 'ISO 8601 timestamp',
    // ... dados customizados
}
```

## 🚀 Como Configurar no Google Tag Manager

1. **Acesse o Google Tag Manager**
   - URL: https://tagmanager.google.com
   - Acesse o container GTM-MNDQF3HM

2. **Crie Variáveis de Camada de Dados**
   - Variáveis > Nova Variável
   - Tipo: Variável de Camada de Dados
   - Nome da Camada de Dados: (nome do campo)
   - Exemplos:
     - `productId`
     - `productName`
     - `eventCategory`
     - `eventAction`
     - `eventLabel`

3. **Crie Tags de Rastreamento**
   - Tags > Nova Tag
   - Tipo: Google Analytics 4
   - Configure os eventos desejados
   - Triggers: Firewall/Clique
   - Configure para disparar em eventos específicos

4. **Crie Triggers de Eventos Customizados**
   - Triggers > Nova Trigger
   - Tipo: Evento Customizado
   - Nome do evento: (use os nomes dos eventos listados acima)
   - Exemplos:
     - `affiliate_purchase`
     - `view_product_details`
     - `filter_applied`
     - `variation_selected`

## 📊 Exemplos de Configuração no GA4

### Tag: Compra de Afiliado
- **Event name**: `affiliate_purchase`
- **Parameters:**
  - `product_id`: `{{productId}}`
  - `product_name`: `{{productName}}`
  - `variation_label`: `{{variationLabel}}`
  - `affiliate_link`: `{{affiliateLink}}`

### Tag: Visualização de Produto
- **Event name**: `product_detail_view`
- **Parameters:**
  - `product_id`: `{{productId}}`
  - `product_name`: `{{productName}}`
  - `value`: `{{productPrice}}`

### Tag: Aplicação de Filtro
- **Event name**: `filter_applied`
- **Parameters:**
  - `filter_type`: `{{filterType}}`

## 🔍 Debugging e Testes

### 1. **Verificar Data Layer no Console**
```javascript
// No console do navegador (F12)
window.dataLayer
```

### 2. **Usar GTM Preview Mode**
- No Google Tag Manager, clique em "Preview"
- Isso abre um modo de preview que mostra os eventos disparados

### 3. **Verificar Logs**
- O arquivo `gtm-config.js` registra todos os eventos no console
- Abra o DevTools (F12) > Aba "Console" para ver os logs

### 4. **Google Analytics 4 Real-Time**
- Em GA4, vá para "Real-time" para ver os eventos sendo capturados em tempo real

## 📝 Notas Importantes

1. **GTM já está instalado** no index.html e product.html
2. **O arquivo gtm-config.js é carregado primeiro** na sequência de scripts
3. **Event listeners são configurados automaticamente** para capturar cliques
4. **Data é enviada para o data layer** em tempo real
5. **Compatível com GA4 e outras plataformas** que usam data layer

## 🎯 Próximos Passos

1. **Configure Variáveis no GTM** seguindo o guia acima
2. **Crie Tags para seus destinos** (GA4, Meta Pixel, etc)
3. **Teste em Preview Mode** antes de publicar
4. **Monitore em Real-Time** para garantir que os eventos estão sendo capturados
5. **Crie relatórios e dashboards** em GA4

## ❓ Troubleshooting

### Eventos não aparecem no GA4
- Verifique se a Tag está ativada
- Verifique se o Trigger está correto
- Verifique em Preview Mode se o evento está sendo disparado

### Data Layer vazio
- Aguarde o carregamento da página
- Verifique o console para mensagens de erro
- Verifique se gtm-config.js está sendo carregado

### Variáveis não funcionam
- Certifique-se de que o nome da variável corresponde exatamente
- Verifique se a variável foi criada como "Variável de Camada de Dados"

---

**Versão**: 1.0
**Última atualização**: 2024
**Suporte**: Consulte a documentação do GTM em support.google.com/tagmanager
