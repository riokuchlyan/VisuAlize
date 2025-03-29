import React, { useState, useEffect } from 'react';

const Valuation: React.FC = () => {
    const [data, setData] = useState<string>('');
    
        useEffect(() => {
            const fetchValuationResponse = async () => {
              try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/valuation`);
                const text = await response.text();
                setData(text);
              } catch (error) {
                console.error('Error fetching valuation response:', error);
              }
            };
        
            fetchValuationResponse();
          }, []);

    useEffect(() => {
        const element = document.getElementById('valuation');
        if (element) {
            element.style.display = 'none';
        }
    }, []);

    return(
    <div id='valuation'>
        <p>test</p>
    </div>
)
}

export default Valuation;
export const toggleValuation = () => {
    const element = document.getElementById('valuation');
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
};