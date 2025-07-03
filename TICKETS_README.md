# Sistema de Boletos para Fiesta - DgoTecHub

Sistema completo de generación y verificación de boletos para eventos, construido con Next.js 15 y Supabase.

## ✨ Características

### 🎫 Generación de Boletos

- **Formulario optimista**: Genera boletos instantáneamente al subir comprobante
- **Validación de archivos**: Acepta JPG, PNG, PDF hasta 5MB
- **Códigos únicos**: Genera códigos alfanuméricos de 8 caracteres
- **Imagen personalizada**: Crea boletos con branding del evento y QR code
- **Descarga inmediata**: Permite descargar el boleto como PNG
- **Compartir en redes**: Integración con Web Share API

### 🔍 Verificación de Boletos

- **Verificación instantánea**: Consulta estado del boleto por código
- **Información completa**: Muestra datos del evento y titular
- **Marcado como usado**: Funcionalidad para entrada al evento
- **Estados múltiples**: Pagado, Usado, Pendiente, Cancelado

### 👤 Panel de Administración

- **Dashboard completo**: Estadísticas y métricas del evento
- **Filtros avanzados**: Por estado de boleto
- **Exportar datos**: Descarga CSV con todos los boletos
- **Gestión de comprobantes**: Enlaces a comprobantes de pago

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Supabase (PostgreSQL + Storage)
- **Estilos**: Tailwind CSS
- **Componentes**: Radix UI + shadcn/ui
- **Canvas**: HTML5 Canvas para generar imágenes
- **QR Codes**: qrcode library

## 📦 Instalación

### 1. Clonar e instalar dependencias

```bash
git clone <tu-repo>
cd website
npm install
```

### 2. Configurar Supabase

1. Crear un nuevo proyecto en [Supabase](https://supabase.com)
2. Ejecutar el esquema de base de datos:

```sql
-- Copiar y ejecutar el contenido de supabase-schema.sql
-- en el Query Editor de Supabase
```

3. Crear bucket para comprobantes:

   - Ir a Storage → Create bucket
   - Nombre: `comprobantes`
   - Configurar como público

4. Configurar políticas de Storage:

```sql
-- Política para permitir insertar comprobantes
CREATE POLICY "Allow receipt uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'comprobantes');

-- Política para permitir lectura de comprobantes
CREATE POLICY "Allow receipt downloads" ON storage.objects
  FOR SELECT USING (bucket_id = 'comprobantes');
```

### 3. Variables de entorno

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### 4. Configurar evento

Editar `src/lib/party-config.ts`:

```typescript
export const partyConfig: PartyConfig = {
  name: "Tu Evento 2025",
  date: "DD de MM, YYYY",
  time: "HH:MM hrs",
  location: "Tu Ubicación",
  price: 150,
  currency: "MXN",
  logo: "/logo.webp",
};

export const bankInfo = {
  bank: "Tu Banco",
  account: "1234567890",
  clabe: "012345678901234567",
  holder: "Tu Nombre",
  concept: "Concepto de Pago",
};
```

### 5. Ejecutar proyecto

```bash
npm run dev
```

## 🚀 Uso del Sistema

### Para Clientes (Comprar Boletos)

1. **Realizar transferencia bancaria**

   - Usar los datos bancarios mostrados
   - Incluir el concepto especificado

2. **Generar boleto**

   - Ir a `/tickets`
   - Llenar formulario con datos
   - Subir comprobante de pago
   - Descargar boleto generado

3. **Compartir boleto**
   - Usar botón de compartir
   - Guardar imagen del boleto
   - Llevar código QR al evento

### Para Organizadores (Verificar Boletos)

1. **Verificar en el evento**

   - Ir a `/verify`
   - Escanear QR o ingresar código
   - Verificar datos del titular
   - Marcar como usado al permitir entrada

2. **Administrar boletos**
   - Ir a `/admin`
   - Ver estadísticas del evento
   - Filtrar boletos por estado
   - Exportar datos para reportes

## 🔧 Estructura del Proyecto

```
src/
├── app/
│   ├── (site)/
│   │   ├── tickets/page.tsx      # Página de generación
│   │   ├── verify/page.tsx       # Página de verificación
│   │   └── admin/page.tsx        # Panel de administración
│   └── api/
│       └── tickets/              # API endpoints
├── components/
│   ├── tickets/
│   │   ├── TicketForm.tsx        # Formulario de boletos
│   │   ├── TicketVerification.tsx # Verificación
│   │   └── TicketAdmin.tsx       # Panel admin
│   └── ui/                       # Componentes UI
├── lib/
│   ├── supabase.ts              # Configuración Supabase
│   ├── ticket-service.ts        # Servicios de boletos
│   ├── ticket-generator.ts      # Generador de imágenes
│   └── party-config.ts          # Configuración del evento
└── types/
    └── tickets.ts               # Tipos TypeScript
```

## 📊 Base de Datos

### Tabla `tickets`

```sql
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  status VARCHAR(50) DEFAULT 'pending',
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Estados de Boleto

- **`pending`**: Boleto creado, pago pendiente
- **`paid`**: Pago confirmado, boleto válido
- **`used`**: Boleto utilizado en el evento
- **`cancelled`**: Boleto cancelado

## 🎨 Personalización

### Diseño del Boleto

Editar `src/lib/ticket-generator.ts`:

```typescript
// Cambiar colores
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "#tu-color-1");
gradient.addColorStop(1, "#tu-color-2");

