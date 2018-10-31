export default function resample({
                                   points,
                                   isCornerRadiusAbsolute,
                                   cornerRadius,
                                 }) {
  let i       = -1;
  let n       = points.length;
  let p0      = points[n - 1];
  let x0      = p0[0];
  let y0      = p0[1];
  let p1, x1, y1;
  let points2 = [];

  while (++i < n) {
    p1 = points[i];
    x1 = p1[0];
    y1 = p1[1];

    let finalRadius = 0;

    let distance      = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
    let distFromPoint = cornerRadius / distance;

    if (isCornerRadiusAbsolute) {
      finalRadius = distFromPoint >= 0.5 ? 0.5 : distFromPoint;
    }
    else {
      finalRadius = cornerRadius;
    }

    let ax = x0 + (x1 - x0) * finalRadius;
    let ay = y0 + (y1 - y0) * finalRadius;

    points2.push(
      [ax, ay],
      p1,
    );


    p0 = p1;
    x0 = x1;
    y0 = y1;
  }
  return points2;
}
