// src/pages/Login.jsx
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import "../styles/Login.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!email || !password) {
      setError("Todos los campos son obligatorios")
      setLoading(false)
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/dashboard")
    } catch (err) {
      console.error("Error de login:", err)
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("Credenciales incorrectas")
      } else if (err.code === "auth/user-not-found") {
        setError("Usuario no encontrado")
      } else if (err.code === "auth/too-many-requests") {
        setError("Demasiados intentos fallidos. Intente más tarde")
      } else {
        setError("Error al iniciar sesión. Intente nuevamente")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>
            <span className="logo-icon">🍀</span>
            SAVIARE
          </h1>
          <h2>Acceso Administrativo</h2>
          <p>Ingrese sus credenciales para acceder al dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="admin@saviare.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="alert alert-error">
              <span className="alert-icon">⚠️</span>
              {error}
            </div>
          )}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="login-footer">
          <button 
            onClick={() => navigate("/")}
            className="btn-link"
          >
            ← Volver al Formulario Público
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login