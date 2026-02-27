// src/pages/Dashboard.jsx
import { useState, useEffect } from "react"
import { signOut } from "firebase/auth"
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy } from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage"
import { auth, db, storage } from "../firebase"
import { useNavigate } from "react-router-dom"
import logoAirplane from "../assets/avion.jpg"
import "../styles/Dashboard.css"

function Dashboard() {
  const navigate = useNavigate()
  const [reportes, setReportes] = useState([])
  const [filtroEstado, setFiltroEstado] = useState("Todos")
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null)
  const [loading, setLoading] = useState(true)
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    pendientes: 0,
    enRevision: 0,
    cerrados: 0
  })

  // Obtener reportes en tiempo real
  useEffect(() => {
    const q = query(collection(db, "reportes"), orderBy("fechaCreacion", "desc"))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = []
      snapshot.forEach((doc) => {
        datos.push({ id: doc.id, ...doc.data() })
      })
      setReportes(datos)
      calcularEstadisticas(datos)
      setLoading(false)
    }, (error) => {
      console.error("Error al cargar reportes:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Calcular estadísticas
  const calcularEstadisticas = (datos) => {
    const stats = {
      total: datos.length,
      pendientes: datos.filter(r => r.estado === "Pendiente").length,
      enRevision: datos.filter(r => r.estado === "En revisión").length,
      cerrados: datos.filter(r => r.estado === "Cerrado").length
    }
    setEstadisticas(stats)
  }

  // Cambiar estado del reporte
  const cambiarEstado = async (reporteId, nuevoEstado) => {
    try {
      const reporteRef = doc(db, "reportes", reporteId)
      await updateDoc(reporteRef, {
        estado: nuevoEstado,
        fechaActualizacion: new Date()
      })
    } catch (error) {
      console.error("Error al actualizar estado:", error)
      alert("Error al actualizar el estado del reporte")
    }
  }

  // Eliminar reporte completo (con archivos)
  const eliminarReporte = async (reporte) => {
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar el reporte de "${reporte.nombre}"?\n\nEsto eliminará:\n- El reporte completo\n- Todos los archivos adjuntos (${reporte.archivosAdjuntos?.length || 0})\n\n Esta acción no se puede deshacer.`
    )

    if (!confirmar) return

    try {
      // Eliminar archivos de Storage si existen
      if (reporte.archivosAdjuntos && reporte.archivosAdjuntos.length > 0) {
        for (const archivo of reporte.archivosAdjuntos) {
          try {
            // Extraer el path del archivo desde la URL
            const url = archivo.url
            const match = url.match(/reportes%2F[^?]+/)
            if (match) {
              const filePath = decodeURIComponent(match[0].replace(/%2F/g, '/'))
              const fileRef = ref(storage, filePath)
              await deleteObject(fileRef)
            }
          } catch (err) {
            console.warn("Error al eliminar archivo:", err)
          }
        }
      }

      // Eliminar el documento de Firestore
      await deleteDoc(doc(db, "reportes", reporte.id))
      alert("Reporte eliminado exitosamente")
    } catch (error) {
      console.error("Error al eliminar reporte:", error)
      alert("Error al eliminar el reporte. Por favor intenta nuevamente.")
    }
  }

  // Filtrar reportes
  const reportesFiltrados = filtroEstado === "Todos" 
    ? reportes 
    : reportes.filter(r => r.estado === filtroEstado)

  // Formatear fecha
  const formatearFecha = (timestamp) => {
    if (!timestamp) return "N/A"
    const fecha = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  // Cerrar sesión
  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  // Obtener clase de badge según estado
  const getBadgeClass = (estado) => {
    switch(estado) {
      case "Pendiente": return "badge-pendiente"
      case "En revisión": return "badge-revision"
      case "Cerrado": return "badge-cerrado"
      default: return ""
    }
  }

  // Obtener clase de badge según nivel de riesgo
  const getRiesgoBadgeClass = (nivel) => {
    switch(nivel) {
      case "Bajo": return "badge-riesgo-bajo"
      case "Medio": return "badge-riesgo-medio"
      case "Alto": return "badge-riesgo-alto"
      case "Crítico": return "badge-riesgo-critico"
      default: return ""
    }
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Cargando reportes...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <div className="dashboard-logo-container">
            <img src={logoAirplane} alt="SAVIARE" className="dashboard-logo" />
          </div>
          <h1>
            <span className="logo-icon">🍀</span>
            Dashboard SAVIARE
          </h1>
          <p className="subtitle">Sistema de Gestión de Informes de Peligro Operacional</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Cerrar Sesión
        </button>
      </header>

      {/* Estadísticas */}
      <div className="estadisticas-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>{estadisticas.total}</h3>
            <p>Total Reportes</p>
          </div>
        </div>

        <div className="stat-card stat-pendiente">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{estadisticas.pendientes}</h3>
            <p>Pendientes</p>
          </div>
        </div>

        <div className="stat-card stat-revision">
          <div className="stat-icon">🔍</div>
          <div className="stat-info">
            <h3>{estadisticas.enRevision}</h3>
            <p>En Revisión</p>
          </div>
        </div>

        <div className="stat-card stat-cerrado">
          <div className="stat-icon">✓</div>
          <div className="stat-info">
            <h3>{estadisticas.cerrados}</h3>
            <p>Cerrados</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        <label>Filtrar por estado:</label>
        <div className="filtros-buttons">
          {["Todos", "Pendiente", "En revisión", "Cerrado"].map(estado => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`btn-filtro ${filtroEstado === estado ? "active" : ""}`}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de reportes */}
      <div className="tabla-container">
        {reportesFiltrados.length === 0 ? (
          <div className="empty-state">
            <p>No hay reportes con el filtro seleccionado</p>
          </div>
        ) : (
          <table className="reportes-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Área</th>
                <th>Nivel de Riesgo</th>
                <th>Estado</th>
                <th>Archivos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reportesFiltrados.map((reporte) => (
                <tr key={reporte.id}>
                  <td>{formatearFecha(reporte.fechaCreacion)}</td>
                  <td>{reporte.nombre}</td>
                  <td>{reporte.area}</td>
                  <td>
                    <span className={`badge ${getRiesgoBadgeClass(reporte.nivelRiesgo)}`}>
                      {reporte.nivelRiesgo}
                    </span>
                  </td>
                  <td>
                    <select
                      value={reporte.estado}
                      onChange={(e) => cambiarEstado(reporte.id, e.target.value)}
                      className={`estado-select ${getBadgeClass(reporte.estado)}`}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En revisión">En revisión</option>
                      <option value="Cerrado">Cerrado</option>
                    </select>
                  </td>
                  <td>
                    {reporte.archivosAdjuntos && reporte.archivosAdjuntos.length > 0 ? (
                      <span className="badge badge-archivos" title={`${reporte.archivosAdjuntos.length} archivo(s)`}>
                        📄 {reporte.archivosAdjuntos.length}
                      </span>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td className="acciones-cell">
                    <button
                      onClick={() => setReporteSeleccionado(reporte)}
                      className="btn-accion btn-ver"
                      title="Ver detalles"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => eliminarReporte(reporte)}
                      className="btn-accion btn-eliminar"
                      title="Eliminar reporte"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de detalles */}
      {reporteSeleccionado && (
        <div className="modal-overlay" onClick={() => setReporteSeleccionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalles del Reporte</h2>
              <button 
                onClick={() => setReporteSeleccionado(null)}
                className="btn-close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="detalle-row">
                <strong>ID:</strong>
                <span>{reporteSeleccionado.id}</span>
              </div>

              <div className="detalle-row">
                <strong>Nombre:</strong>
                <span>{reporteSeleccionado.nombre}</span>
              </div>

              <div className="detalle-row">
                <strong>Correo:</strong>
                <span>{reporteSeleccionado.correo}</span>
              </div>

              <div className="detalle-row">
                <strong>Área:</strong>
                <span>{reporteSeleccionado.area}</span>
              </div>

              <div className="detalle-row">
                <strong>Nivel de Riesgo:</strong>
                <span className={`badge ${getRiesgoBadgeClass(reporteSeleccionado.nivelRiesgo)}`}>
                  {reporteSeleccionado.nivelRiesgo}
                </span>
              </div>

              <div className="detalle-row">
                <strong>Estado:</strong>
                <span className={`badge ${getBadgeClass(reporteSeleccionado.estado)}`}>
                  {reporteSeleccionado.estado}
                </span>
              </div>

              <div className="detalle-row">
                <strong>Fecha de Creación:</strong>
                <span>{formatearFecha(reporteSeleccionado.fechaCreacion)}</span>
              </div>

              <div className="detalle-row">
                <strong>Última Actualización:</strong>
                <span>{formatearFecha(reporteSeleccionado.fechaActualizacion)}</span>
              </div>

              <div className="detalle-descripcion">
                <strong>Descripción del Peligro:</strong>
                <p>{reporteSeleccionado.descripcion}</p>
              </div>

              {reporteSeleccionado.archivosAdjuntos && reporteSeleccionado.archivosAdjuntos.length > 0 && (
                <div className="detalle-archivos">
                  <strong>Archivos Adjuntos ({reporteSeleccionado.archivosAdjuntos.length}):</strong>
                  <div className="archivos-lista">
                    {reporteSeleccionado.archivosAdjuntos.map((archivo, index) => (
                      <a
                        key={index}
                        href={archivo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="archivo-item"
                        title={`Descargar ${archivo.nombre}`}
                      >
                        <span className="archivo-icon">
                          {archivo.tipo?.includes('pdf') ? '📝' : 
                           archivo.tipo?.includes('image') ? '🖼️' : 
                           archivo.tipo?.includes('word') ? '📄' : 
                           archivo.tipo?.includes('excel') || archivo.tipo?.includes('spreadsheet') ? '📊' : '📁'}
                        </span>
                        <span className="archivo-nombre">{archivo.nombre}</span>
                        <span className="archivo-tamaño">({(archivo.tamaño / 1024).toFixed(1)} KB)</span>
                        <span className="archivo-download">⬇️</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-actions">
                {reporteSeleccionado.estado === "Pendiente" && (
                  <button
                    onClick={() => {
                      cambiarEstado(reporteSeleccionado.id, "En revisión")
                      setReporteSeleccionado(null)
                    }}
                    className="btn-modal btn-revision"
                  >
                    Marcar en Revisión
                  </button>
                )}
                {reporteSeleccionado.estado === "En revisión" && (
                  <button
                    onClick={() => {
                      cambiarEstado(reporteSeleccionado.id, "Cerrado")
                      setReporteSeleccionado(null)
                    }}
                    className="btn-modal btn-cerrar"
                  >
                    Cerrar Reporte
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard