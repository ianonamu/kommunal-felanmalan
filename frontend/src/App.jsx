import { useState } from 'react'
import ReportForm from './components/ReportForm'
import ReportList from './components/ReportList'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('report')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <span className="header-icon">🏛️</span>
          <div>
            <h1>Felanmälan</h1>
            <p>Malmö stad – Intern service</p>
          </div>
        </div>
      </header>

      <nav className="tab-nav">
        <button
          className={activeTab === 'report' ? 'tab active' : 'tab'}
          onClick={() => { setActiveTab('report'); setSubmitted(false); }}
        >
          📝 Anmäl fel
        </button>
        <button
          className={activeTab === 'list' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('list')}
        >
          📋 Mina ärenden
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'report' && (
          submitted ? (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h2>Felanmälan skickad!</h2>
              <p>Ditt ärende har registrerats och kommer att hanteras av teknisk service.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>
                Gör en ny anmälan
              </button>
            </div>
          ) : (
            <ReportForm onSuccess={() => setSubmitted(true)} />
          )
        )}
        {activeTab === 'list' && <ReportList />}
      </main>
    </div>
  )
}

export default App
