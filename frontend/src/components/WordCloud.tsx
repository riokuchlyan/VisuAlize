import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
// @ts-ignore
import cloud from 'd3-cloud';

const WordCloud: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    interface WordFrequency {
        text: string;
        value: number;
    }

    const [wordData, setWordData] = useState<WordFrequency[]>([]);

    useEffect(() => {
        const fetchTextData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news`);
                const rawText: string = await response.text();
                const processedData = processText(rawText);
                setWordData(processedData);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchTextData();
    }, []);

    const processText = (text: string): WordFrequency[] => {

        const wordsArray = text.toLowerCase().match(/\b[a-zA-Z]{2,}\b/g) || [];

        const stopwords = new Set([
            'the', 'and', 'is', 'in', 'to', 'of', 'for', 'on', 'with', 'at', 'by', 'from',
            'as', 'it', 'this', 'that', 'was', 'are', 'or', 'be', 'an', 'not', 'which',
            'but', 'has', 'have', 'had', 'a', 'i', 'you', 'he', 'she', 'they', 'we',
            'their', 'his', 'her', 'our', 'its', 'my', 'me', 'your', 'would', 'should',
            'can', 'will', 'just', 'if', 'than', 'so', 'because', 'what', 'who', 'how',
            'there', 'about', 'out', 'up', 'down', 'over', 'under', 'again', 'only',
            'now', 'then', 'some', 'into', 'could', 'more', 'new', 'very', 'most', 'such'
        ]);

        const wordCounts: Record<string, number> = {};
        wordsArray.forEach(word => {
            if (!stopwords.has(word)) {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            }
        });

        return Object.entries(wordCounts)
            .map(([text, value]) => ({ text, value }))
            .sort((a, b) => b.value - a.value) 
            .slice(0, 50); 
    };

    useEffect(() => {
        if (!wordData.length) return;

        if (svgRef.current) {
            d3.select(svgRef.current).selectAll('*').remove();
        }

        const width = 500;
        const height = 400;

        const layout = cloud()
            .size([width, height])
            .words(wordData.map(word => ({ text: word.text, size: word.value * 5 }))) // Scale size
            .padding(5)
            .rotate(() => (Math.random() > 0.5 ? 90 : 0))
            .font('Impact')
            .fontSize((d: { size: number }) => d.size)
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
    }, [wordData]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
};

export default WordCloud;