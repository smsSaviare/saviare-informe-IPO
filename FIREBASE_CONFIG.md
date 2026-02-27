# Configuración de Firebase para SAVIARE-IPO

## 📝 Reglas de Seguridad de Firestore

Para configurar correctamente las reglas de seguridad en Firebase Firestore:

1. Ir a Firebase Console: https://console.firebase.google.com/
2. Seleccionar el proyecto: `saviare-ipo`
3. Ir a **Firestore Database** → **Reglas**
4. Copiar y pegar las siguientes reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Colección de reportes
    match /reportes/{reporteId} {
      // Permitir lectura a todos (para dashboard y formularios)
      allow read: if true;
      
      // Permitir creación a todos (para formulario público)
      allow create: if true;
      
      // Solo usuarios autenticados pueden actualizar y eliminar
      allow update, delete: if request.auth != null;
    }
  }
}
```

5. Hacer clic en **Publicar**

## � Reglas de Seguridad de Firebase Storage

Para configurar las reglas de seguridad de Firebase Storage (carga de archivos):

1. Ir a Firebase Console: https://console.firebase.google.com/
2. Seleccionar el proyecto: `saviare-ipo`
3. Ir a **Storage** → **Rules**
4. Copiar y pegar las siguientes reglas:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Carpeta de reportes
    match /reportes/{nombrePersona}/{archivo} {
      // Permitir subida de archivos a cualquiera (para formulario público)
      allow create: if request.resource.size < 5 * 1024 * 1024  // Máx 5MB
                    && request.resource.contentType.matches('image/.*|application/pdf|application/msword|application/vnd.openxmlformats-officedocument.*|application/vnd.ms-excel');
      
      // Permitir lectura a usuarios autenticados (para dashboard)
      allow read: if request.auth != null;
      
      // Permitir lectura pública (si quieres que los enlaces sean públicos)
      // allow read: if true;
      
      // Permitir eliminación solo a usuarios autenticados
      allow delete: if request.auth != null;
    }
  }
}
```

5. Hacer clic en **Publicar**

### Tipos de Archivos Permitidos

- **Imágenes**: JPG, JPEG, PNG, GIF, WebP
- **Documentos**: PDF, DOC, DOCX
- **Hojas de cálculo**: XLS, XLSX
- **Tamaño máximo**: 5MB por archivo

### Estructura de Carpetas en Storage

```
reportes/
  ├── juan-perez/
  │   ├── 1709054321234-evidencia.pdf
  │   └── 1709054321567-foto.jpg
  ├── maria-garcia/
  │   ├── 1709054400123-documento.docx
  │   └── 1709054400456-imagen.png
  └── ...
```

**Nota**: Las carpetas se crean automáticamente cuando una persona adjunta archivos al formulario. El nombre de la carpeta es el nombre de la persona sin caracteres especiales.

## �🔐 Configuración de Authentication

### Habilitar Email/Password

1. En Firebase Console, ir a **Authentication**
2. Ir a la pestaña **Sign-in method**
3. Habilitar **Email/Password**
4. Guardar cambios

### Crear Usuario Administrador

**Opción 1: Desde Firebase Console**
1. Ir a **Authentication** → **Users**
2. Hacer clic en **Add user**
3. Ingresar email: `admin@saviare.com` (o el que prefieras)
4. Ingresar contraseña segura
5. Hacer clic en **Add user**

**Opción 2: Desde la aplicación (desarrollo)**

Puedes crear un script temporal en tu código:

```javascript
// Agregar temporalmente en src/firebase.js o crear un archivo temporal
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"

// Ejecutar esto UNA VEZ para crear el admin
createUserWithEmailAndPassword(auth, "admin@saviare.com", "TuContraseñaSegura123!")
  .then((userCredential) => {
    console.log("✅ Usuario administrador creado:", userCredential.user.email)
    console.log("UID:", userCredential.user.uid)
  })
  .catch((error) => {
    console.error("❌ Error:", error.message)
  })
```

**Importante**: Eliminar este código después de crear el usuario.

## 📊 Estructura de la Base de Datos

### Colección: `reportes`

Cada documento tiene la siguiente estructura:

