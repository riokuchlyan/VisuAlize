import React, { useState, useEffect } from 'react';

const AIResponse: React.FC = () => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    const fetchAIResponse = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/ai_analysis');
        const text = await response.json();
        setData(text);
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