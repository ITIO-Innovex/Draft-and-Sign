import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EnvelopeCreator from './pages/EnvelopeCreator';
import EnvelopeDetails from './pages/EnvelopeDetails';
import SigningPage from './pages/SigningPage';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import EnterpriseSettings from './pages/EnterpriseSettings';
import ESignatureAdmin from './pages/ESignatureAdmin';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<EnvelopeCreator />} />
            <Route path="/envelope/:id" element={<EnvelopeDetails />} />
            <Route path="/sign/:token" element={<SigningPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/enterprise" element={<EnterpriseSettings />} />
            <Route path="/admin" element={<ESignatureAdmin />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;