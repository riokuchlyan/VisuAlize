// internal
import { useAuth } from '../contexts/AuthContext';

// external
import { supabase } from '../supabaseClient';

// built-in
import React, { useState } from 'react';

const TickerInput = () => {

    const { user } = useAuth();
    const [ticker, setTicker] = useState<string>(''); 
    const [response, setResponse] = useState<any>(null);

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTicker(event.target.value);
      };
    
      const submit = async () => {
        if (!ticker) {
          alert("Please enter a stock ticker!");
          return;
        }
      
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ticker`, {
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

          const cik = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cik`);
          const cikText: string = await cik.text();

            if (cikText.substring(1, cikText.length - 1).length === 10) {
              if (user) {
                const { error } = await supabase
                .from('user_data')
                .insert([
                  { user_id: user.id, ticker_symbol: ticker.toUpperCase() },
                ]);
              
                if (error) {
                console.error("Supabase insert error:", error);
                } else {
                console.log("Ticker inserted successfully.");
                }
              }
              setResponse(data);
              window.location.href = '/company/' + ticker;
              console.log("Prediction data:", data);
            } 
            else {
              alert("Please enter a valid stock ticker.")
            }
 
        } catch (error) {
          console.error("Error fetching prediction:", error);
          alert("Error fetching prediction. Check console for details.");
        }
      };

    return (
        <div style={{ marginTop: "15px" }} className='input'>
            <input value={ticker} onChange={inputChange} placeholder='Stock ticker'></input>
            <button onClick={submit}>Submit</button>
          </div>
    );
}

export default TickerInput;