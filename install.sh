#!/bin/bash

# Script de instalación rápida para el Sistema de Boletos
# Ejecutar con: bash install.sh

echo "🎫 Instalando Sistema de Boletos para DgoTecHub"
echo "==============================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Este script debe ejecutarse en el directorio raíz del proyecto"
    exit 1
fi

echo "📦 Instalando dependencias..."
npm install @supabase/supabase-js @supabase/storage-js qrcode @types/qrcode canvas html2canvas

echo "📋 Creando archivo de variables de entorno..."
if [ ! -f ".env.local" ]; then
    cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
EOF
    echo "✅ Archivo .env.local creado"
    echo "   Por favor, configura tus claves de Supabase"
else
    echo "ℹ️  El archivo .env.local ya existe"
fi

echo "🗄️  Preparando esquema de base de datos..."
echo "   Ejecuta el contenido de 'supabase-schema.sql' en tu dashboard de Supabase"

echo "📁 Configuración de Storage:"
echo "   1. Crea un bucket llamado 'comprobantes' en Supabase Storage"
echo "   2. Configura el bucket como público"
echo "   3. Aplica las políticas de Storage del README"

echo "🎨 Personalización:"
echo "   Edita src/lib/party-config.ts para configurar tu evento"

echo "🚀 Instalación completada!"
echo "==============================================="
echo "Próximos pasos:"
echo "1. Configura Supabase siguiendo SUPABASE_SETUP.md"
echo "2. Edita src/lib/party-config.ts con los datos de tu evento"
echo "3. Ejecuta 'npm run dev' para probar el sistema"
echo "4. Lee TICKETS_README.md para documentación completa"
echo ""
echo "¿Necesitas ayuda? Consulta los archivos README incluidos."
