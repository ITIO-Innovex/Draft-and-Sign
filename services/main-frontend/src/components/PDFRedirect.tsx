import React, { useEffect } from 'react'

const PDFRedirect: React.FC = () => {
  useEffect(() => {
    // Redirect to the PDF frontend service
    window.location.href = 'http://localhost:3001'
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh',
      flexDirection: 'column'
    }}>
      <h2>Redirecting to PDF Service...</h2>
      <p>If you are not redirected automatically, <a href="http://localhost:3001" style={{ color: 'white' }}>click here</a></p>
    </div>
  )
}

export default PDFRedirect 