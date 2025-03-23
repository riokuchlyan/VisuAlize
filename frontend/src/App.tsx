import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import './App.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [ticker, setTicker] = useState<string>(''); 
  const [response, setResponse] = useState<any>(null);

  setTimeout(() => {
    setLoading(false); 
  }, 500);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(event.target.value);
  };

  const submit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/predict?ticker=${ticker}`);

      const data = await response.json();
      setResponse(data);

      
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      {loading && <Loading />}
      <div id="left" className='box'>
        <h2>Resources</h2>

      </div>
      <div id="middle" className='box'>
        <h2>Models</h2>
          <div className='input'>
            <input value={ticker} onChange={inputChange} placeholder='Stock ticker'></input>
            <button onClick={submit}>Submit</button>
          </div>
      </div>
      <div id="right" className='box'>
        <h2>Analysis</h2>
        {response && (
          <div>
            <h3>Response:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;