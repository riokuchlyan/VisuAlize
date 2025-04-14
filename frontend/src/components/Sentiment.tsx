// internal

// external

// built-in
import React, { useState, useEffect } from 'react';

const Sentiment: React.FC = () => {
    const [data, setData] = useState<string>('');

    useEffect(() => {
        const fetchSentimentResponse = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sentiment`);
            const text = await response.text();
            setData(text);
          } catch (error) {
            console.error('Error fetching sentiment response:', error);
          }
        };
    
        fetchSentimentResponse();
      }, []);

    useEffect(() => {
        const element = document.getElementById('sentiment');
        if (element) {
            element.style.display = 'none';
        }
    }, []);

    return(
    <div id='sentiment'>
        {data.substring(1, data.length - 1)}
    </div>
)
}

export default Sentiment;
export const toggleSentiment = () => {
    const element = document.getElementById('sentiment');
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
};