import {kdTree} from 'kd-tree-javascript';

export default function () {
  var tree = new kdTree([], distance, ['x', 'y']);

  return {
    insert(point) {
      let coord = {
        x: point[0],
        y: point[1],
        radius: point[2],
      };
      tree.insert(coord);
    },
    nearest(point, maxDistance) {
      let coord   = {
        x: point[0],
        y: point[1],
      };
      let nearest = tree.nearest(coord, 10, maxDistance);

      return nearest.map(item => {
        let coord = item[0];
        let dist = item[1];


        return {
          point: [coord.x, coord.y, coord.radius],
          dist,
        };
      });
    },
  };
}

function distance(a, b) {
  let ax = a.x;
  let ay = a.y;

  let bx = b.x;
  let by = b.y;

  let dx = ax - bx;
  let dy = ay - by;

  return Math.sqrt((dx * dx) + (dy * dy));
}
