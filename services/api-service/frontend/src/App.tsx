
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardAPI from './pages/dashboardAPI';
import ApiExplore from './pages/ApiExplorer';

export default function App() {
  return (
    <Router>
      <div>
        <h1>API Service Frontend</h1>
        <nav>
          <ul>
            <li><Link to="/api/dashboard">Dashbaord</Link></li>
            <li><Link to="/api/api-explore">API Explorer</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/api/dashboard" element={<DashboardAPI />} />
          <Route path="/api/api-explore" element={<ApiExplore />} />
        </Routes>
      </div>
    </Router>
  );
}
