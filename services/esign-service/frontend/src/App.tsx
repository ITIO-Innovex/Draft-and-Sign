
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ESignature from './pages/esign';
import CreateEnevelop from './pages/createEnevelop';

export default function App() {
  return (
    <Router>
      <div>
        <h1>E-Signature Service Frontend</h1>
        <nav>
          <ul>
            <li><Link to="/esign/e-signature">E Signature</Link></li>
            <li><Link to="/esign/create-envelop">Create Envelop</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/esign/e-signature" element={<ESignature />} />
          <Route path="/esign/create-envelop" element={<CreateEnevelop />} />
        </Routes>
      </div>
    </Router>
  );
}
