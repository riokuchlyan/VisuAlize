import React, { useState, useEffect } from 'react';
import { select } from 'd3';
import './Visuals.css';

const Visuals = () => {
    const [data] = useState([25, 50, 75, 100, 125]);

    useEffect(() => {
        const svg = select('#bar-chart')
            .attr('width', 300)
            .attr('height', 150);

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => i * 60)
            .attr('y', d => 150 - d)
            .attr('width', 50)
            .attr('height', d => d)
            .attr('fill', 'steelblue');
    }, [data]);

    return (
      <div>
        <svg id="bar-chart"></svg>
      </div>
    );
};  

export default Visuals;