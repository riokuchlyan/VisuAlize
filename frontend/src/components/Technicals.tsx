// internal

// external

// built-in
import React, { useState, useEffect } from 'react';

const Technicals: React.FC = () => {
    const [data, setData] = useState<string>('');
    
        useEffect(() => {
            const fetchTechnicalsResponse = async () => {
              try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/technicals`);
                const text = await response.text();
                setData(text);
              } catch (error) {
                console.error('Error fetching technicals response:', error);
              }
            };
        
            fetchTechnicalsResponse();
          }, []);

    useEffect(() => {
        const element = document.getElementById('technicals');
        if (element) {
            element.style.display = 'none';
        }
    }, []);

    return(
    <div id='technicals'>
        <p>{data.substring(1, data.length - 1)}</p>
    </div>
)
}

export default Technicals;
export const toggleTechnicals = () => {
    const element = document.getElementById('technicals');
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
};