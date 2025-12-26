import type { flangeParams } from "../types/flange";

export type Point2D = { x: number; y: number };

export function computeBoltCenters(
  boltCount: number,
  boltCircleRadius: number
): Point2D[] {
  const points: Point2D[] = [];

  for (let i = 0; i < boltCount; i++) {
    const angle = (i / boltCount) * Math.PI * 2;

    points.push({
      x: Math.cos(angle) * boltCircleRadius,
      y: Math.sin(angle) * boltCircleRadius,
    });
  }

  return points;
}

export function computeFlangeGeometry(p: flangeParams) {
  return {
    outerRadius: p.outerRadius,
    innerRadius: p.innerRadius,
    thickness: p.thickness,
    boltHoleRadius: p.boltHoleRadius,
    bolts: computeBoltCenters(p.boltCount, p.boltCircleRadius),
  };
}
