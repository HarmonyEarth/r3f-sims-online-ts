import * as THREE from "three";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useCursor,
} from "@react-three/drei";
import { useAtom } from "jotai";
import { AnimatedWoman } from "./AnimatedWoman";
import { SocketIOClientEvents, charactersAtom, socket } from "../constants";
import { useState } from "react";

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <ContactShadows blur={2} />
      <OrbitControls />
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onClick={(e) =>
          socket.emit(SocketIOClientEvents.MOVE, [e.point.x, 0, e.point.z])
        }
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={"#f0f0f0"} />
      </mesh>
      {characters.map((character) => (
        <AnimatedWoman
          key={character.id}
          position={
            new THREE.Vector3(
              character.position[0],
              character.position[1],
              character.position[2]
            )
          }
          hairColor={character.hairColor}
          bottomColor={character.bottomColor}
        />
      ))}
    </>
  );
};
