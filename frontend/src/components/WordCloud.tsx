import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
// @ts-ignore
import cloud from 'd3-cloud';

const WordCloud: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    interface NewsFrequency {
        text: string;
        value: number;
      }

        const [newsData, setData] = useState<NewsFrequency[]>([]);
        
        useEffect(() => {
          const fetchLink = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news`);
            const jsonData: NewsFrequency[] = await response.json();
            setData(jsonData);
          } catch (error) {
            console.error('Error fetching stock data:', error);
          }
          };
        
          fetchLink();
        }, []);



        if (svgRef.current) {
            d3.select(svgRef.current).selectAll('*').remove();
        }

        const width = 500;
        const height = 400;


        const layout = cloud()
            .size([width, height])
            .words(newsData.map(word => ({ text: word.text, size: word.value })))
            .padding(5)
            .rotate(() => Math.random() > 0.5 ? 90 : 0)
            .font('Impact')
            .fontSize((d: { size: any; }) => d.size)
            .on('end', draw);

        layout.start();

    function draw(layoutWords: any[]) {
            if (!svgRef.current) return;
            
            const svg = d3.select(svgRef.current)
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            svg.selectAll('text')
                .data(layoutWords)
                .enter()
                .append('text')
                .style('font-family', 'Impact')
                .style('fill', (d, i) => d3.schemeCategory10[i % 10])
                .style('font-size', d => `${d.size}px`)
                .attr('text-anchor', 'middle')
                .attr('transform', d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
                .text(d => d.text);
        }

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
};

export default WordCloud;