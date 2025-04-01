import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const StockChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 200 });


    interface StockDatum {
      date: string;
      close: number;
    }
    
    const [stockData, setData] = useState<StockDatum[]>([]);
    
    useEffect(() => {
      const fetchLink = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/stock_data`);
        const jsonData: StockDatum[] = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
      };
    
      fetchLink();
    }, []);


  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      if (!entries[0]?.contentRect) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({
        width: width - 20,
        height: height - 20,
      });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!stockData.length || !svgRef.current) return;

    const parsedData = stockData.map(d => ({
      date: new Date(d.date),
      close: d.close,
    }));

    const { width, height } = dimensions;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(parsedData, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(parsedData, d => d.close) || 0,
        d3.max(parsedData, d => d.close) || 0,
      ])
      .range([innerHeight, 0]);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b %d") as any))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(yScale));

    const line = d3
      .line<{ date: Date; close: number }>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.close));

    svg
      .append("path")
      .datum(parsedData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line as any);
  }, [stockData, dimensions]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "200px" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default StockChart;