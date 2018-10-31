import spacingRadiusCalc from './spacing-radius';
import kdTree from './kd-tree';
import rand from 'random-seed';

export default function ({
                           count,
                           width,
                           height,
                           spacingRadiusMin,
                           spacingRadiusMax,
                           maxFailCount = 10000,
                           seed = 100,
                         }) {
  let failCount = 0;

  //let rng = Math.random;
  let rngInst = rand.create(seed);
  let rng     = () => rngInst(100) / 100;

  let getRadius = spacingRadiusCalc({
    width,
    height,
    radiusMin: spacingRadiusMin,
    radiusMax: spacingRadiusMax,
  });

  let points = [];

  var tree = kdTree();

  while (points.length < count && failCount < maxFailCount) {
    let point = generatePoint();
    if (farEnough(point)) {

      point = varyRadius(point);
      addPoint(point);
    } else {
      failCount++;
    }
  }

  return points;

  function addPoint(point) {
    points.push(point);
    tree.insert(point);
  }

  function generatePoint() {
    let margin = width * 0.25;
    let w      = width + margin;
    let chunk  = 2;
    let sides  = (w / chunk);
    let cx     = 0;
    while (chunk--) {
      cx += roll(sides);
    }

    if (cx > w * 0.5) {
      cx -= w;
    }
    let x = cx + (width * 0.5);
    let y = rng() * height;

    //let x = rng() * width;
    //let y = rng() * height;
    x = Math.round(x);
    y = Math.round(y);

    let radius = getRadius([x, y]);

    return [x, y, radius];
  }

  function farEnough(point) {

    let nearest = tree.nearest(point, spacingRadiusMax * 2);
    let rad     = point[2];

    for (var i = 0; i < nearest.length; i++) {
      let item     = nearest[i];
      let dist     = item.dist;
      let other    = item.point;
      let otherRad = other[2];
      if (dist < rad + otherRad) {
        return false;
      }
    }

    return true;
  }


  function varyRadius(point) {

    let x              = point[0];
    let hw             = width * 0.5;
    let varianceChance = 0;

    if (x > hw) {
      varianceChance = (x - hw) / hw;
    } else {
      varianceChance = 1 - (x / hw);
    }

    if (rng() < varianceChance) {
      let variance = 0.2 + rng();
      point[2] *= variance;
    }
    return point;
  }

  function roll(num) {
    return rng() * num;
  }
}

