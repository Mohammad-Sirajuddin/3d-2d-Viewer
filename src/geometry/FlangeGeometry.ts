import type { flangeParams } from "../types/flange";


export type Point2D = { x: number; y: number }

export function computeBoltCenters(
  boltCount: number,
  boltCircleRadius: number
): Point2D[] {
  return Array.from({ length: boltCount }, (_, i) => {
    const angle = (i / boltCount) * Math.PI * 2
    return {
      x: Math.cos(angle) * boltCircleRadius,
      y: Math.sin(angle) * boltCircleRadius,
    }
  })
}

export function computeFlangeGeometry(p: flangeParams) {
  return {
    outerRadius: p.outerRadius,
    innerRadius: p.innerRadius,
    thickness: p.thickness,
    boltHoleRadius: p.boltHoleRadius,
    bolts: computeBoltCenters(p.boltCount, p.boltCircleRadius),
  }
}
