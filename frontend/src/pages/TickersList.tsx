import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import ReturnHome from '../components/ReturnHome';

const TickersList: React.FC = () => {
  const { user } = useAuth();
  const [tickers, setTickers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTickers = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('user_data')
          .select('ticker_symbol') as { data: { ticker_symbol: string }[] | null; error: any };
        if (error) {
          console.error('Error fetching tickers:', error);
        } else {
          setTickers(data?.map(t => t.ticker_symbol) ?? []);
        }
        setLoading(false);
      }
    };
    fetchTickers();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Submitted Tickers</h2>
      {tickers.length > 0 ? (
        <ul>
          {tickers.map((ticker, index) => (
            <li key={index}>{ticker}</li>
          ))}
        </ul>
      ) : (
        <p>No tickers found.</p>
      )}

      <h2>Analysis</h2>
      <p>Placeholder</p>
      
      <ReturnHome />
    </div>
  );
};

export default TickersList;