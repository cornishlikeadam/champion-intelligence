import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Constellation = ({ data, onNodeClick }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const width = window.innerWidth || 1200;
    const height = window.innerHeight || 800;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'transparent');

    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(200))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60));

    const link = svg.append('g')
      .selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke', 'rgba(255, 255, 255, 0.2)')
      .attr('stroke-width', 1.5);

    const node = svg.append('g')
      .selectAll('g')
      .data(data.nodes)
      .enter().append('g')
      .attr('class', 'node-group')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => onNodeClick(d));

    // Glow effect for nodes
    node.append('circle')
      .attr('r', d => d.type === 'champion' ? 10 : 6)
      .attr('fill', d => d.type === 'champion' ? '#ffcc00' : '#818cf8')
      .attr('filter', 'drop-shadow(0 0 12px currentColor)');

    node.append('text')
      .text(d => d.name)
      .attr('x', 12)
      .attr('y', 4)
      .attr('fill', 'var(--text-secondary)')
      .style('font-size', '12px')
      .style('font-family', 'var(--font-sans)')
      .style('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [data, onNodeClick]);

  return (
    <div className="constellation-container" style={{ position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Constellation;
