
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardTemplate from './pages/Dashboard';
import TemplateDesign from './pages/templateDesign';


export default function App() {
  return (
    <Router>
      <div>
        <h1>Template Service Frontend</h1>
        <nav>
          <ul>
            <li><Link to="/templates/dashboard">Dashbaord</Link></li>
            <li><Link to="/templates/template-design">Template Design</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/templates/dashboard" element={<DashboardTemplate />} />
          <Route path="/templates/template-design" element={<TemplateDesign />} />
        </Routes>
      </div>
    </Router>
  );
}