// Cambiar fuentes
ctx.font = "bold 36px Arial";

// Agregar logo
const logo = new Image();
logo.src = "/tu-logo.png";
ctx.drawImage(logo, x, y, width, height);
```

### Estilos CSS

El sistema usa Tailwind CSS. Personalizar en:

- `src/components/tickets/TicketForm.tsx`
- `src/components/tickets/TicketVerification.tsx`
- `src/components/tickets/TicketAdmin.tsx`

## 🔐 Seguridad

### Políticas RLS (Row Level Security)

```sql
-- Habilitar RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública
CREATE POLICY "Public read access" ON tickets
  FOR SELECT USING (true);

-- Permitir inserción pública
CREATE POLICY "Public insert access" ON tickets
  FOR INSERT WITH CHECK (true);

-- Permitir actualización pública
CREATE POLICY "Public update access" ON tickets
  FOR UPDATE USING (true);
```

### Validación de Archivos

- Tipos permitidos: JPG, PNG, PDF
- Tamaño máximo: 5MB
- Validación en cliente y servidor

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar variables de entorno en Vercel Dashboard
```

### Otras Plataformas

- **Netlify**: Compatible con Next.js
- **Railway**: Fácil despliegue de aplicaciones
- **Heroku**: Requiere configuración adicional

## 📈 Métricas y Analytics

El panel de administración incluye:

- **Total de boletos**: Contador general
- **Boletos pagados**: Ingresos confirmados
- **Boletos usados**: Asistencia real
- **Ingresos totales**: Cálculo automático
- **Exportación CSV**: Para análisis externos

## 🐛 Solución de Problemas

### Error: "Boleto no encontrado"

- Verificar que el código sea correcto
- Confirmar que el boleto existe en la base de datos

### Error: "Error al subir comprobante"

- Verificar configuración del bucket de Supabase
- Confirmar políticas de Storage
- Verificar tamaño y formato del archivo

### Error: "No se puede generar QR"

- Verificar que la librería `qrcode` esté instalada
- Confirmar que el canvas funciona en el navegador

## 🤝 Contribución

1. Fork el repositorio
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🎉 Créditos

Desarrollado por **DgoTecHub Community** para la gestión de eventos tecnológicos.

---

¿Necesitas ayuda? Crea un issue en el repositorio o contacta al equipo de desarrollo.
