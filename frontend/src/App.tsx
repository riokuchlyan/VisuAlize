import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import './App.css';
import StockData from './components/BasicStockData';
import AIChat from './components/AIChat';
import Reports from './components/Reports';

const App: React.FC = () => {

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

  const [loading, setLoading] = useState<boolean>(true);
  const [ticker, setTicker] = useState<string>(''); 
  const [response, setResponse] = useState<any>(null);

  setTimeout(() => {
    setLoading(false); 
  }, 1500);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(event.target.value);
  };

  const submit = async () => {
    if (!ticker) {
      alert("Please enter a stock ticker!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/ticker", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticker }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setResponse(data);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Error fetching prediction. Check console for details.");
    }
  };

  

  return (
    <div className={`app fade-in`}>
      {loading && <Loading />}
      <div id="left" className='box'>
        <h2>Resources</h2>
        <hr></hr>
        <h3>General Information: </h3>
        <StockData />
        <h3 style={{ marginTop: "50px" }}>Reports</h3>
        <Reports />
      </div>
      <div id="middle" className='box'>
        <h2>Visuals</h2>
        <hr></hr>
          <div className='input'>
            <input value={ticker} onChange={inputChange} placeholder='Stock ticker'></input>
            <button onClick={submit}>Submit</button>
          </div>
      </div>
      <div id="right" className='box'>
        <h2>Analysis</h2>
        <hr></hr>
        <AIChat />
      </div>
    </div>
  );
};

export default App;