```javascript
{
  // Datos del formulario
  nombre: String,           // Nombre completo del reportante
  correo: String,           // Email del reportante
  area: String,             // Área/Departamento
  descripcion: String,      // Descripción detallada del peligro
  nivelRiesgo: String,      // "Bajo" | "Medio" | "Alto" | "Crítico"
  
  // Archivos adjuntos (opcional)
  archivosAdjuntos: Array,  // Array de objetos con archivos
  /* Estructura de archivosAdjuntos:
  [
    {
      nombre: String,       // Nombre original del archivo
      url: String,          // URL de descarga de Firebase Storage
      tipo: String,         // Tipo MIME (image/jpeg, application/pdf, etc.)
      tamaño: Number        // Tamaño en bytes
    }
  ]
  */
  
  // Estado y fechas
  estado: String,           // "Pendiente" | "En revisión" | "Cerrado"
  fechaCreacion: Timestamp, // Fecha de creación automática
  fechaActualizacion: Timestamp // Última actualización
}
```

### Índices Recomendados

Para mejorar el rendimiento de las consultas, crear estos índices:

1. En Firestore Console → **Indexes**
2. Crear índice compuesto:
   - Colección: `reportes`
   - Campos a indexar:
     - `estado` (Ascending)
     - `fechaCreacion` (Descending)

## 🔧 Configuración Adicional

### Límites de Cuota

Firebase tiene cuotas gratuitas:
- **Firestore**: 
  - 50,000 lecturas/día
  - 20,000 escrituras/día
  - 1 GB de almacenamiento
  
- **Authentication**: 
  - Usuarios ilimitados
  - 10,000 SMS/mes (si usas phone auth)

### Dominio Autorizado

Si vas a usar un dominio personalizado:

1. Ir a **Authentication** → **Settings**
2. En **Authorized domains**, agregar:
   - `localhost` (ya está)
   - `smssaviare.github.io` (ya está)
   - Tu dominio personalizado si lo tienes

## 🔒 Mejores Prácticas de Seguridad

### 1. Variables de Entorno (Opcional)

Aunque las credenciales de Firebase son públicas por diseño, puedes usar variables de entorno:

```javascript
// .env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-dominio
// ... etc
```

```javascript
// src/firebase.js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ...
}
```

### 2. Reglas de Seguridad Avanzadas

Para producción, considera reglas más restrictivas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reportes/{reporteId} {
      // Validar estructura del documento en creación
      allow create: if request.resource.data.keys().hasAll([
        'nombre', 'correo', 'area', 'descripcion', 'nivelRiesgo', 'estado'
      ]) 
      && request.resource.data.estado == 'Pendiente'
      && request.resource.data.nombre is string
      && request.resource.data.correo.matches('.*@.*\\..*');
      
      // Solo autenticados pueden leer
      allow read: if request.auth != null;
      
      // Solo autenticados pueden actualizar, y solo ciertos campos
      allow update: if request.auth != null
        && request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['estado', 'fechaActualizacion']);
      
      // No permitir eliminación
      allow delete: if false;
    }
  }
}
```

### 3. Configurar CORS (si es necesario)

Firebase Storage ya tiene CORS configurado, pero si usas otros servicios:

```json
[
  {
    "origin": ["https://smssaviare.github.io"],
    "method": ["GET", "POST"],
    "maxAgeSeconds": 3600
  }
]
```

## 📱 Testing

### Testing Local
```bash
npm run dev
```

### Testing Producción
```bash
npm run build
npm run preview
```

### Testing con Firebase Emulator (Opcional)

```bash
# Instalar emulators
npm install -g firebase-tools
firebase login
firebase init emulators

# Iniciar emulators
firebase emulators:start
```

## 🚀 Despliegue

### Pre-requisitos
- Cuenta de GitHub
- Repositorio creado: `saviare-informe-IPO`
- Node.js y npm instalados

### Pasos de Despliegue

1. **Instalar dependencias**:
```bash
npm install
```

2. **Hacer build**:
```bash
npm run build
```

3. **Desplegar**:
```bash
npm run deploy
```

4. **Configurar GitHub Pages**:
   - Ir a Settings → Pages
   - Source: `gh-pages` branch
   - Save

5. **Acceder**:
   - URL: `https://smssaviare.github.io/saviare-informe-IPO/`

## 🔍 Monitoreo

### Firebase Console

Monitorear:
- **Authentication**: Usuarios registrados y actividad
- **Firestore**: Lecturas/escrituras, uso de almacenamiento
- **Performance**: Tiempos de carga y rendimiento

### Analytics (Opcional)

Agregar Firebase Analytics:

```bash
npm install firebase
```

```javascript
// src/firebase.js
import { getAnalytics } from "firebase/analytics"

const analytics = getAnalytics(app)
```

## 📞 Soporte

Si tienes problemas:

1. Verificar reglas de Firestore
2. Verificar que Authentication esté habilitado
3. Revisar la consola del navegador para errores
4. Verificar que el usuario admin existe

---

**Configuración actualizada: Febrero 2026**
