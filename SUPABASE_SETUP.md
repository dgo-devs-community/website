# Configuración de Supabase para el Sistema de Boletos

## 🗄️ Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Haz clic en "New project"
3. Selecciona tu organización
4. Configura tu proyecto:
   - **Name**: `dgotechub-tickets` (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura
   - **Region**: Selecciona la región más cercana (North America para México)
5. Haz clic en "Create new project"

## 🏗️ Paso 2: Configurar Base de Datos

### Ejecutar Schema SQL

1. En el dashboard de Supabase, ve a **SQL Editor**
2. Haz clic en "New Query"
3. Copia y pega el siguiente código:

```sql
-- Tabla para almacenar los boletos
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  status VARCHAR(50) DEFAULT 'pending',
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_tickets_code ON tickets(code);
CREATE INDEX IF NOT EXISTS idx_tickets_email ON tickets(email);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);

-- Función para generar código único
CREATE OR REPLACE FUNCTION generate_ticket_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generar código de 8 caracteres alfanuméricos
    code := UPPER(
      SUBSTRING(
        REPLACE(
          ENCODE(gen_random_bytes(6), 'base64'),
          '/', '0'
        ),
        1, 8
      )
    );

    -- Verificar si el código ya existe
    SELECT EXISTS(SELECT 1 FROM tickets WHERE tickets.code = code) INTO exists;

    -- Si no existe, salir del loop
    IF NOT exists THEN
      EXIT;
    END IF;
  END LOOP;

  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Trigger para generar código automáticamente
CREATE OR REPLACE FUNCTION set_ticket_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.code IS NULL OR NEW.code = '' THEN
    NEW.code := generate_ticket_code();
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_ticket_code
  BEFORE INSERT OR UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION set_ticket_code();

-- Políticas de seguridad RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción de nuevos tickets
CREATE POLICY "Allow ticket creation" ON tickets
  FOR INSERT WITH CHECK (true);

-- Política para permitir lectura de tickets por código
CREATE POLICY "Allow ticket reading by code" ON tickets
  FOR SELECT USING (true);

-- Política para permitir actualización de tickets
CREATE POLICY "Allow ticket updates" ON tickets
  FOR UPDATE USING (true);
```

4. Haz clic en "Run" para ejecutar el script

## 📁 Paso 3: Configurar Storage

### Crear Bucket para Comprobantes

1. Ve a **Storage** en el menú lateral
2. Haz clic en "Create bucket"
3. Configura el bucket:
   - **Name**: `comprobantes`
   - **Public bucket**: ✅ Activado (para que las imágenes sean accesibles)
4. Haz clic en "Create bucket"

### Configurar Políticas de Storage

1. En la sección Storage, haz clic en "Policies"
2. Busca la sección "storage.objects"
3. Haz clic en "Create policy"
4. Configura las políticas:

**Política para subir archivos:**

```sql
CREATE POLICY "Allow receipt uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'comprobantes');
```

**Política para descargar archivos:**

```sql
CREATE POLICY "Allow receipt downloads" ON storage.objects
  FOR SELECT USING (bucket_id = 'comprobantes');
```

## 🔑 Paso 4: Obtener Claves de API

### Obtener Claves

1. Ve a **Settings** → **API**
2. Encontrarás las siguientes claves:
   - **URL**: `https://xxx.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Configurar Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🧪 Paso 5: Probar la Configuración

### Verificar Tablas

1. Ve a **Table Editor**
2. Deberías ver la tabla `tickets`
3. Haz clic en ella para ver su estructura

### Verificar Storage

1. Ve a **Storage**
2. Deberías ver el bucket `comprobantes`
3. Haz clic en él para ver que está vacío (normal)

### Probar Inserción

Ejecuta este query en **SQL Editor** para probar:

```sql
INSERT INTO tickets (name, email, quantity, status)
VALUES ('Test User', 'test@example.com', 1, 'paid');

SELECT * FROM tickets;
```

Deberías ver un registro con un código generado automáticamente.

## 🔧 Paso 6: Configuración Adicional

### Configurar CORS (si es necesario)

Si tienes problemas de CORS:

1. Ve a **Settings** → **API**
2. En **CORS origins**, agrega:
   - `http://localhost:3000` (para desarrollo)
   - `https://tu-dominio.com` (para producción)

### Configurar Rate Limiting

Para evitar spam:

1. Ve a **Settings** → **API**
2. Ajusta los límites según tus necesidades:
   - **Requests per minute**: 100
   - **Requests per hour**: 1000

## 🚀 Paso 7: Despliegue

### Variables de Entorno en Producción

Si usas Vercel:

1. Ve a tu dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega las mismas variables que tienes en `.env.local`

### Actualizar CORS para Producción

1. En Supabase, ve a **Settings** → **API**
2. Agrega tu dominio de producción a CORS origins

## 📊 Paso 8: Monitoreo

### Logs de Base de Datos

1. Ve a **Logs** → **Database**
2. Aquí puedes ver todas las consultas SQL

### Métricas de Storage

1. Ve a **Storage**
2. Haz clic en "Usage" para ver estadísticas

### API Logs

1. Ve a **Logs** → **API**
2. Aquí puedes ver todas las llamadas a la API

## 🛠️ Comandos Útiles

### Respaldar Base de Datos

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Generar tipos TypeScript
supabase gen types typescript --project-id [tu-project-id] > src/types/supabase.ts
```

### Ejecutar Migraciones

```bash
# Crear migración
supabase migration new create_tickets_table

# Aplicar migraciones
supabase db push
```

## 🆘 Solución de Problemas

### Error: "relation tickets does not exist"

**Solución**: Ejecuta el schema SQL completo en SQL Editor

### Error: "bucket comprobantes does not exist"

**Solución**: Crea el bucket en Storage con el nombre exacto `comprobantes`

### Error: "RLS policy violation"

**Solución**: Verifica que las políticas RLS estén configuradas correctamente

### Error: "Invalid JWT"

**Solución**: Verifica que las claves de API sean correctas en `.env.local`

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en Supabase Dashboard
2. Verifica la configuración paso a paso
3. Consulta la [documentación oficial](https://supabase.com/docs)
4. Crea un issue en el repositorio del proyecto

---

¡Con esta configuración tu sistema de boletos estará listo para funcionar! 🎉
