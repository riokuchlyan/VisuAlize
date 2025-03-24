import React, { useState, useEffect } from 'react';

const BasicStockData: React.FC = () => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/basic_data');
        const text = await response.json();
        setData(text);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  return <p>{data}</p>;
};

export default BasicStockData;