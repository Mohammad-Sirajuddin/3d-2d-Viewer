import { computeFlangeGeometry } from "../geometry/FlangeGeometry"
import type { flangeParams } from "../types/flange"

export function Flange2DSVG({ params }: { params: flangeParams }) {
  const geo = computeFlangeGeometry(params)
  const padding = 20
  const size = geo.outerRadius * 2 + padding * 2

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      style={{ border: "1px solid #ccc", background: "white" }}
    >
      {/* Outer diameter */}
      <circle
        r={geo.outerRadius}
        fill="none"
        stroke="black"
        strokeWidth={0.5}
      />

      {/* Inner bore */}
      <circle
        r={geo.innerRadius}
        fill="none"
        stroke="black"
        strokeWidth={0.5}
      />

      {/* Bolt holes */}
      {geo.bolts.map((b, i) => (
        <circle
          key={i}
          cx={b.x}
          cy={b.y}
          r={geo.boltHoleRadius}
          fill="none"
          stroke="black"
          strokeWidth={0.5}
        />
      ))}
    </svg>
  )
}
