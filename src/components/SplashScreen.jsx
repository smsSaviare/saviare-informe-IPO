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

        {/* Título principal - Sistema de Informe de Peligros Operacionales */}
        <div className="main-title">
          <div className="title-line">
            <span className="title-letter" style={{"--letter-index": 0}}>S</span>
            <span className="title-letter" style={{"--letter-index": 1}}>i</span>
            <span className="title-letter" style={{"--letter-index": 2}}>s</span>
            <span className="title-letter" style={{"--letter-index": 3}}>t</span>
            <span className="title-letter" style={{"--letter-index": 4}}>e</span>
            <span className="title-letter" style={{"--letter-index": 5}}>m</span>
            <span className="title-letter" style={{"--letter-index": 6}}>a</span>
            <span className="space"></span>
            <span className="title-letter" style={{"--letter-index": 7}}>d</span>
            <span className="title-letter" style={{"--letter-index": 8}}>e</span>
          </div>
          <div className="title-line">
            <span className="title-letter" style={{"--letter-index": 9}}>I</span>
            <span className="title-letter" style={{"--letter-index": 10}}>n</span>
            <span className="title-letter" style={{"--letter-index": 11}}>f</span>
            <span className="title-letter" style={{"--letter-index": 12}}>o</span>
            <span className="title-letter" style={{"--letter-index": 13}}>r</span>
            <span className="title-letter" style={{"--letter-index": 14}}>m</span>
            <span className="title-letter" style={{"--letter-index": 15}}>e</span>
            <span className="space"></span>
            <span className="title-letter" style={{"--letter-index": 16}}>d</span>
            <span className="title-letter" style={{"--letter-index": 17}}>e</span>
          </div>
          <div className="title-line">
            <span className="title-letter" style={{"--letter-index": 18}}>P</span>
            <span className="title-letter" style={{"--letter-index": 19}}>e</span>
            <span className="title-letter" style={{"--letter-index": 20}}>l</span>
            <span className="title-letter" style={{"--letter-index": 21}}>i</span>
            <span className="title-letter" style={{"--letter-index": 22}}>g</span>
            <span className="title-letter" style={{"--letter-index": 23}}>r</span>
            <span className="title-letter" style={{"--letter-index": 24}}>o</span>
            <span className="title-letter" style={{"--letter-index": 25}}>s</span>
            <span className="space"></span>
            <span className="title-letter" style={{"--letter-index": 26}}>O</span>
            <span className="title-letter" style={{"--letter-index": 27}}>p</span>
            <span className="title-letter" style={{"--letter-index": 28}}>e</span>
            <span className="title-letter" style={{"--letter-index": 29}}>r</span>
            <span className="title-letter" style={{"--letter-index": 30}}>a</span>
            <span className="title-letter" style={{"--letter-index": 31}}>c</span>
            <span className="title-letter" style={{"--letter-index": 32}}>i</span>
            <span className="title-letter" style={{"--letter-index": 33}}>o</span>
            <span className="title-letter" style={{"--letter-index": 34}}>n</span>
            <span className="title-letter" style={{"--letter-index": 35}}>a</span>
            <span className="title-letter" style={{"--letter-index": 36}}>l</span>
            <span className="title-letter" style={{"--letter-index": 37}}>e</span>
            <span className="title-letter" style={{"--letter-index": 38}}>s</span>
          </div>
          <div className="ipo-badge">
            <span className="title-letter" style={{"--letter-index": 39}}>(</span>
            <span className="title-letter" style={{"--letter-index": 40}}>I</span>
            <span className="title-letter" style={{"--letter-index": 41}}>P</span>
            <span className="title-letter" style={{"--letter-index": 42}}>O</span>
            <span className="title-letter" style={{"--letter-index": 43}}>)</span>
          </div>
        </div>

        {/* Marca - SAVIARE */}
        <div className="brand-footer">
          <p className="brand-text"><span className="clover">🍀</span> <span className="saviare-brand">SAVIARE</span></p>
          <p className="brand-subtitle">Safety Information & Risk Report System</p>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
