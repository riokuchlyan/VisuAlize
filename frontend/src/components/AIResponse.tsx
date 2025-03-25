import React, { useState, useEffect } from 'react';

const AIResponse: React.FC = () => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    const fetchAIResponse = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ai_analysis`);
        const text = await response.text();
        setData(text.substring(1,text.length-1));
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    };

    fetchAIResponse();
  }, []);

  if (!data) return <p>Loading...</p>;

  

  return (
    <div>{data}</div>
);};

export default AIResponse;