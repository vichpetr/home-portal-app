import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchUserRoles(session.user.id)
            } else {
                setLoading(false)
            }
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchUserRoles(session.user.id)
            } else {
                setRoles([])
                setLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const fetchUserRoles = async (userId) => {
        try {
            console.log('Fetching roles for user:', userId)
            const { data, error } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', userId)

            if (error) {
                console.error('Error fetching roles:', error)
            } else {
                console.log('Fetched roles:', data)
                setRoles(data.map(r => r.role))
            }
        } catch (err) {
            console.error('Unexpected error fetching roles:', err)
        } finally {
            setLoading(false)
        }
    }

    const loginWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/app`
                }
            })
            if (error) throw error
        } catch (error) {
            console.error('Error logging in:', error.message)
            alert('Failed to login: ' + error.message)
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        } catch (error) {
            console.error('Error signing out:', error.message)
        }
    }

    const hasRole = (role) => roles.includes(role) || roles.includes('admin')

    const value = {
        user,
        roles,
        loading,
        loginWithGoogle,
        signOut,
        hasRole,
        isAdmin: roles.includes('admin')
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
