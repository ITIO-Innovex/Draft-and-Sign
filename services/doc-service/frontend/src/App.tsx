
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Documents from './pages/document';
import NewDocuments from './pages/newDocument';


export default function App() {
  return (
    <Router>
      <div>
        <h1>Document Service Frontend</h1>
        <nav>
          <ul>
            <li><Link to="/doc/documents">Documents</Link></li>
            <li><Link to="/doc/document-management">New Documents</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/doc/documents" element={<Documents />} />
          <Route path="/doc/document-management" element={<NewDocuments />} />
        </Routes>
      </div>
    </Router>
  );
}
