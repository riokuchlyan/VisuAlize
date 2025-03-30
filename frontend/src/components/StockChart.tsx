import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const StockChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Example dataset
    const data = [10, 15, 20, 25, 30];

    const width = 300;
    const height = 150;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const xScale = d3
      .scaleBand()
      .domain(data.map((_, i) => i.toString()))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) as number])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(i.toString()) as number)
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d))
      .attr("fill", "steelblue");

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));
  }, []);

  return <svg ref={svgRef} width={300} height={150} />;
};

export default StockChart;