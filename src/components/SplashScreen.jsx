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
          <h1>
            <span className="title-letter" style={{"--letter-index": 0}}>S</span>
            <span className="title-letter" style={{"--letter-index": 1}}>i</span>
            <span className="title-letter" style={{"--letter-index": 2}}>s</span>
            <span className="title-letter" style={{"--letter-index": 3}}>t</span>
            <span className="title-letter" style={{"--letter-index": 4}}>e</span>
            <span className="title-letter" style={{"--letter-index": 5}}>m</span>
            <span className="title-letter" style={{"--letter-index": 6}}>a</span>
            <span className="title-letter" style={{"--letter-index": 7}}> </span>
            <span className="title-letter" style={{"--letter-index": 8}}>d</span>
            <span className="title-letter" style={{"--letter-index": 9}}>e</span>
          </h1>
          <h1 className="line-spacing">
            <span className="title-letter" style={{"--letter-index": 10}}>I</span>
            <span className="title-letter" style={{"--letter-index": 11}}>n</span>
            <span className="title-letter" style={{"--letter-index": 12}}>f</span>
            <span className="title-letter" style={{"--letter-index": 13}}>o</span>
            <span className="title-letter" style={{"--letter-index": 14}}>r</span>
            <span className="title-letter" style={{"--letter-index": 15}}>m</span>
            <span className="title-letter" style={{"--letter-index": 16}}>e</span>
            <span className="title-letter" style={{"--letter-index": 17}}> </span>
            <span className="title-letter" style={{"--letter-index": 18}}>d</span>
            <span className="title-letter" style={{"--letter-index": 19}}>e</span>
          </h1>
          <h1 className="line-spacing">
            <span className="title-letter" style={{"--letter-index": 20}}>P</span>
            <span className="title-letter" style={{"--letter-index": 21}}>e</span>
            <span className="title-letter" style={{"--letter-index": 22}}>l</span>
            <span className="title-letter" style={{"--letter-index": 23}}>i</span>
            <span className="title-letter" style={{"--letter-index": 24}}>g</span>
            <span className="title-letter" style={{"--letter-index": 25}}>r</span>
            <span className="title-letter" style={{"--letter-index": 26}}>o</span>
            <span className="title-letter" style={{"--letter-index": 27}}>s</span>
            <span className="title-letter" style={{"--letter-index": 28}}> </span>
            <span className="title-letter" style={{"--letter-index": 29}}>O</span>
            <span className="title-letter" style={{"--letter-index": 30}}>p</span>
            <span className="title-letter" style={{"--letter-index": 31}}>e</span>
            <span className="title-letter" style={{"--letter-index": 32}}>r</span>
            <span className="title-letter" style={{"--letter-index": 33}}>a</span>
            <span className="title-letter" style={{"--letter-index": 34}}>c</span>
            <span className="title-letter" style={{"--letter-index": 35}}>i</span>
            <span className="title-letter" style={{"--letter-index": 36}}>o</span>
            <span className="title-letter" style={{"--letter-index": 37}}>n</span>
            <span className="title-letter" style={{"--letter-index": 38}}>a</span>
            <span className="title-letter" style={{"--letter-index": 39}}>l</span>
            <span className="title-letter" style={{"--letter-index": 40}}>e</span>
            <span className="title-letter" style={{"--letter-index": 41}}>s</span>
          </h1>
          <h2 className="ipo-badge">
            <span className="title-letter" style={{"--letter-index": 42}}>(</span>
            <span className="title-letter" style={{"--letter-index": 43}}>I</span>
            <span className="title-letter" style={{"--letter-index": 44}}>P</span>
            <span className="title-letter" style={{"--letter-index": 45}}>O</span>
            <span className="title-letter" style={{"--letter-index": 46}}>)</span>
          </h2>
        </div>

        {/* Marca - SAVIARE */}
        <div className="brand-footer">
          <p><span className="clover">🍀</span> SAVIARE</p>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
