# 🚀 Guía de Inicio Rápido - SAVIARE IPO

## ⚡ Inicio Rápido (5 minutos)

### 1️⃣ Instalar Dependencias
```bash
cd c:\David\SAVIARE-IPO
npm install
```

### 2️⃣ Crear Usuario Admin en Firebase
1. Ir a: https://console.firebase.google.com/
2. Proyecto: `saviare-ipo`
3. Authentication → Users → Add user
4. Email: `admin@saviare.com` | Contraseña: (tu elección)

### 3️⃣ Configurar Reglas Firestore
1. Firebase Console → Firestore Database → Reglas
2. Copiar estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reportes/{reporteId} {
      allow read, create: if true;
      allow update, delete: if request.auth != null;
    }
  }
}
```

3. Publicar

### 4️⃣ Iniciar Aplicación
```bash
npm run dev
```

Abrir: http://localhost:5173/

### 5️⃣ Probar Funcionalidades

**A. Formulario Público**
- Ir a: http://localhost:5173/
- Llenar formulario
- Enviar reporte
- ✅ Debe aparecer mensaje de éxito

**B. Dashboard Admin**
- Ir a: http://localhost:5173/#/login
- Email: `admin@saviare.com`
- Contraseña: (la que creaste)
- ✅ Debe ver dashboard con reportes

**C. Gestión de Reportes**
- Ver reportes en tabla
- Filtrar por estado
- Cambiar estado (Pendiente → En revisión → Cerrado)
- Ver detalles en modal
- ✅ Todo debe funcionar en tiempo real

### 6️⃣ Desplegar a Producción
```bash
npm run build
npm run deploy
```

URL: https://smssaviare.github.io/saviare-informe-IPO/

---

## 📋 Checklist de Verificación

- [ ] Dependencias instaladas (`npm install`)
- [ ] Usuario admin creado en Firebase
- [ ] Reglas de Firestore configuradas
- [ ] Aplicación corriendo localmente
- [ ] Formulario público funciona
- [ ] Login funciona
- [ ] Dashboard muestra reportes
- [ ] Cambio de estado funciona
- [ ] Build exitoso (`npm run build`)
- [ ] Deploy exitoso (`npm run deploy`)

---

## 🎯 URLs del Proyecto

- **Local**: http://localhost:5173/
- **Login Local**: http://localhost:5173/#/login
- **Producción**: https://smssaviare.github.io/saviare-informe-IPO/
- **Firebase Console**: https://console.firebase.google.com/project/saviare-ipo

---

## 📞 Ayuda Rápida

**Error de autenticación:**
```
Verificar que el usuario admin existe en Firebase Authentication
```

**Firestore no guarda:**
```
Verificar reglas de seguridad en Firestore Console
```

**Build falla:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Deploy falla:**
```bash
npm install --save-dev gh-pages
npm run deploy
```

---

## 🎨 Capturas Esperadas

### Formulario Público
- Header violeta con "SAVIARE"
- Formulario blanco con campos
- Botón "Enviar Reporte IPO"

### Dashboard
- Header violeta con estadísticas
- 4 tarjetas de stats (Total, Pendientes, En revisión, Cerrados)
- Filtros de estado
- Tabla de reportes
- Botones de acción

### Login
- Tarjeta blanca centrada
- Logo "SAVIARE" en gradiente
- Campos de email y contraseña
- Botón "Iniciar Sesión"

---

## ✅ Sistema Completado

Tu sistema incluye:

✅ Formulario público IPO
✅ Validaciones de formulario
✅ Guardado en Firestore
✅ Login administrativo
✅ Dashboard con estadísticas
✅ Tabla de reportes en tiempo real
✅ Filtros por estado
✅ Modal de detalles
✅ Cambio de estado de reportes
✅ Diseño responsive
✅ Rutas protegidas
✅ Preparado para GitHub Pages

---

**¡El sistema está listo para usar! 🎉**

Para más información:
- `README.md` - Documentación completa
- `FIREBASE_CONFIG.md` - Configuración detallada de Firebase
- `NEXT_STEPS.md` - Mejoras futuras y recomendaciones
