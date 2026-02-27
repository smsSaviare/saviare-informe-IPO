// src/pages/Formulario.jsx
import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import "../styles/Formulario.css"

function Formulario() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    area: "",
    descripcion: "",
    nivelRiesgo: "Bajo"
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
      // Guardar en Firestore
      await addDoc(collection(db, "reportes"), {
        ...formData,
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

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error("Error al guardar:", err)
      setError("Error al enviar el reporte. Por favor intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="formulario-container">
      <div className="formulario-header">
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