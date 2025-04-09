// internal
import StockData from '../components/BasicStockData';
import AIInput from '../components/AIInput';
import TickerInput from '../components/TickerInput';
import Reports from '../components/Reports';
import StockChart from '../components/StockChart';
import AIResponse from '../components/AIResponse';
import Technicals, { toggleTechnicals } from '../components/Technicals';
import Sentiment, { toggleSentiment } from '../components/Sentiment';
import Valuation, { toggleValuation } from '../components/Valuation';
import WordCloud from '../components/WordCloud';
import ReturnHome from '../components/ReturnHome';
import AudioPlayer from '../components/AudioPlayer';
import GoToTickersList from '../components/GoToTickersList';
import { useAuth } from '../contexts/AuthContext';

// external

// built-in
import React from 'react';
import { useParams } from 'react-router-dom';

const CompanyPage: React.FC = () => {
    const { ticker } = useParams();
    const auth = useAuth();
  return (
    <>
      <div id="left" className='box'>
        <h2>Resources</h2>
        <hr />
        <h3>General Information</h3>
        <StockData />
        <hr style={{ marginTop: "30px", marginBottom: "30px" }} />
        <Reports />
        <hr style={{ marginTop: "30px" }} />
        <AudioPlayer />
        <hr style={{ marginTop: "10px", marginBottom: "30px"}} />
        {auth.currentUser ? (
          <span>
            <GoToTickersList />
          </span>
        ) : (
          <a href="/login">Login</a>
        )}
        <ReturnHome />
      </div>
      <div id="middle" className='box'>
        <h2>Company Analysis for: {ticker?.toUpperCase()}</h2>
        <hr />
        <div id="charts">
          <StockChart />
          <WordCloud />
        </div>
        <TickerInput />
      </div>
      <div id="right" className='box'>
        <h2>Analysis</h2>
        <hr style={{ marginBottom: "30px" }} />
        <button onClick={toggleTechnicals}>Technicals</button>
        <Technicals />
        <hr id="sub-divide" />
        <button onClick={toggleValuation}>Valuation</button>
        <Valuation />
        <hr id="sub-divide" />
        <button onClick={toggleSentiment}>Sentiment</button>
        <Sentiment />
        <hr id="sub-divide" />
        <h3>Chat</h3>
        <AIResponse />
        <AIInput />
      </div>
    </>
  );
};

export default CompanyPage;