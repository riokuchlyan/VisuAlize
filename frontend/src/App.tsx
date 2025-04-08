import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app fade-in">
        {loading && <Loading />}
        {!loading && (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/company/:ticker" element={<CompanyPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;