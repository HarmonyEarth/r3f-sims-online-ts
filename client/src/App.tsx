import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import "./App.css";
import { SocketManager } from "./components/SocketManager";

function App() {
  return (
    <>
      <SocketManager />
      <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
