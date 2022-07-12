import React from "react";
import { useEffect } from "react";
import * as THREE from "three";
import useStore from "../store";
const Stairs = ({ cubeGeometry, material, y, z, cover, height }) => {
  const CollisionObj = useStore((state) => state.CollisionObj);
  const addObj = useStore((state) => state.addToCollisionObj);
  const mesh = new THREE.Mesh(cubeGeometry, material);
  mesh.receiveShadow = true;
  //   mesh.castShadow = true;
  mesh.scale.setY(height);
  mesh.position.set(-7, y, z);
  if (cover) {
    mesh.scale.setY(9);
    mesh.scale.setZ(3);
    mesh.position.set(-7, y - 1.99, z - 2);
  }
  useEffect(() => {
    const box3 = new THREE.Box3().setFromObject(mesh);
    addObj([box3, mesh]);
  }, []);
  console.log(CollisionObj);

  return (
    <>
      <primitive object={mesh} />
    </>
  );
};

export default Stairs;
