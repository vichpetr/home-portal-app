import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const LandingPage = () => {
    const { user, loginWithGoogle } = useAuth()

    if (user) {
        return <Navigate to="/app" replace />
    }

    return (
        <div className="landing-page" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            padding: '2rem',
            background: 'linear-gradient(to bottom right, #f0f4f8, #d9e2ec)'
        }}>
            <div style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                maxWidth: '600px',
                width: '100%'
            }}>
                <h1 style={{ marginBottom: '1rem', color: '#102a43' }}>Weby AI Portál</h1>
                <p style={{ marginBottom: '2rem', color: '#486581', lineHeight: '1.6' }}>
                    Vítejte v centrálním portálu pro správu služeb a aplikací.
                    Tento projekt slouží jako brána k nástrojům jako je Generátor nájemních smluv a další.
                </p>

                <div style={{ borderTop: '1px solid #bcccdc', padding: '2rem 0' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#334e68' }}>Přihlášení</h3>
                    <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#627d98' }}>
                        Pro přístup k aplikacím se prosím přihlaste.
                    </p>
                    <button
                        onClick={loginWithGoogle}
                        style={{
                            background: '#4285F4',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fillRule="evenodd" fillOpacity="1" fill="#4285F4" stroke="none"></path>
                            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.715H.957v2.332A8.997 8.997 0 0 0 9 18z" fillRule="evenodd" fillOpacity="1" fill="#34A853" stroke="none"></path>
                            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fillRule="evenodd" fillOpacity="1" fill="#FBBC05" stroke="none"></path>
                            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.272C4.672 5.141 6.656 3.58 9 3.58z" fillRule="evenodd" fillOpacity="1" fill="#EA4335" stroke="none"></path>
                        </svg>
                        Přihlásit se přes Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
