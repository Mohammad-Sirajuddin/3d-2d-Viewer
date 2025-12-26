import * as THREE from "three"
import { computeFlangeGeometry } from "../geometry/FlangeGeometry"
import type { flangeParams } from "../types/flange"

export function Flange3D({ params }: { params: flangeParams }) {
  const geo = computeFlangeGeometry(params)

  const shape = new THREE.Shape()
  shape.absarc(0, 0, geo.outerRadius, 0, Math.PI * 2)

  // inner bore
  const bore = new THREE.Path()
  bore.absarc(0, 0, geo.innerRadius, 0, Math.PI * 2)
  shape.holes.push(bore)

  // bolt holes
  geo.bolts.forEach(b => {
    const hole = new THREE.Path()
    hole.absarc(b.x, b.y, geo.boltHoleRadius, 0, Math.PI * 2)
    shape.holes.push(hole)
  })

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: geo.thickness,
    bevelEnabled: false,
  }

  return (
    <mesh>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial color="#cfcfcf" />
    </mesh>
  )
}
