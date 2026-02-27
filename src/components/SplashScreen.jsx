// src/components/SplashScreen.jsx
import { useEffect, useState } from "react"
import planeIcon from "../assets/plane-icon.png"
import "../styles/SplashScreen.css"

function SplashScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Mostrar splash por 5 segundos
    const timer = setTimeout(() => {
      setIsExiting(true)
      // Esperar a que termine la animación de salida
      setTimeout(onComplete, 600)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`splash-screen ${isExiting ? "exit" : ""}`}>
      <div className="splash-content">
        {/* Avión animado */}
        <div className="plane-animation">
          <img src={planeIcon} alt="Avión SAVIARE" className="plane" />
        </div>

        {/* Nombre de la empresa */}
        <div className="company-name">
          <h1>
            <span className="clover">🍀</span>
            <span className="text">SAVIARE</span>
            <span className="clover">🍀</span>
          </h1>
        </div>

        {/* Subtítulo */}
        <p className="splash-subtitle">
          Sistema de Informe de Peligro Operacional
        </p>
      </div>
    </div>
  )
}

export default SplashScreen
