import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import './App.css';
import StockData from './components/BasicStockData';
import AIInput from './components/AIInput';
import TickerInput from './components/TickerInput';
import Reports from './components/Reports';
import Visuals from './components/Visuals';
import AIResponse from './components/AIResponse';
import Technicals from './components/Technicals';
import { toggleTechnicals } from './components/Technicals';
import Sentiment from './components/Sentiment';
import { toggleSentiment } from './components/Sentiment';
import Valuation from './components/Valuation';
import { toggleValuation } from './components/Valuation';

const App: React.FC = () => {

  //disable scrolling or zooming
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && (event.key === '+' || event.key === '-' || event.key === '=')) {
        event.preventDefault();
      }
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //loading screen
  const [loading, setLoading] = useState<boolean>(true);
  setTimeout(() => {
    setLoading(false); 
  }, 1500);

  return (
    <div className={`app fade-in`}>
      {loading && <Loading />}
      <div id="left" className='box'>
        <h2>Resources</h2>
        <hr></hr>
        <h3>General Information: </h3>
        <StockData />
        <hr style={{ marginTop: "30px" }}></hr>
        <h3 style={{ marginTop: "30px", marginBottom: "30px"}}>Reports</h3>
        <Reports />
      </div>
      <div id="middle" className='box'>
        <h2>Visuals</h2>
        <hr></hr>
        <Visuals />
        <TickerInput />
      </div>
      <div id="right" className='box'>
        <h2>Analysis</h2>
        <hr style={{ marginBottom: "30px" }}></hr>
        <button onClick={toggleTechnicals}>Technicals</button>
        <Technicals />
        <hr id="sub-divide"></hr>
        <button onClick={toggleValuation}>Valuation</button>
        <Valuation />
        <hr id="sub-divide"></hr>
        <button onClick={toggleSentiment}>Sentiment</button>
        <Sentiment />
        <hr id="sub-divide"></hr>
        <h3>Chat</h3>
        <AIResponse />
        <AIInput />
      </div>
    </div>
  );
};

export default App;