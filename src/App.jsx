import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Experience from "./Experience";

function App() {
  return (
    <Canvas>
      {/* <OrbitControls /> */}
      <Experience />
      <OrthographicCamera
        makeDefault
        args={[-0.5, 0.5, 0.5, -0.5, -1000, 1000]}
      />
      <color attach="background" args={["#000"]} />
    </Canvas>
  );
}

export default App;
