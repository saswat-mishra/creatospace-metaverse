import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { OrbitControls, Stats } from "@react-three/drei";
import { TextureLoader } from "three";
import Exhibition from "./Assets/Exhibition";
import * as THREE from "three";
import AddUsers from "./Components/AddUsers";
import dummtTex from "./Assets/dummytexture.jpg";

import ChairJsx from "./Assets/Chair";
import AddStairs from "./Components/AddStairs";
import AddScreen from "./Components/AddScreen";

// import Seat from "./Assets/Seat";

function ThreeDSpace({ videoSrc }) {
  const [users, setUsers] = useState([{}]);
  const createLoc = () => {
    const loc = [];
    let k = 0.31;
    for (let i = 0; i > -18; i -= 2) {
      for (let j = 20; j > -35; j -= 2) {
        loc.push([j, k, i]);
      }
      k += 0.5;
    }
    return loc;
  };
  const chairloc = createLoc();
  const shadowLightRef = useRef();

  return (
    <>
      <Suspense fallback={null}>
        <Canvas
          style={{ width: "100%", height: "100vh" }}
          shadows={{ type: THREE.PCFSoftShadowMap }}
        >
          <Stats />
          <OrbitControls />
          <directionalLight
            position={[0, 30, -60]}
            intensity={0.1}
            castShadow={true}
            ref={shadowLightRef}
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-near={0}
            shadow-camera-far={500}
            shadow-camera-left={105}
            shadow-camera-right={-105}
          />

          <ambientLight intensity={0.5} position={[0, 15, 0]} />
          <pointLight position={[-50, 16, 0]} intensity={0.1} />
          <pointLight position={[50, 16, 0]} intensity={0.1} />
          <pointLight position={[0, 15, 0]} intensity={0.1} />
          <AddStairs />
          <AddScreen videoSrc={videoSrc} />
          {/* <Podium /> */}
          <AddUsers chairLoc={chairloc} />
          {chairloc.map((loc) => (
            <ChairJsx pos={loc} />
          ))}
          <Suspense fallback={null}>
            <Exhibition />
          </Suspense>
        </Canvas>
      </Suspense>
    </>
  );
}

export default ThreeDSpace;
