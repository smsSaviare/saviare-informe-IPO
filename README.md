# SAVIARE - Sistema de Informe de Peligro Operacional (IPO)

Sistema web empresarial para la gestión de informes de peligro operacional, desarrollado con React, Vite y Firebase.

## 📋 Características

- **Formulario Público**: Permite a cualquier usuario reportar peligros operacionales
- **Dashboard Administrativo**: Panel de control para gestionar y monitorear reportes
- **Autenticación Segura**: Sistema de login con Firebase Authentication
- **Base de Datos en Tiempo Real**: Sincronización automática con Firestore
- **Estados de Reportes**: Pendiente, En revisión, Cerrado
- **Niveles de Riesgo**: Bajo, Medio, Alto, Crítico
- **Filtros Avanzados**: Filtrado por estado de reporte
- **Responsive**: Diseño adaptable a dispositivos móviles y desktop

## 🚀 Stack Tecnológico

- **Frontend**: React 19 + Vite
- **Base de Datos**: Firebase Firestore
- **Autenticación**: Firebase Authentication
- **Routing**: React Router DOM v7
- **Hosting**: GitHub Pages
- **Estilos**: CSS3 con diseño moderno

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/smsSaviare/saviare-informe-IPO.git
cd saviare-informe-IPO
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar Firebase (ya configurado):
   - El archivo `src/firebase.js` ya contiene la configuración
   - Asegúrate de tener los permisos correctos en Firestore

4. Iniciar servidor de desarrollo:
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Genera build de producción
- `npm run preview` - Previsualiza el build de producción
- `npm run deploy` - Despliega a GitHub Pages

## 🌐 Despliegue en GitHub Pages

1. Instalar la dependencia de gh-pages (si no está):
```bash
npm install --save-dev gh-pages
```

2. Ejecutar el deploy:
```bash
npm run deploy
```

3. Acceder a la aplicación:
```
https://smsSaviare.github.io/saviare-informe-IPO/
```

## 🔐 Estructura de Firebase

### Colección: `reportes`

Cada documento de reporte contiene:
```javascript
{
  nombre: "Nombre del reportante",
  correo: "correo@ejemplo.com",
  area: "Área/Departamento",
  descripcion: "Descripción detallada del peligro",
  nivelRiesgo: "Bajo | Medio | Alto | Crítico",
  estado: "Pendiente | En revisión | Cerrado",
  fechaCreacion: Timestamp,
  fechaActualizacion: Timestamp
}
```

### Reglas de Firestore Recomendadas

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reportes/{reporteId} {
      // Permitir lectura y escritura pública para el formulario
      allow read, create: if true;
      
      // Permitir actualización solo a usuarios autenticados
      allow update, delete: if request.auth != null;
    }
  }
}
```

## 📱 Uso del Sistema

### Para Usuarios Públicos:
1. Acceder a la página principal
2. Completar el formulario con la información del peligro
3. Enviar el reporte
4. Recibirás confirmación de envío exitoso

### Para Administradores:
1. Acceder a `/login` o hacer clic en el enlace de login
2. Ingresar credenciales de administrador
3. Ver todos los reportes en el dashboard
4. Filtrar reportes por estado
5. Cambiar estado de reportes (Pendiente → En revisión → Cerrado)
6. Ver detalles completos de cada reporte

## 🔑 Crear Usuario Administrador

Para crear un usuario administrador en Firebase:

1. Ir a Firebase Console → Authentication
2. Agregar usuario con email y contraseña
3. O usar Firebase CLI:

```javascript
// En Firebase Console o mediante SDK
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, "admin@saviare.com", "tu-contraseña-segura")
  .then((userCredential) => {
    console.log("Admin creado:", userCredential.user);
  });
```

## 📂 Estructura del Proyecto

```
saviare-informe-IPO/
├── public/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx      # Protección de rutas
│   ├── pages/
│   │   ├── Formulario.jsx          # Formulario público IPO
│   │   ├── Login.jsx               # Login administrador
│   │   └── Dashboard.jsx           # Dashboard admin
│   ├── styles/
│   │   ├── global.css              # Estilos globales
│   │   ├── Formulario.css          # Estilos formulario
│   │   ├── Login.css               # Estilos login
│   │   └── Dashboard.css           # Estilos dashboard
│   ├── firebase.js                 # Configuración Firebase
│   ├── App.jsx                     # Rutas principales
│   └── main.jsx                    # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Características de Diseño

- **Gradientes Modernos**: Uso de gradientes púrpura/azul
- **Componentes Responsivos**: Adaptables a todos los tamaños
- **Animaciones Suaves**: Transiciones y efectos visuales
- **Feedback Visual**: Alertas, badges y estados claros
- **Accesibilidad**: Diseño pensado en UX/UI

## 🔄 Flujo de Estados

```
Pendiente → En revisión → Cerrado
```

Los administradores pueden:
- Ver reportes pendientes y marcarlos como "En revisión"
- Ver reportes en revisión y cerrarlos
- Filtrar por cualquier estado

## 🛡️ Seguridad

- Autenticación mediante Firebase Auth
- Rutas protegidas con ProtectedRoute
- Validación de formularios
- Sanitización de entradas
- Reglas de seguridad en Firestore

## 📊 Estadísticas del Dashboard

El dashboard muestra:
- Total de reportes
- Reportes pendientes
- Reportes en revisión
- Reportes cerrados

Con actualización en tiempo real desde Firestore.

## 🐛 Solución de Problemas

### Error: "Module not found"
```bash
npm install
```

### Error de autenticación
Verificar que Firebase esté correctamente configurado en `src/firebase.js`

### Error en despliegue
```bash
npm run build
# Verificar que el build sea exitoso antes de deploy
npm run deploy
```

## 📄 Licencia

© 2026 SAVIARE - Todos los derechos reservados

## 👥 Contacto

Para soporte o consultas, contactar al equipo de desarrollo de SAVIARE.

---

**Desarrollado con ❤️ para la seguridad operacional**
