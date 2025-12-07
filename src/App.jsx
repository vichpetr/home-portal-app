import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import AdminPage from './pages/AdminPage'
import './index.css'

// Lazy load the remote component
const RentalGeneratorApp = React.lazy(() => import('rentalGenerator/App'))

const Layout = () => {
  const { signOut, user, hasRole, isAdmin } = useAuth()
  return (
    <div className="layout">
      <nav style={{ padding: '1rem', background: '#f8f9fa', borderBottom: '1px solid #e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h1 style={{ margin: 0, fontSize: '1.2rem' }}>Můj Portál</h1>
          <Link to="/app">Domů</Link>
          {hasRole('generator_user') && <Link to="/app/generator">Generátor Smluv</Link>}
          {isAdmin && <Link to="/admin" style={{ color: '#d6336c', fontWeight: 'bold' }}>Admin</Link>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '0.9rem', color: '#666' }}>{user?.email}</span>
          <button onClick={signOut} style={{ padding: '6px 12px', cursor: 'pointer' }}>Odhlásit</button>
        </div>
      </nav>
      <main style={{ padding: '0' }}>
        <Outlet />
      </main>
    </div>
  )
}

const Home = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Vítejte v klientském portálu</h2>
    <p>Zde můžete spravovat své nemovitosti a generovat smlouvy.</p>
  </div>
)

// Wrapper to pass auth context to remote app
const GeneratorWrapper = () => {
  const { user } = useAuth()
  return (
    <Suspense fallback={<div className="loading">Načítání generátoru...</div>}>
      <RentalGeneratorApp user={user} />
    </Suspense>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<Layout />}>
              <Route index element={<Home />} />
              <Route element={<ProtectedRoute requiredRole="generator_user" />}>
                <Route path="generator" element={<GeneratorWrapper />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminPage />} />
            </Route>
          </Route>

          {/* Catch all redirect */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
