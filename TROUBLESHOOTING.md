# 🔧 Guía de Solución de Problemas - Sistema de Boletos

## ❌ Errores Comunes y Soluciones

### 1. Error: "column reference 'code' is ambiguous"

**Problema:** Este error ocurre cuando hay conflictos en el esquema de la base de datos.

**Solución:**

```sql
-- Ejecutar en Supabase SQL Editor
DROP TABLE IF EXISTS tickets CASCADE;

-- Usar el esquema simplificado
-- Copiar y pegar el contenido de supabase-schema-simple.sql
```

### 2. Error: "bucket comprobantes does not exist"

**Problema:** El bucket de Storage no está creado o configurado.

**Solución:**

1. Ir a Supabase Dashboard → Storage
2. Crear bucket llamado `comprobantes`
3. Marcar como público
4. Aplicar políticas de Storage

### 3. Error: "No se pudo generar el código del boleto"

**Problema:** El sistema no puede generar códigos únicos.

**Solución:**

- El código ahora se genera en el cliente
- Verifica que la tabla `tickets` exista
- Revisa la conexión a Supabase

### 4. Error: "Error al subir comprobante"

**Problema:** Problemas con Supabase Storage.

**Solución:**

1. Verificar que el bucket `comprobantes` esté creado
2. Confirmar que las políticas de Storage estén aplicadas:

```sql
-- Política para subir archivos
CREATE POLICY "Allow receipt uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'comprobantes');

-- Política para descargar archivos
CREATE POLICY "Allow receipt downloads" ON storage.objects
  FOR SELECT USING (bucket_id = 'comprobantes');
```

### 5. Error: "Invalid JWT" o "API key not found"

**Problema:** Variables de entorno mal configuradas.

**Solución:**

1. Verificar `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. Reiniciar servidor de desarrollo:

```bash
npm run dev
```

### 6. Error: "RLS policy violation"

**Problema:** Políticas de Row Level Security mal configuradas.

**Solución:**

```sql
-- Deshabilitar RLS temporalmente para probar
ALTER TABLE tickets DISABLE ROW LEVEL SECURITY;

-- O aplicar políticas correctas
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON tickets
  USING (true) WITH CHECK (true);
```

## 🧪 Herramientas de Debugging

### 1. Probar Conexión a Supabase

```javascript
// En la consola del navegador
import { supabase } from "@/lib/supabase";

// Probar conexión
const { data, error } = await supabase.from("tickets").select("count");
console.log("Conexión:", data, error);
```

### 2. Ejecutar Pruebas del Sistema

```javascript
// En la consola del navegador (después de importar ticket-test.ts)
await window.testTicketSystem();
```

### 3. Verificar Tabla de Tickets

```sql
-- En Supabase SQL Editor
SELECT * FROM tickets ORDER BY created_at DESC LIMIT 10;
```

### 4. Verificar Storage

```sql
-- En Supabase SQL Editor
SELECT * FROM storage.objects WHERE bucket_id = 'comprobantes';
```

## 🔍 Logs y Monitoreo

### 1. Logs de Supabase

1. Ir a Supabase Dashboard → Logs
2. Seleccionar "Database" o "API"
3. Buscar errores recientes

### 2. Logs del Navegador

1. Abrir DevTools (F12)
2. Ir a Console
3. Buscar errores en rojo

### 3. Logs de Next.js

```bash
# En terminal
npm run dev

# Observar logs del servidor
```

## 🛠️ Comandos Útiles

### Limpiar y Reinstalar

```bash
# Limpiar node_modules
rm -rf node_modules package-lock.json
npm install

# Limpiar cache de Next.js
rm -rf .next
npm run build
```

### Verificar Dependencias

```bash
# Verificar que estén instaladas
npm list @supabase/supabase-js
npm list qrcode
npm list canvas
```

### Resetear Base de Datos

```sql
-- En Supabase SQL Editor
DROP TABLE IF EXISTS tickets CASCADE;
-- Luego ejecutar supabase-schema-simple.sql
```

## 🚨 Problemas Específicos

### Canvas no funciona

**Problema:** Error al generar imágenes de boletos.

**Solución:**

1. Verificar que `canvas` esté instalado:

```bash
npm install canvas
```

2. Si hay problemas en macOS:

```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

### QR Code no se genera

**Problema:** Error al generar códigos QR.

**Solución:**

```bash
npm install qrcode @types/qrcode
```

### Error de CORS

**Problema:** Requests bloqueados por CORS.

**Solución:**

1. En Supabase Dashboard → Settings → API
2. Añadir dominio a CORS origins:
   - `http://localhost:3000`
   - `https://tu-dominio.com`

## 📞 Obtener Ayuda

### 1. Logs Detallados

```javascript
// Activar logs detallados
localStorage.setItem("debug", "supabase:*");
```

### 2. Crear Issue

Si el problema persiste:

1. Copiar logs de error
2. Describir pasos para reproducir
3. Crear issue en el repositorio

### 3. Verificar Estado del Sistema

```javascript
// Función de diagnóstico
async function diagnosticSystem() {
  console.log("🔍 Diagnóstico del sistema...");

  // Verificar Supabase
  try {
    const { data } = await supabase.from("tickets").select("count");
    console.log("✅ Supabase conectado");
  } catch (error) {
    console.error("❌ Error Supabase:", error);
  }

  // Verificar Storage
  try {
    const { data } = await supabase.storage.from("comprobantes").list();
    console.log("✅ Storage accesible");
  } catch (error) {
    console.error("❌ Error Storage:", error);
  }

  console.log("🔍 Diagnóstico completado");
}

// Ejecutar diagnóstico
diagnosticSystem();
```

## 🎯 Checklist de Verificación

- [ ] ✅ Supabase proyecto creado
- [ ] ✅ Esquema SQL ejecutado
- [ ] ✅ Bucket `comprobantes` creado
- [ ] ✅ Políticas de Storage aplicadas
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Dependencias instaladas
- [ ] ✅ Servidor de desarrollo funcionando
- [ ] ✅ Pruebas básicas pasando

¡Si sigues estos pasos deberías resolver la mayoría de problemas! 🚀
