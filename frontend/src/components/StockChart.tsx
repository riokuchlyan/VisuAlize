import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const StockChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 200 });

  // 🔹 Define stock data inside the component
  const [stockData] = useState([
    { date: "2024-03-01", close: 150 },
    { date: "2024-03-02", close: 155 },
    { date: "2024-03-03", close: 160 },
    { date: "2024-03-04", close: 158 },
    { date: "2024-03-05", close: 165 },
  ]);

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

    // 🔹 Add title
    svg.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text("Stock Price Over Time");

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