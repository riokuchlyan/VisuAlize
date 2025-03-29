import React, { useState, useEffect } from 'react';

const Technicals: React.FC = () => {

    useEffect(() => {
        const element = document.getElementById('technicals');
        if (element) {
            element.style.display = 'none';
        }
    }, []);

    return(
    <div id='technicals'>
        <p>test</p>
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