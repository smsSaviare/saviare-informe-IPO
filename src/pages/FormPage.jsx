// src/pages/FormPage.jsx
import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function FormPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, 'submissions'), {
        name,
        email,
        createdAt: serverTimestamp()
      })

      alert('Formulario enviado correctamente')
      setName('')
      setEmail('')
    } catch (error) {
      console.error(error)
      alert('Error al enviar formulario')
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Formulario SAVIARE IPO</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button style={{ marginTop: 20 }} type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}