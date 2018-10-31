export default function ({
                           width,
                           height,
                           radiusMin,
                           radiusMax,
                         }) {
  return function (point) {
    let x     = point[0];
    let ratio = 1;
    if (x > width * 0.5) {
      ratio = (width - x) / (width * 0.5);
    } else {
      ratio = x / (width * 0.5);
    }

    if (ratio < 0) {
      ratio = 0;
    }

    return radiusMin + (radiusMax - radiusMin) * ratio;
  };
}
