import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3001/api'

const STATUS_LABELS = {
  open: { label: 'Öppen', color: '#e74c3c', bg: '#fdecea' },
  in_progress: { label: 'Pågår', color: '#f39c12', bg: '#fef9e7' },
  resolved: { label: 'Löst', color: '#27ae60', bg: '#eafaf1' }
}

// Demo data for when API is not running
const DEMO_REPORTS = [
  { id: 1, title: 'Projektor fungerar inte', category: 'IT & Datorer', location: 'Rum 204, Plan 2', status: 'in_progress', created_at: '2026-04-03T10:00:00' },
  { id: 2, title: 'Trasig lysrörslampa', category: 'Belysning', location: 'Korridor B, Plan 1', status: 'open', created_at: '2026-04-04T08:30:00' },
  { id: 3, title: 'Toalett ur funktion', category: 'Toaletter & Sanitet', location: 'Toalett 3, Entréplan', status: 'resolved', created_at: '2026-04-01T14:00:00' }
]

export default function ReportList() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/reports`)
      .then(r => r.json())
      .then(data => setReports(data.data || []))
      .catch(() => setReports(DEMO_REPORTS))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">Laddar ärenden...</div>

  return (
    <div className="report-list">
      <h2>Ärenden ({reports.length})</h2>
      {reports.length === 0 ? (
        <div className="empty-state">
          <p>Inga ärenden registrerade ännu.</p>
        </div>
      ) : (
        reports.map(report => {
          const status = STATUS_LABELS[report.status] || STATUS_LABELS.open
          return (
            <div key={report.id} className="report-card">
              <div className="report-card-header">
                <span className="report-category">{report.category}</span>
                <span className="report-status" style={{ color: status.color, background: status.bg }}>
                  {status.label}
                </span>
              </div>
              <h3>{report.title}</h3>
              <p className="report-location">📍 {report.location}</p>
              <p className="report-date">
                {new Date(report.created_at).toLocaleDateString('sv-SE', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            </div>
          )
        })
      )}
    </div>
  )
}
