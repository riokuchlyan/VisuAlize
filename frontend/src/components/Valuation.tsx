import React, { useState, useEffect } from 'react';

const Valuation: React.FC = () => {

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