import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Flange3D } from "./components/Flange3d"
import { Flange2DSVG } from "./components/Flange2d"
import { useState } from "react"
import { Box, TextField } from "@mui/material"

function App() {
  const [OuterRadius, setOuterRadius] = useState(100)
  const [InnerRadius, setInnerRadius] = useState(40)
  const [Thickness, setThickness] = useState(20)
  const [BoltHoleRadius, setBoltHoleRadius] = useState(6)
  const [BoltCount, setBoltCount] = useState(12)
  const [BoltCircleRadius, setBoltCircleRadius] = useState(70)

  const params = {
    outerRadius: OuterRadius,
    innerRadius: InnerRadius,
    thickness: Thickness,
    boltHoleRadius: BoltHoleRadius,
    boltCount: BoltCount,
    boltCircleRadius: BoltCircleRadius,
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header / Controls */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Outer Radius"
          type="number"
          value={OuterRadius}
          onChange={(e) => setOuterRadius(Number(e.target.value))}
        />
        <TextField
          label="Inner Radius"
          type="number"
          value={InnerRadius}
          onChange={(e) => setInnerRadius(Number(e.target.value))}
        />
        <TextField
          label="Thickness"
          type="number"
          value={Thickness}
          onChange={(e) => setThickness(Number(e.target.value))}
        />
        <TextField
          label="Bolt Hole Radius"
          type="number"
          value={BoltHoleRadius}
          onChange={(e) => setBoltHoleRadius(Number(e.target.value))}
        />
        <TextField
          label="Bolt Circle Radius"
          type="number"
          value={BoltCircleRadius}
          onChange={(e) => setBoltCircleRadius(Number(e.target.value))}
        />
        <TextField
          label="Bolt Count"
          type="number"
          value={BoltCount}
          onChange={(e) => setBoltCount(Number(e.target.value))}
        />
      </Box>

      {/* Views */}
      <Box sx={{ flex: 1, display: "flex" }}>
        {/* 3D View */}
        <Box sx={{ flex: 1 }}>
          <Canvas camera={{ position: [0, 150, 250], fov: 45 }}>
            <color attach="background" args={["#f0f0f0"]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[100, 200, 100]} />
            <OrbitControls />
            <Flange3D params={params} />
          </Canvas>
        </Box>

        {/* 2D View */}
        <Box sx={{ flex: 1 }}>
          <Flange2DSVG params={params} />
        </Box>
      </Box>
    </Box>
  )
}

export default App
