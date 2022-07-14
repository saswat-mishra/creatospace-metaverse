import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import dummtTex from "../Assets/dummytexture.jpg";
import * as THREE from "three";
import { TextureLoader } from "three";

const AddScreen = ({ videoSrc }) => {
  let map;
  if (videoSrc) {
    videoSrc.play();
    console.log(videoSrc);
    map = new THREE.VideoTexture(videoSrc);
    // map.flipY = false;
  }
  const matRef = useRef();
  useFrame(() => {
    if (matRef.current) {
      matRef.current.needsUpdate = true;
    }
  });
  return (
    <mesh position={[-9.6, 9.3, 17]} rotation={[0, Math.PI, 0]}>
      <planeBufferGeometry args={[32, 18]} />
      {map ? (
        <meshBasicMaterial
          side={THREE.FrontSide}
          map={map}
          needsUpdate
          ref={matRef}
        />
      ) : (
        <meshBasicMaterial side={THREE.FrontSide} needsUpdate />
      )}
    </mesh>
  );
};

export default AddScreen;
