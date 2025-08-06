
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import About from './pages/about';

export default function App() {
  return (
    <Router>
      <div>
        <h1>Landing Service Frontend</h1>
        <nav>
          <ul>
            <li><Link to="/">PDF Conversion</Link></li>
            <li><Link to="/about">PDF to Image</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}
