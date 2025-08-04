import React, { useEffect } from 'react'

const AuthRedirect: React.FC = () => {
  useEffect(() => {
    // Redirect to the auth frontend service
    window.location.href = 'http://localhost:3000'
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh',
      flexDirection: 'column'
    }}>
      <h2>Redirecting to Authentication Service...</h2>
      <p>If you are not redirected automatically, <a href="http://localhost:3000" style={{ color: 'white' }}>click here</a></p>
    </div>
  )
}

export default AuthRedirect 