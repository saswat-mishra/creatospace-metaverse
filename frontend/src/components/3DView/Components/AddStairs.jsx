import React, { useRef } from "react";
import tile from "../Assets/metal.jpg";
import Stairs from "../Assets/Stairs";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const AddStairs = () => {
  const tileTexture = useLoader(TextureLoader, tile);
  const stairGeometry = new THREE.BoxBufferGeometry(56, 0.5, 2, 2, 2, 2);
  const stairMat = new THREE.MeshPhysicalMaterial({
    map: tileTexture,
    // shininess: 1,
    reflectivity: 1,
    roughness: 0.5,
    sheen: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.5,
  });

  return (
    <>
      {" "}
      <Stairs
        cubeGeometry={stairGeometry}
        material={stairMat}
        y={0.02}
        z={0}
        height={1}
      />
      <Stairs
        cubeGeometry={stairGeometry}
        material={stairMat}
        y={0.27}
        z={-2}
        height={2}
      />
      <Stairs
        cubeGeometry={stairGeometry}
        material={stairMat}
        y={0.52}
        z={-4}
        height={3}
      />
      <Stairs
        cubeGeometry={stairGeometry}
        material={stairMat}
        y={0.77}
        z={-6}
        height={4}
      />
      <Stairs
        cubeGeometry={stairGeometry}
        material={stairMat}
        y={1.02}
        z={-8}
        height={5}
      />
      <Stairs
        cubeGeometry={stairGeometry}
        material={stairMat}
        y={1.27}
        z={-10}
        height={6}
      />
      <Stairs
        cubeGeometry={stairGeometry}
        material={stairMat}
        y={1.52}
        z={-12}
        height={7}
      />
      <Stairs
        cubeGeometry={stairGeometry}
        material={stairMat}
        y={1.77}
        z={-14}
        height={8}
      />
      <Stairs
        cubeGeometry={stairGeometry}
        material={stairMat}
        y={2.02}
        z={-16}
        height={9}
      />
      <Stairs
        cubeGeometry={stairGeometry}
        material={stairMat}
        y={4.011}
        z={-18}
        cover={true}
      />
    </>
  );
};

export default AddStairs;
