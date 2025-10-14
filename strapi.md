# Strapi como gestor de contenido

Esta rama `strapi-implementation` aloja el código de la integración de Strapi como gestor de contenido para los eventos de la comunidad.

## Configuración de datos de conexión a Strapi
Para desarrollo local, se copia el archivo `env.example` a `.env` y se rellenan las variables requeridas. Para un despliegue en producción, se deben configurar las variables de entorno en en la aplicación de despliegue (Vercel, Dokploy, etc). Si se usa Docker, se debe configurar el archivo `docker-compose.yml` con las variables de entorno correspondientes.
```
NEXT_PUBLIC_STRAPI_API_URL= # Sin /api/, ejemplo: http://localhost:1337
STRAPI_API_TOKEN=token_de_strapi
```
**Nota**: El STRAPI_API_TOKEN se localiza en el panel de administración de Strapi en la sección de Configuración, API Tokens. Es necesario generar un token con permisos de solo lectura para acceder a los datos de los eventos.


## Características
Tener Strapi como gestor de contenido nos permite tener una gestión más flexible y escalable de los contenidos, en esta primera fase, nos permite tener una plataforma centralizada para crear, actualizar y publicar eventos. Esto nos permite desacoplar la gestión de contenidos del frontend, lo que nos permite enfocarnos en la construcción de la interfaz de usuario sin preocuparnos por la gestión de la base de datos.

### Cambios en la funcionalidad del sitio de la comunidad
Uno de los objetivos que se buscó fue no generar cambios en la funcionalidad del sitio de la comunidad.

A continuación se muestra una lista de la funcionalidad que se mantuvo:

**Página Home**
- Se siguen mostrando los últimos dos eventos pasados en la sección Eventos Pasados.
- Se siguen mostrando los próximos 3 eventos en la sección de próximos eventos.
- Los eventos recurrentes como Co-Working en starbucks se siguen mostrando en la sección de próximos eventos.

**Página Eventos**
- Se siguen mostrando los próximos eventos de la comunidad, en el componente de tarjeta de eventos.

**Página Eventos Pasados**
- Se siguen mostrando los últimos eventos desde los más recientes hasta los más antiguos.

**Página de Evento**
- Cuando un evento pasado no tiene información adicional como imágenes o texto. Se muestra un mensaje indicando que la galería de imágenes no tiene contenido.
- Si un evento tiene información adicional desde Strapi, como galería de eventos, texto, videos embebidos de plataformas como YouTube, el contenido se mostrará en la página.

Cambios:
**Componente de Tarjeta de Eventos**
- Si un evento tiene la propiedad Formulario, el botón de "Quiero asistir" abrirá el formulario de registro del evento. Si no, se muestra el link del servidor de Discord.
- Si el evento tiene la propiedad Tipo, este se mostrará en la tarjeta de eventos estilizado como categoría. Esto afecta de manera global en la aplicación.
- Si un evento no tiene una imagen de Banner, se usará por default el logo de la comunidad.

**Página de Evento**
- Si se visita una url que no exista, saldrá un mensaje y un botón que tomará al usuario a la página de eventos pasados.

## Automatic Vercel Deployments on Strapi Changes

To automatically trigger Vercel deployments when content is published in Strapi:

### 1. Create a Deploy Hook in Vercel
1. Go to your Vercel project dashboard
2. Navigate to Settings > Git > Deploy Hooks
3. Click "Create Hook"
4. Configure the hook:
   - Name: `Strapi Content Update`
   - Branch: `main` (or your production branch)
   - Build & Development Settings: Use default settings
5. Copy the generated webhook URL

### 2. Set Up Webhook in Strapi
1. Log in to your Strapi admin panel
2. Go to Settings > Webhooks
3. Click "Add new webhook"
4. Configure the webhook:
   - Name: `Vercel Deploy`
   - URL: Paste the Vercel webhook URL
   - Headers: No headers needed
   - Trigger on:
     - Entry publish
     - Entry unpublish
     - Entry delete
   - Collections: Select `eventos`
5. Click "Save"

### 3. Test the Integration
1. In Strapi, make a small change to an event and publish it
2. Check your Vercel dashboard - you should see a new deployment triggered
3. Verify the changes are reflected on your live site after deployment

### Security Considerations
- The webhook URL contains a secret token - never commit it to version control
- In Strapi, ensure the webhook is only triggered for the `eventos` collection
- Consider setting up IP allowlisting in Vercel for additional security
- Use environment variables in production to store the webhook URL

## Dgo TechHub
Un proyecto de la comunidad de tecnología más grande de Durango 🦂.
