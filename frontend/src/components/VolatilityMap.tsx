import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface StockData {
  symbol: string;
  volatility: number;
  high: number;
  low: number;
  index: string;
}

const sampleData: StockData[] = [
  { symbol: "AAPL", volatility: 0.35, high: 150, low: 145, index: "S&P 500" },
  { symbol: "TSLA", volatility: 0.60, high: 700, low: 650, index: "NASDAQ" },
  { symbol: "GOOGL", volatility: 0.25, high: 2800, low: 2750, index: "NASDAQ" },
  { symbol: "MSFT", volatility: 0.20, high: 300, low: 295, index: "S&P 500" },
  { symbol: "NVDA", volatility: 0.50, high: 600, low: 550, index: "NASDAQ" }
];

const VolatilityMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // SVG Dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 40, left: 60 };

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(sampleData.map(d => d.symbol))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3
      .scaleBand()
      .domain(sampleData.map(d => d.index))
      .range([0, innerHeight])
      .padding(0.2);

    const colorScale = d3
      .scaleSequential(d3.interpolateReds)
      .domain([0, d3.max(sampleData, d => d.volatility) || 1]);

    // Add rectangles
    svg
      .selectAll("rect")
      .data(sampleData)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.symbol)!)
      .attr("y", d => yScale(d.index)!)
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", d => colorScale(d.volatility))
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke", "black").attr("stroke-width", 2);
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.symbol}</strong><br/>Volatility: ${d.volatility.toFixed(
              2
            )}<br/>High: $${d.high}<br/>Low: $${d.low}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 30}px`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", "none");
        tooltip.style("opacity", 0);
      });

    // Axes
    svg.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "middle");

    svg.append("g")
      .call(d3.axisLeft(yScale));

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ddd")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("opacity", 0);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default VolatilityMap;