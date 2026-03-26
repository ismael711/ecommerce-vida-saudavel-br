#!/bin/bash

echo "==================================="
echo "Validação do Projeto E-commerce"
echo "==================================="
echo ""

# Verificar arquivos
echo "✓ Checando arquivos HTML..."
for file in index.html product.html examples.html; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ FALTA: $file"
    fi
done

echo ""
echo "✓ Checando arquivos CSS..."
if [ -f "style.css" ]; then
    echo "  ✓ style.css"
else
    echo "  ✗ FALTA: style.css"
fi

echo ""
echo "✓ Checando arquivos JavaScript..."
for file in products.js script.js product-detail.js; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ FALTA: $file"
    fi
done

echo ""
echo "✓ Checando documentação..."
for file in README.md DEPLOYMENT.md; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ FALTA: $file"
    fi
done

echo ""
echo "✓ Checando configuração..."
for file in package.json _config.yml .gitignore; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ FALTA: $file"
    fi
done

echo ""
echo "==================================="
echo "Validação Concluída!"
echo "==================================="
echo ""
echo "📊 Estatísticas do Projeto:"
wc -l *.html *.css *.js 2>/dev/null | tail -1
echo ""
echo "💾 Tamanho total:"
du -sh . 2>/dev/null
echo ""
echo "🚀 Para testar localmente:"
echo "   python3 -m http.server 8000"
echo ""
