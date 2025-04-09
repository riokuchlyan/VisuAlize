import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import ReturnHome from '../components/ReturnHome';

interface Ticker {
  id: number;
  ticker_symbol: string;
  submitted_at: string;
}

const TickersList: React.FC = () => {
  const { user } = useAuth();
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTickers = async () => {
      if (user) {
        const { data, error } = await supabase
  .from('tickers')
  .select('*')
  .eq('user_id', user.id) as { data: Ticker[] | null; error: any };
        if (error) {
          console.error('Error fetching tickers:', error);
        } else {
          setTickers(data ?? []);
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
          {tickers.map((ticker) => (
            <li key={ticker.id}>{ticker.ticker_symbol}</li>
          ))}
        </ul>
      ) : (
        <p>No tickers found.</p>
      )}
      <ReturnHome />
    </div>
  );
};

export default TickersList;