import React, { Suspense, useState } from 'react'
import './index.css'

// Lazy load the remote component
const RentalGeneratorApp = React.lazy(() => import('rentalGenerator/App'))

function App() {
  // Simple "router" for demo purposes
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="layout">
      <nav>
        <h1>Můj Portál</h1>
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home') }}>
          Domů
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('generator') }}>
          Generátor Smluv
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); alert('Zatím nedostupné') }}>
          Finance
        </a>
      </nav>

      <main>
        {currentPage === 'home' && (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Vítejte v klientském portálu</h2>
            <p>Zde můžete spravovat své nemovitosti a generovat smlouvy.</p>
          </div>
        )}

        {currentPage === 'generator' && (
          <Suspense fallback={<div className="loading">Načítání generátoru...</div>}>
            <RentalGeneratorApp />
          </Suspense>
        )}
      </main>
    </div>
  )
}

export default App
