#!/bin/bash

# Script para probar la funcionalidad de descarga de boletos
# Ejecutar desde la raíz del proyecto

echo "🧪 Probando la funcionalidad de descarga de boletos..."

# Verificar que los archivos necesarios existen
echo "✅ Verificando archivos..."

files=(
  "src/app/(site)/download-ticket/page.tsx"
  "src/app/(site)/download-ticket/[code]/page.tsx"
  "src/app/(site)/tickets/[code]/page.tsx"
  "src/app/api/tickets/send-download-link/route.ts"
  "src/app/api/tickets/download/[code]/route.ts"
  "src/components/tickets/TicketPreview.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (FALTA)"
  fi
done

echo ""
echo "🚀 Funcionalidades implementadas:"
echo "  📧 Envío de emails con links de descarga (SOLO BOLETOS PAGADOS)"
echo "  🔍 Búsqueda de boletos por email (FILTRA SOLO PAGADOS)"
echo "  📱 Página para descargar boletos individuales"
echo "  🎫 Página de visualización completa del boleto"
echo "  🔗 Link en navbar para recuperar boletos"
echo ""
echo "🚨 IMPORTANTE: Solo se envían emails para boletos PAGADOS"
echo ""
echo "📋 Para probar:"
echo "  1. Inicia el servidor: npm run dev"
echo "  2. Ve a http://localhost:3000/download-ticket"
echo "  3. Ingresa un email que tenga boletos PAGADOS"
echo "  4. Revisa que llegue el email con los links"
echo "  5. Prueba abrir los links para ver/descargar boletos"
echo "  6. Verifica que boletos pendientes NO aparezcan"
echo ""
echo "🎯 URLs importantes:"
echo "  • Recuperar boleto: /download-ticket"
echo "  • Ver boleto específico: /download-ticket/[CODE]"
echo "  • Descargar boleto: /tickets/[CODE]"
echo ""
