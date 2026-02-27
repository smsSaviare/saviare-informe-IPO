// src/main.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import App from "./App"
import aviconImage from "./assets/avion.jpg"
import "./styles/global.css"

// Establecer favicon dinámicamente
const favicon = document.getElementById("favicon")
if (favicon) {
  favicon.href = aviconImage
  favicon.type = "image/jpeg"
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
)