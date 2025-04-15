// internal
import './App.css';
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import Login from './pages/Login';
import TickersList from './pages/TickersList';

// external

// built-in
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <Router>
      <div className="app fade-in">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company/:ticker" element={<CompanyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tickers-list" element={<TickersList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;