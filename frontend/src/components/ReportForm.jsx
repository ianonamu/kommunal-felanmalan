import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3001/api'

export default function ReportForm({ onSuccess }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    reporter_name: '',
    reporter_email: ''
  })

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(r => r.json())
      .then(data => setCategories(data.data || []))
      .catch(() => setCategories([
        { id: 1, name: 'IT & Datorer', icon: '💻' },
        { id: 2, name: 'Belysning', icon: '💡' },
        { id: 3, name: 'Ventilation & Värme', icon: '🌡️' },
        { id: 4, name: 'Möbler & Inredning', icon: '🪑' },
        { id: 5, name: 'Toaletter & Sanitet', icon: '🚿' },
        { id: 6, name: 'Säkerhet & Lås', icon: '🔒' },
        { id: 7, name: 'Utomhusmiljö', icon: '🌳' },
        { id: 8, name: 'Övrigt', icon: '📋' }
      ]))
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) onSuccess()
    } catch (err) {
      // Demo mode: simulate success
      onSuccess()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2>Ny felanmälan</h2>

      <div className="form-group">
        <label>Kategori *</label>
        <div className="category-grid">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`category-btn ${form.category === cat.name ? 'selected' : ''}`}
              onClick={() => setForm({ ...form, category: cat.name })}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="title">Rubrik *</label>
        <input
          id="title" name="title" type="text"
          placeholder="Beskriv felet kort, t.ex. 'Projector fungerar inte i rum 204'"
          value={form.title} onChange={handleChange} required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Beskrivning *</label>
        <textarea
          id="description" name="description"
          placeholder="Beskriv problemet mer detaljerat..."
          value={form.description} onChange={handleChange} required rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Plats *</label>
        <input
          id="location" name="location" type="text"
          placeholder="T.ex. 'Byggnad A, plan 2, rum 204'"
          value={form.location} onChange={handleChange} required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="reporter_name">Ditt namn (valfritt)</label>
          <input
            id="reporter_name" name="reporter_name" type="text"
            placeholder="Förnamn Efternamn"
            value={form.reporter_name} onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reporter_email">E-post (valfritt)</label>
          <input
            id="reporter_email" name="reporter_email" type="email"
            placeholder="din@malmo.se"
            value={form.reporter_email} onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary" disabled={loading || !form.category}>
        {loading ? 'Skickar...' : '📤 Skicka felanmälan'}
      </button>
    </form>
  )
}
