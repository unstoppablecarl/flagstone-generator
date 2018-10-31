import * as d3 from 'd3';

export default function ({
                           svgId,
                           width,
                           height,
                           margin,
                           data,
                           cellStrokeWidth,
                         }) {

  const svg = d3.select('#' + svgId);

  const margin2 = margin * 2;
  svg.attr('width', width + margin2 * 2);
  svg.attr('height', height + margin2 * 2);
  svg.attr('viewBox', [-margin, -margin, width + margin2, height + margin2].join(' '));

  svg.style('background-color', 'grey');

  let line = d3.line().curve(d3.curveBasisClosed);

  let sites    = data.map(node => node.site);
  let centers  = data.map(node => node.center);
  let polygons = data.map(node => node.polygon);

  let cell = svg.selectAll('g')
    .data(sites)
    .enter().append('g');

  cell.append('path')
    .data(polygons)
    .attr('d', (d) => line(d))
    .style('stroke', 'grey')
    //.style('fill', 'white')
    .style('stroke-width', cellStrokeWidth);

//polygons.forEach(polygon => {
//
//  svg.append('g')
//    .selectAll('.point')
//    .data(polygon)
//    .enter().append('circle')
//    .attr('class', 'point')
//    .attr('cx', d => d[0])
//    .attr('cy', d => d[1])
//    .attr('r', 1)
//    .style('fill', 'rgba(255,0,0,0.5)');
//});

  //cell.selectAll('polygon')
  //  .data(polygons)
  //  .enter()
  //  .append('polygon')
  //  .attr('points', function (d) {
  //    return d.map(function (d) {
  //      return [d[0], d[1]].join(',');
  //    }).join(' ');
  //  })
  //  .style('stroke', 'grey')
  //  .style('fill', 'white')
  //  .style('stroke-width', cellStrokeWidth);


  //svg.append('g')
  //  .selectAll('.rad')
  //  .data(sites)
  //  .enter().append('circle')
  //  .attr('class', 'rad')
  //  .attr('cx', d => d[0])
  //  .attr('cy', d => d[1])
  //  .attr('r', d => {
  //    return d[2];
  //
  //  })
  //  .style('fill', 'rgba(100,100,0,0.5)');
  //
  //svg.append('g')
  //  .selectAll('.site')
  //  .data(sites)
  //  .enter().append('circle')
  //  .attr('class', 'site')
  //  .attr('cx', d => d[0])
  //  .attr('cy', d => d[1])
  //  .attr('r', 1.5)
  //  .style('fill', 'red');


  //
  //
  //svg.append('g')
  //  .selectAll('.center')
  //  .data(centers)
  //  .enter().append('circle')
  //  .attr('class', 'center')
  //  .attr('cx', d => d[0])
  //  .attr('cy', d => d[1])
  //  .attr('r', 1.5)
  //  .style('fill', 'orange');

}
