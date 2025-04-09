import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

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
          setResponse(data);

          if (user) {
            const { error } = await supabase
              .from('user_data')
              .insert([
                { user_id: user.id, ticker_symbol: ticker.toUpperCase() },
              ]);
          
            if (error) {
              console.error("Supabase insert error:", error);
              alert(`Supabase error: ${error.message}`);
            } else {
              console.log("Ticker inserted successfully.");
            }
          }

          window.location.href = '/company/' + ticker;
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