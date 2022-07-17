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
import SelectCharacter from "./Components/SelectCharacter";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";

// import Seat from "./Assets/Seat";

function ThreeDSpace({ videoSrc }) {
  const [charID, setCharID] = useState(1);
  const [selectedChar, setSelectedChar] = useState();
  const [hideCharacterSelection, setHideCharacterSelection] = useState(false);
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
          {!hideCharacterSelection && <SelectCharacter charID={charID} />}
          <Stats />
          {/* <OrbitControls /> */}
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
          {hideCharacterSelection && (
            <>
              <AddStairs />
              <AddScreen videoSrc={videoSrc} />
              {/* <Podium /> */}
              <AddUsers chairLoc={chairloc} selectedChar={selectedChar} />
              {chairloc.map((loc) => (
                <ChairJsx pos={loc} />
              ))}
              <Suspense fallback={null}>
                <Exhibition />
              </Suspense>
            </>
          )}
        </Canvas>
      </Suspense>
      {!hideCharacterSelection && (
        <>
          <AiFillCaretRight
            style={{
              position: "absolute",
              top: "50%",
              right: "10%",
              fontSize: "100px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (charID != 3) {
                setCharID(charID + 1);
              } else {
                setCharID(1);
              }
            }}
          />
          <AiFillCaretLeft
            style={{
              position: "absolute",
              top: "50%",
              left: "10%",
              fontSize: "100px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (charID != 1) {
                setCharID(charID - 1);
              } else {
                setCharID(3);
              }
            }}
          />
          <p
            style={{
              position: "absolute",
              top: "5px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "50px",
              color: "white",
              fontWeight: "600",
              margin: "0",
            }}
          >
            Select Character
          </p>
          <div
            style={{
              position: "absolute",
              bottom: "25px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "30px",
              // color: "white",
              fontWeight: "400",
              margin: "0",
              padding: "10px 30px",
              backgroundColor: "#5486bf",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              width: "200px",
              boxShadow: "1px 1px 10px 0px",
            }}
            onClick={() => {
              if (charID == 1) {
                setSelectedChar("Megan");
                setHideCharacterSelection(true);
              } else if (charID == 2) {
                setSelectedChar("Joe");
                setHideCharacterSelection(true);
              } else if (charID == 3) {
                setSelectedChar("Leonard");
                setHideCharacterSelection(true);
              }
            }}
          >
            {`Select ${
              charID == 1 ? "Megan" : charID == 2 ? "Joe" : "Leonard"
            }`}
          </div>
        </>
      )}
    </>
  );
}

export default ThreeDSpace;
