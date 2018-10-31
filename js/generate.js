import * as d3 from 'd3';
import randomPoints from './generate/random-points';
import clipper from 'js-clipper';
import resample from './generate/resample-points';

export default function ({
                           count,
                           width,
                           height,
                           cleanCornerRadius,
                           isCornerRadiusAbsolute,
                           cornerRadius,
                           minSize,
                           spacingRadiusMin,
                           spacingRadiusMax,
                         }) {

  const sites = randomPoints({
    count,
    width,
    height,
    spacingRadiusMin,
    spacingRadiusMax,
  });

  const polygons = makePolygons({width, height, sites});

  let nodes = makeNodes({sites, polygons});
  nodes     = cleanNodePolygons({nodes, cleanCornerRadius});

  nodes = nodes.map(node => {
    node.polygon = resample({
      points: node.polygon,
      isCornerRadiusAbsolute,
      cornerRadius,
    });
    return node;

  });

  nodes = prepareNodes(nodes);
  nodes = filterNodesMinSize({nodes, minSize});

  return nodes;
}

function makePolygons({
                        width,
                        height,
                        sites,
                        margin = 1,
                      }) {

  const margin2 = margin * 2;
  const voronoi = d3.voronoi().extent([
    [margin, margin],
    [width - margin2, height - margin2],
  ]);

  return voronoi.polygons(sites);
}

function makeNodes({sites, polygons}) {
  return sites.map((site, index) => {
    return {
      site,
      polygon: polygons[index],
    };
  });
}

function cleanNodePolygons({nodes, cleanCornerRadius}) {
  return nodes
    .filter(node => node.polygon)
    .map(node => {
      node.polygon = cleanPoints({
        points: node.polygon,
        cleanCornerRadius,
      });
      return node;
    })
    .filter(node => node.polygon.length);
}

function cleanPoints({points, cleanCornerRadius}) {
  const path = points.map(d => {
    return {X: d[0], Y: d[1]};
  });

  return clipper.JS.Clean(path, cleanCornerRadius)
    .map(d => [d.X, d.Y]);
}

function prepareNodes(nodes) {
  return nodes.map(node => {
    let polygon = node.polygon;

    let xPoints = polygon.map(c => c[0]);
    let yPoints = polygon.map(c => c[1]);

    let avgX = average(xPoints);
    let avgY = average(yPoints);

    return Object.assign(node, {
      avg: [avgX, avgY],
      bounds: makeBounds(xPoints, yPoints),
      polygon,
    });
  });
}

function makeBounds(xPoints, yPoints) {
  let xMin = Math.min(...xPoints);
  let xMax = Math.max(...xPoints);
  let yMin = Math.min(...yPoints);
  let yMax = Math.max(...yPoints);

  return {
    xMin,
    xMax,
    yMin,
    yMax,
    width: xMax - xMin,
    height: yMax - yMin,
  };
}

function average(numbers) {
  const count = numbers.length;
  const sum   = numbers.reduce((a, c) => a + c, 0);
  return sum / count;
}

function filterNodesMinSize({nodes, minSize}) {
  return nodes.filter(node => {
    let width  = node.bounds.width;
    let height = node.bounds.height;
    return minSize < width && minSize < height;
  });
}

