// src/pages/Formulario.jsx
import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import axios from "axios"
import { db } from "../firebase"
import logoAirplane from "../assets/avion.jpg"
import "../styles/Formulario.css"

// Configuración de Cloudinary
const CLOUDINARY_CLOUD_NAME = "dxa753tl2"
const CLOUDINARY_UPLOAD_PRESET = "saviare_ipo"

function Formulario() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    area: "",
    descripcion: "",
    nivelRiesgo: "Bajo"
  })
  const [archivos, setArchivos] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    // Validar tamaño (máx 5MB por archivo)
    const archivosValidos = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        setError(`El archivo ${file.name} excede el tamaño máximo de 5MB`)
        return false
      }
      return true
    })
    setArchivos(archivosValidos)
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    // Validaciones
    if (!formData.nombre || !formData.correo || !formData.area || !formData.descripcion) {
      setError("Todos los campos son obligatorios")
      setLoading(false)
      return
    }

    // Validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.correo)) {
      setError("Por favor ingrese un correo electrónico válido")
      setLoading(false)
      return
    }

    try {
      let archivosURLs = []

      // Subir archivos solo si hay archivos adjuntos
      if (archivos.length > 0) {
        setUploadProgress("Subiendo archivos...")
        
        // Crear nombre de carpeta sanitizado (sin caracteres especiales)
        const nombreCarpeta = formData.nombre
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase()
        
        // Subir cada archivo a Cloudinary
        for (let i = 0; i < archivos.length; i++) {
          const archivo = archivos[i]
          
          // Determinar el tipo de recurso según el tipo de archivo
          let resourceType = "auto"
          let uploadEndpoint = "auto"
          
          if (archivo.type.startsWith("image/")) {
            resourceType = "image"
            uploadEndpoint = "image"
          } else if (archivo.type.includes("pdf") || archivo.type.includes("document") || 
                     archivo.type.includes("word") || archivo.type.includes("excel") ||
                     archivo.type.includes("spreadsheet") || archivo.type.includes("text")) {
            resourceType = "raw"
            uploadEndpoint = "raw"
          } else {
            resourceType = "raw"
            uploadEndpoint = "raw"
          }
          
          // Crear FormData para Cloudinary
          const formDataCloud = new FormData()
          formDataCloud.append("file", archivo)
          formDataCloud.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
          formDataCloud.append("folder", `reportes/${nombreCarpeta}`)
          
          // Subir a Cloudinary
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${uploadEndpoint}/upload`,
            formDataCloud
          )
          
          archivosURLs.push({
            nombre: archivo.name,
            url: response.data.secure_url,
            tipo: archivo.type,
            tamaño: archivo.size,
            cloudinaryId: response.data.public_id,
            resourceType: resourceType
          })
        }
      }

      setUploadProgress("Guardando reporte...")
      
      // Guardar en Firestore
      await addDoc(collection(db, "reportes"), {
        ...formData,
        archivosAdjuntos: archivosURLs,
        estado: "Pendiente",
        fechaCreacion: serverTimestamp(),
        fechaActualizacion: serverTimestamp()
      })

      setSuccess(true)
      setFormData({
        nombre: "",
        correo: "",
        area: "",
        descripcion: "",
        nivelRiesgo: "Bajo"
      })
      setArchivos([])
      setUploadProgress("")
      
      // Limpiar el input de archivos
      const fileInput = document.getElementById("archivos")
      if (fileInput) fileInput.value = ""

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error("Error al guardar:", err)
      setError("Error al enviar el reporte. Por favor intente nuevamente.")
      setUploadProgress("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="formulario-container">
      <div className="formulario-header">
        <div className="logo-container">
          <img src={logoAirplane} alt="SAVIARE" className="logo-airplane" />
        </div>
        <h1>
          <span className="logo-icon">🍀</span>
          SAVIARE
          <span className="logo-icon">🍀</span>
        </h1>
        <h2>Informe de Peligro Operacional (IPO)</h2>
        <p className="formulario-subtitle">
          Reporte cualquier situación de peligro o incidente que pueda comprometer la seguridad operacional
        </p>
      </div>

      <form onSubmit={handleSubmit} className="formulario-form">
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre Completo <span className="required">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingrese su nombre completo"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">
            Correo Electrónico <span className="required">*</span>
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="ejemplo@empresa.com"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="area">
            Área o Departamento <span className="required">*</span>
          </label>
          <select
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Seleccione un área</option>
            <option value="Operaciones">Operaciones</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Logística">Logística</option>
            <option value="Seguridad">Seguridad</option>
            <option value="Administración">Administración</option>
            <option value="Calidad">Calidad</option>
            <option value="Recursos Humanos">Recursos Humanos</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nivelRiesgo">
            Nivel de Riesgo <span className="required">*</span>
          </label>
          <select
            id="nivelRiesgo"
            name="nivelRiesgo"
            value={formData.nivelRiesgo}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="Bajo">Bajo</option>
            <option value="Medio">Medio</option>
            <option value="Alto">Alto</option>
            <option value="Crítico">Crítico</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">
            Descripción del Peligro Operacional <span className="required">*</span>
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describa detalladamente el peligro o incidente observado, incluyendo ubicación, circunstancias y posibles consecuencias..."
            rows="6"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="archivos">
            Archivos Adjuntos (Opcional)
          </label>
          <input
            type="file"
            id="archivos"
            name="archivos"
            onChange={handleFileChange}
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
            disabled={loading}
          />
          <small className="form-help">
            📎 Puede adjuntar fotos, PDFs o documentos (máx. 5MB por archivo)
          </small>
          {archivos.length > 0 && (
            <div className="archivos-seleccionados">
              <strong>Archivos seleccionados:</strong>
              <ul>
                {archivos.map((archivo, index) => (
                  <li key={index}>
                    📄 {archivo.name} ({(archivo.size / 1024).toFixed(2)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {uploadProgress && (
          <div className="alert alert-info">
            <span className="alert-icon">⏳</span>
            {uploadProgress}
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span>
            Reporte enviado exitosamente. Gracias por contribuir a la seguridad operacional.
          </div>
        )}

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Reporte IPO"}
        </button>
      </form>

      <footer className="formulario-footer">
        <p>© 2026 SAVIARE - Sistema de Gestión de Informes de Peligro Operacional</p>
        <p className="confidencial">La información reportada es confidencial y será tratada con la debida reserva</p>
      </footer>
    </div>
  )
}

export default Formulario