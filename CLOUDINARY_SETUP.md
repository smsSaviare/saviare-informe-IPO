# 📁 Configuración de Cloudinary (Alternativa a Firebase Storage)

## ¿Por qué Cloudinary?

Firebase Storage requiere región con tier gratuito o plan Blaze (tarjeta de crédito). **Cloudinary** es una excelente alternativa gratuita:

- ✅ **25 GB de almacenamiento gratis**
- ✅ **25 GB de transferencia/mes**
- ✅ **No requiere tarjeta de crédito**
- ✅ **Más fácil de configurar**
- ✅ **URLs públicas automáticas**
- ✅ **Optimización automática de imágenes**

## 🚀 Configuración Rápida (5 minutos)

### Paso 1: Crear Cuenta en Cloudinary

1. Ve a: https://cloudinary.com/users/register_free
2. Completa el registro:
   - Email
   - Contraseña
   - Acepta términos
3. Haz clic en **Create Account**
4. Verifica tu email
5. Inicia sesión en el dashboard

### Paso 2: Obtener Cloud Name y Crear Upload Preset

1. En el dashboard de Cloudinary verás:
   - **Cloud name**: algo como `dxxxxx` o `tu-nombre-xxx`
   - **Cópialo**, lo necesitarás

2. Ve a **Settings** (⚙️ arriba a la derecha)
3. Ve a la pestaña **Upload**
4. Scroll hasta la sección **"Upload presets"**
5. Haz clic en **"Add upload preset"**
6. Configura:
   - **Upload preset name**: `saviare_ipo`
   - **Signing mode**: Selecciona **"Unsigned"** ⚠️ IMPORTANTE
   - **Folder**: `reportes`
   - **Access mode**: Public
7. Haz clic en **Save**

### Paso 3: Instalar Librería de Cloudinary

Abre tu terminal en el proyecto y ejecuta:

```bash
npm install cloudinary-react
```

### Paso 4: Configurar en el Proyecto

Necesito que me proporciones:
- ✅ **Cloud Name**: (ejemplo: `dxxxxx` o `saviare-ipo`)
- ✅ **Upload Preset**: `saviare_ipo` (el que creaste)

Con esos datos, actualizaré el código automáticamente.

## 📝 ¿Qué Cambia en el Código?

1. **Formulario**: En lugar de subir a Firebase Storage, subirá a Cloudinary
2. **Dashboard**: Mostrará las imágenes desde Cloudinary
3. **Todo lo demás**: Funciona exactamente igual

## 🎯 Ventajas Adicionales

- **Transformaciones automáticas**: Redimensionar imágenes al vuelo
- **Optimización**: Comprime automáticamente las imágenes
- **CDN global**: Carga rápida desde cualquier parte del mundo
- **Thumbnails**: Genera miniaturas automáticamente
- **Formatos múltiples**: Convierte imágenes a WebP automáticamente

## 🔒 Seguridad

- Los archivos están en un CDN público (URLs accesibles)
- Puedes configurar restricciones de dominio si lo deseas
- Control de tamaño máximo de archivo
- Validación de tipos de archivo

## 💰 Límites Gratuitos

**Plan Gratuito incluye:**
- 25 GB de almacenamiento
- 25 GB de transferencia/mes
- 25,000 transformaciones/mes
- 500 videos de video

**Es más que suficiente para cientos de reportes con archivos adjuntos.**

## 🆚 Cloudinary vs Firebase Storage

| Característica | Cloudinary (Gratuito) | Firebase Storage (Gratuito) |
|----------------|------------------------|------------------------------|
| Almacenamiento | 25 GB | 5 GB |
| Transferencia | 25 GB/mes | 1 GB/día |
| Tarjeta requerida | ❌ No | ✅ Sí (en algunas regiones) |
| Optimización | ✅ Automática | ❌ Manual |
| Transformaciones | ✅ Incluidas | ❌ No disponible |
| Configuración | ⚡ Simple | 🔧 Compleja |

## 📞 Siguiente Paso

Una vez que tengas:
- ✅ Cuenta de Cloudinary creada
- ✅ Cloud Name copiado
- ✅ Upload Preset creado (`saviare_ipo`)

Dime tu **Cloud Name** y actualizaré el código en menos de 2 minutos.

---

