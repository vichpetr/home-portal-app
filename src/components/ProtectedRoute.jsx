import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ requiredRole, children }) => {
    const { user, hasRole, loading } = useAuth()

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Načítání...</div>
    }

    if (!user) {
        return <Navigate to="/" replace />
    }

    if (requiredRole && !hasRole(requiredRole)) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Přístup odepřen</h2>
                <p>Nemáte oprávnění zobrazit tuto stránku.</p>
                <a href="/app">Zpět na hlavní stránku</a>
            </div>
        )
    }

    return children || <Outlet />
}

export default ProtectedRoute
