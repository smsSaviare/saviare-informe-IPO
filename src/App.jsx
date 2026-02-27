import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Formulario from "./pages/Formulario"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import SplashScreen from "./components/SplashScreen"

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Mostrar splash solo en la primera visita de la sesión
    const splashShown = sessionStorage.getItem("splashShown")
    return !splashShown // Si no está en sessionStorage, mostrar splash
  })

  const handleSplashComplete = () => {
    setShowSplash(false)
    sessionStorage.setItem("splashShown", "true")
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <Routes>
      <Route path="/" element={<Formulario />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App