import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Draft & Sign</h1>
        <p>A comprehensive microservices platform for document management and digital signing</p>
      </div>
      
      <div className="services-grid">
        <div className="service-card">
          <h2>🔐 Authentication Service</h2>
          <p>Secure user authentication and authorization with JWT tokens. Manage user accounts, login, and registration.</p>
          <Link to="/auth" className="service-link">Access Auth Service</Link>
        </div>
        
        <div className="service-card">
          <h2>📄 PDF Service</h2>
          <p>Upload, view, and manage PDF documents. Create, edit, and organize your documents with ease.</p>
          <Link to="/pdf" className="service-link">Access PDF Service</Link>
        </div>
        
        <div className="service-card">
          <h2>🚀 API Services</h2>
          <p>Backend microservices providing RESTful APIs for authentication and PDF management.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            <a href="http://localhost:4000" target="_blank" rel="noopener noreferrer" className="service-link">
              Auth API
            </a>
            <a href="http://localhost:4001" target="_blank" rel="noopener noreferrer" className="service-link">
              PDF API
            </a>
          </div>
        </div>
      </div>
      
      <div className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>🔧 Microservices Architecture</h3>
            <p>Scalable and maintainable service-oriented architecture</p>
          </div>
          <div className="feature">
            <h3>🎨 Modern UI</h3>
            <p>Beautiful, responsive user interfaces built with React</p>
          </div>
          <div className="feature">
            <h3>🔒 Secure Authentication</h3>
            <p>JWT-based authentication with secure token management</p>
          </div>
          <div className="feature">
            <h3>📱 Cross-Platform</h3>
            <p>Works seamlessly across different devices and browsers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 