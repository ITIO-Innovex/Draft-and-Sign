
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import AuthRedirect from './components/AuthRedirect'
import PDFRedirect from './components/PDFRedirect'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <nav className="App-nav">
            <div className="nav-brand">
              <h1>Draft & Sign</h1>
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/auth">Authentication</Link>
              <Link to="/pdf">PDF Services</Link>
            </div>
          </nav>
          
          <main className="App-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/*" element={<AuthRedirect />} />
              <Route path="/pdf/*" element={<PDFRedirect />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App 