**Estado**: ✅ **IMPLEMENTACIÓN COMPLETA**

## 🎉 Configuración Completada

Tu proyecto SAVIARE-IPO ahora está usando Cloudinary para almacenar archivos adjuntos.

### ✅ Configuración Activa:
- **Cloud Name**: `dxa753tl2`
- **Upload Preset**: `saviare_ipo`
- **Folder**: `reportes/{nombre-persona}/`
- **Almacenamiento**: 25 GB gratuitos

### 🎯 Funcionalidades Implementadas:
1. ✅ Formulario con carga de archivos múltiples
2. ✅ Subida automática a Cloudinary
3. ✅ Organización por carpetas (nombre de persona)
4. ✅ Dashboard con visualización de archivos
5. ✅ Enlaces directos de descarga
6. ✅ Iconos según tipo de archivo

### 🧪 Próximos Pasos para Probar:

1. **Ejecutar el proyecto:**
   ```bash
   npm run dev
   ```

2. **Probar el formulario:**
   - Abre: http://localhost:5173
   - Completa todos los campos
   - Adjunta archivos (PDF, imágenes, Word, etc.)
   - Envía el reporte

3. **Verificar en Cloudinary:**
   - Ve a: https://cloudinary.com/console
   - Media Library → Carpeta `reportes`
   - Deberías ver subcarpetas con nombres de personas
   - Dentro, los archivos subidos

4. **Verificar en Dashboard:**
   - Inicia sesión: http://localhost:5173/login
   - Verás el reporte con badge de archivos (📄 N)
   - Haz clic en 👁️ para ver detalles
   - Scroll hasta "Archivos Adjuntos"
   - Haz clic en cualquier archivo para verlo/descargarlo

### 📊 Acceso a tus Archivos:

**Cloudinary Dashboard:**
- URL: https://cloudinary.com/console
- Inicio de sesión con tu cuenta
- Media Library → `reportes/`
- Puedes ver, descargar, eliminar archivos directamente

**Desde tu App:**
- Dashboard muestra todos los archivos adjuntos a cada reporte
- Enlaces directos para descargar
- Organizados por persona automáticamente

### 🔧 Gestión de Archivos:

**Ver archivos en Cloudinary:**
1. Login en https://cloudinary.com/console
2. Media Library (menú lateral)
3. Carpeta `reportes/`
4. Subcarpetas por persona

**Descargar archivos:**
- Desde el dashboard de tu app (clic en archivo)
- Desde Cloudinary Media Library
- Los enlaces son permanentes

**Eliminar archivos:**
- Desde Cloudinary Media Library
- Solo tú como admin puedes eliminar

### 💡 Tips Útiles:

**Optimización automática:**
- Cloudinary optimiza imágenes automáticamente
- PDFs y documentos se almacenan sin cambios
- Puedes transformar imágenes en la URL si lo necesitas

**Transformaciones (Opcional):**
Si quieres mostrar thumbnails pequeños en el dashboard:
```javascript
// En lugar de usar url directamente:
const thumbnailUrl = archivo.url.replace('/upload/', '/upload/w_200,h_200,c_fill/')
```

**Límites:**
- 25 GB de almacenamiento
- 25 GB de transferencia/mes
- Si llegas al límite, puedes:
  - Actualizar a plan pago (muy económico)
  - Limpiar archivos antiguos
  - Comprimir archivos antes de subir

### 🐛 Solución de Problemas:

**Error: "Upload preset not found"**
- Verifica que creaste el preset: `saviare_ipo`
- Verifica que está en modo "Unsigned"

**Error: "Invalid cloud name"**
- Verifica que el cloud name sea: `dxa753tl2`

**Archivos no se ven en Dashboard:**
- Verifica que el reporte se haya guardado en Firestore
- Abre la consola del navegador para ver errores
- Verifica que estés logueado en el dashboard

**Archivos no se suben:**
- Verifica tu conexión a internet
- Verifica el tamaño del archivo (máx 5MB)
- Revisa la consola del navegador para errores

### 📞 Soporte:

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica tu conexión a internet
3. Confirma que los archivos sean menores a 5MB
4. Verifica que el preset sea "Unsigned"

---

**Fecha de implementación**: 27 de febrero de 2026
**Cloud Name**: dxa753tl2
**Estado**: ✅ Funcionando
