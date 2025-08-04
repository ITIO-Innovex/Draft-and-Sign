
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PdfConversion from './pages/PdfConversion';
import PdfToImage from './pages/PdfToImage';

export default function App() {
  return (
    <Router>
      <div>
        <h1>PDF Service Frontend</h1>
        <nav>
          <ul>
            <li><Link to="/pdf/pdf-conversion">PDF Conversion</Link></li>
            <li><Link to="/pdf/pdf-to-image">PDF to Image</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/pdf/pdf-conversion" element={<PdfConversion />} />
          <Route path="/pdf/pdf-to-image" element={<PdfToImage />} />
        </Routes>
      </div>
    </Router>
  );
}
