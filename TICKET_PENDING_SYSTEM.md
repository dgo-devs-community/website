# Sistema de Boletos - Configuración de Estado Pendiente

## Cambios Realizados

### 1. Estado por Defecto "Pending"

- ✅ Todos los boletos se crean con estado `"pending"` por defecto
- ✅ **NO** se cambian automáticamente a `"paid"` aunque tengan comprobante
- ✅ Requieren revisión manual para cambiar a estado `"paid"`

### 2. Notificación por Email

- ✅ Se envía email automático a `dgotechub@gmail.com` cuando se genera un boleto
- ✅ Incluye toda la información del boleto (código, nombre, email, cantidad)
- ✅ Incluye enlace al comprobante si fue subido
- ✅ Funciona con Resend (requiere configuración) o fallback a logs

### 3. Mensaje al Usuario

- ✅ Mensaje claro explicando que el boleto está pendiente de verificación
- ✅ Información sobre el proceso de revisión (24-48 horas)
- ✅ Notificación de que se enviará email cuando sea aprobado

## Configuración de Email

### Opción 1: Con Resend (Recomendado)

1. Crear cuenta en [Resend](https://resend.com/)
2. Obtener API key
3. Agregar al archivo `.env.local`:
   ```
   RESEND_API_KEY=re_tu_api_key_aqui
   ```
4. **Importante**: Necesitas verificar tu dominio en Resend para enviar desde `notificaciones@dgotechub.com`

### Opción 2: Solo Logs (Temporal)

- Si no configuras `RESEND_API_KEY`, los emails se logearán en la consola
- Útil para desarrollo y testing

## Flujo de Trabajo

### Para el Usuario:

1. Llena el formulario de boleto
2. Sube comprobante de transferencia (opcional)
3. Recibe boleto con estado "Pendiente"
4. Ve mensaje explicando el proceso de verificación

### Para el Administrador:

1. Recibe email automático con información del boleto
2. Verifica la transferencia bancaria
3. Cambia manualmente el estado en el panel de admin de `"pending"` a `"paid"`
4. (Opcional) Notifica al usuario por email que su boleto fue aprobado

## Beneficios

- ✅ **Control total**: Solo boletos verificados manualmente cuentan para el evento
- ✅ **Previene fraude**: No hay boletos "auto-aprobados"
- ✅ **Trazabilidad**: Email automático para cada venta
- ✅ **Experiencia clara**: Usuario sabe exactamente qué esperar
- ✅ **Flexibilidad**: Sistema funciona con o sin servicio de email

## Próximos Pasos

1. **Configurar Resend** para emails reales
2. **Verificar dominio** en Resend para enviar desde @dgotechub.com
3. **Crear plantilla de email** para notificar aprobación al usuario
4. **Configurar webhook** (opcional) para automatizar algunas verificaciones
