import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Registration from './pages/registration';

export default function App() {
  return (
    <Router>
      <div>
        <h1>PDF Service Frontend</h1>
        <nav>
          <ul>
            <li><Link to="/pdf/pdf-conversion">Login</Link></li>
            <li><Link to="/pdf/pdf-to-image">Registration</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="" element={< Login/>} />
          <Route path="" element={< Registration/>} />
        </Routes>
      </div>
    </Router>
  );
}
