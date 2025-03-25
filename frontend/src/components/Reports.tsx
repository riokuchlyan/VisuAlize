import React, { useState, useEffect } from 'react';

const Reports: React.FC = () => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/filings_link');
        const text = await response.text();
        setData(text);
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    };

    fetchLink();
  }, []);

  if (!data) return <p>Loading...</p>;

  

  return (
    <a href={data} rel='noreferrer' target='_blank'>SEC EDGAR Filings</a>
);};

export default Reports;