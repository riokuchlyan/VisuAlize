import React, { useEffect, useState } from 'react';

interface StockData {
  longName: string;
  shortName: string;
  symbol: string;
  sector: string;
  industry: string;
  currency: string;  
  regularMarketPrice: number;
  marketCap: number;
  volume: number;
  dailyHigh: number;
  dailyLow: number;
}

const StockData = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/basic_data');
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setStockData(data);
        }
      } catch (err) {
        console.error("Error fetching stock data:", err);
      }
    };

    fetchStockData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Long Name</td>
            <td>{stockData.longName}</td>
          </tr>
          <tr>
            <td>Short Name</td>
            <td>{stockData.shortName}</td>
          </tr>
          <tr>
            <td>Symbol</td>
            <td>{stockData.symbol}</td>
          </tr>
          <tr>
            <td>Sector</td>
            <td>{stockData.sector}</td>
          </tr>
          <tr>
            <td>Industry</td>
            <td>{stockData.industry}</td>
          </tr>
          <tr>
            <td>Currency</td>
            <td>{stockData.currency}</td>
          </tr>
          <tr>
            <td>Regular Market Price</td>
            <td>{stockData.regularMarketPrice}</td>
          </tr>
          <tr>
            <td>Market Cap</td>
            <td>{stockData.marketCap}</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{stockData.volume}</td>
          </tr>
          <tr>
            <td>Daily High</td>
            <td>{stockData.dailyHigh}</td>
          </tr>
          <tr>
            <td>Daily Low</td>
            <td>{stockData.dailyLow}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StockData;