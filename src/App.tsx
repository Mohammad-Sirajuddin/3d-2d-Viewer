import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Flange3D } from "./components/Flange3d";
import { Flange2DSVG } from "./components/Flange2d";
import { useState } from "react";
import { Box, TextField } from "@mui/material";
import {
  computeBoltCount,
  getMaxBoltHoleRadius,
} from "./geometry/FlangeGeometry";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function App() {
  const [params, setParams] = useState({
    outerRadius: 100,
    innerRadius: 40,
    thickness: 20,
    boltHoleRadius: 6,
    boltCount: 12,
    boltCircleRadius: 70,
  });
  
  function updateParam(key: keyof typeof params, rawValue: number) {
  setParams((prev) => {
    let p = { ...prev };
    let value = rawValue;

    if (key === "outerRadius") {
      value = clamp(value, p.boltCircleRadius + p.boltHoleRadius*2, 150);
      p.outerRadius = value;

      // adjust dependent parameters if invalid
      if (p.boltCircleRadius > p.outerRadius - p.boltHoleRadius * 2) {
        p.boltCircleRadius = p.outerRadius - p.boltHoleRadius * 2;
      }
      const maxHole = getMaxBoltHoleRadius(p.innerRadius, p.outerRadius, p.boltCircleRadius);
      if (p.boltHoleRadius > maxHole) {
        p.boltHoleRadius = maxHole;
      }
      const maxBolts = computeBoltCount(p.boltCircleRadius, p.boltHoleRadius);
      if (p.boltCount > maxBolts) {
        p.boltCount = maxBolts;
      }
    }

    else if (key === "innerRadius") {
      value = clamp(value, 10, p.boltCircleRadius - p.boltHoleRadius*2);
      p.innerRadius = value;

      if (p.boltCircleRadius < p.innerRadius + p.boltHoleRadius * 2) {
        p.boltCircleRadius = p.innerRadius + p.boltHoleRadius * 2;
      }
      const maxHole = getMaxBoltHoleRadius(p.innerRadius, p.outerRadius, p.boltCircleRadius);
      if (p.boltHoleRadius > maxHole) {
        p.boltHoleRadius = maxHole;
      }
    }

    else if (key === "boltCircleRadius") {
      const minBCR = p.innerRadius + p.boltHoleRadius * 2;
      const maxBCR = p.outerRadius - p.boltHoleRadius * 2;
      value = clamp(value, minBCR, maxBCR);
      p.boltCircleRadius = value;

      const maxHole = getMaxBoltHoleRadius(p.innerRadius, p.outerRadius, p.boltCircleRadius);
      if (p.boltHoleRadius > maxHole) {
        p.boltHoleRadius = maxHole;
      }
      const maxBolts = computeBoltCount(p.boltCircleRadius, p.boltHoleRadius);
      if (p.boltCount > maxBolts) {
        p.boltCount = maxBolts;
      }
    }

    else if (key === "boltHoleRadius") {
      const maxHole = getMaxBoltHoleRadius(p.innerRadius, p.outerRadius, p.boltCircleRadius);
      value = clamp(value, 2, maxHole);
      p.boltHoleRadius = value;

      const maxBolts = computeBoltCount(p.boltCircleRadius, p.boltHoleRadius);
      if (p.boltCount > maxBolts) {
        p.boltCount = maxBolts;
      }
    }

    else if (key === "thickness") {
      value = clamp(value, 5, p.outerRadius * 0.3);
      p.thickness = value;
    }

    else if (key === "boltCount") {
      const maxBolts = computeBoltCount(p.boltCircleRadius, p.boltHoleRadius);
      value = clamp(Math.round(value), 4, maxBolts);
      p.boltCount = value;
    }

    return p;
  });
}


  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Controls */}
      <Box sx={{ display: "flex", gap: 2, p: 2, flexWrap: "wrap" }}>
        <TextField
          label="Outer Radius"
          type="number"
          value={params.outerRadius}
          onChange={(e) => updateParam("outerRadius", +e.target.value)}
        />

        <TextField
          label="Inner Radius"
          type="number"
          value={params.innerRadius}
          onChange={(e) => updateParam("innerRadius", +e.target.value)}
        />

        <TextField
          label="Thickness"
          type="number"
          value={params.thickness}
          onChange={(e) => updateParam("thickness", +e.target.value)}
        />

        <TextField
          label="Bolt Circle Radius"
          type="number"
          value={params.boltCircleRadius}
          onChange={(e) => updateParam("boltCircleRadius", +e.target.value)}
        />

        <TextField
          label="Bolt Hole Radius"
          type="number"
          value={params.boltHoleRadius}
          onChange={(e) => updateParam("boltHoleRadius", +e.target.value)}
        />

        <TextField
          label="Bolt Count"
          type="number"
          value={params.boltCount}
          onChange={(e) => updateParam("boltCount", +e.target.value)}
        />
      </Box>

      {/* Views */}
      <Box sx={{ flex: 1, display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Canvas camera={{ position: [0, 150, 250], fov: 45 }}>
            <color attach="background" args={["#f0f0f0"]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[100, 200, 100]} />
            <OrbitControls />
            <Flange3D params={params} />
          </Canvas>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Flange2DSVG params={params} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
