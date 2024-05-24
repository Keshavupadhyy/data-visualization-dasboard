// src/components/BarChart.js
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:5000/api');
      setData(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.name))
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.age)])
      .range([height, 0]);

    const svg = d3.select('.bar-chart')
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.age))
        .attr('height', d => height - y(d.age));

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }, data)
}