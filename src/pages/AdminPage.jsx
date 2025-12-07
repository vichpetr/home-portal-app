import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AdminPage = () => {
    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchProfiles()
    }, [])

    const fetchProfiles = async () => {
        try {
            setLoading(true)

            // Fetch profiles
            const { data: profilesData, error: profilesError } = await supabase
                .from('profiles')
                .select('*')

            if (profilesError) throw profilesError

            // Fetch roles for each user
            const { data: rolesData, error: rolesError } = await supabase
                .from('user_roles')
                .select('*')

            if (rolesError) throw rolesError

            // Merge data
            const mergedData = profilesData.map(profile => {
                const userRoles = rolesData
                    .filter(r => r.user_id === profile.id)
                    .map(r => r.role)
                return { ...profile, roles: userRoles }
            })

            setProfiles(mergedData)
        } catch (err) {
            console.error('Error fetching users:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleRole = async (userId, role, hasRole) => {
        try {
            if (hasRole) {
                // Remove role
                const { error } = await supabase
                    .from('user_roles')
                    .delete()
                    .match({ user_id: userId, role: role })
                if (error) throw error
            } else {
                // Add role
                const { error } = await supabase
                    .from('user_roles')
                    .insert({ user_id: userId, role: role })
                if (error) throw error
            }
            // Refresh list
            fetchProfiles()
        } catch (err) {
            alert('Chyba při změně role: ' + err.message)
        }
    }

    if (loading) return <div>Načítání uživatelů...</div>
    if (error) return <div>Chyba: {error}</div>

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Správa Uživatelů</h2>
            <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                        <tr>
                            <th style={{ padding: '12px' }}>Email / Jméno</th>
                            <th style={{ padding: '12px' }}>ID</th>
                            <th style={{ padding: '12px' }}>Role</th>
                            <th style={{ padding: '12px' }}>Akce</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map(profile => (
                            <tr key={profile.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{profile.full_name || 'Neznámé jméno'}</div>
                                    <div style={{ fontSize: '0.85em', color: '#666' }}>{profile.email}</div>
                                </td>
                                <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '0.85em' }}>{profile.id}</td>
                                <td style={{ padding: '12px' }}>
                                    {profile.roles.length > 0 ? (
                                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                            {profile.roles.map(r => (
                                                <span key={r} style={{
                                                    background: r === 'admin' ? '#ffe3e3' : '#e3f2fd',
                                                    color: r === 'admin' ? '#c92a2a' : '#1864ab',
                                                    padding: '2px 8px', borderRadius: '12px', fontSize: '0.85em'
                                                }}>
                                                    {r}
                                                </span>
                                            ))}
                                        </div>
                                    ) : <span style={{ color: '#adb5bd' }}>Žádné role</span>}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={profile.roles.includes('generator_user')}
                                            onChange={() => toggleRole(profile.id, 'generator_user', profile.roles.includes('generator_user'))}
                                        />
                                        Generátor
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '4px' }}>
                                        <input
                                            type="checkbox"
                                            checked={profile.roles.includes('admin')}
                                            onChange={() => toggleRole(profile.id, 'admin', profile.roles.includes('admin'))}
                                        />
                                        Admin
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminPage
