import { useAnimations, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";
import { useEffect } from "react";
import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  Side,
  Vector3,
} from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";

const SelectCharacter = ({ charID }) => {
  const JoeRef = useGLTF(
    "https://creatospace-glb.s3.ap-south-1.amazonaws.com/joe.glb"
  );
  const MeganRef = useGLTF(
    "https://creatospace-glb.s3.ap-south-1.amazonaws.com/Megan.glb"
  );
  const LeonardRef = useGLTF(
    "https://creatospace-glb.s3.ap-south-1.amazonaws.com/leonard.glb"
  );

  const Joe = SkeletonUtils.clone(JoeRef.scene);
  const Megan = SkeletonUtils.clone(MeganRef.scene);
  const Leonard = SkeletonUtils.clone(LeonardRef.scene);

  const { scene, camera } = useThree();
  const backdrop = new Mesh(
    new PlaneBufferGeometry(10, 5),
    new MeshBasicMaterial({ side: DoubleSide, color: 0x3b1859 })
  );
  backdrop.rotation.set(0, Math.PI, 0);
  backdrop.position.set(0, 0, -2);
  useEffect(() => {
    Joe.scale.setScalar(0.2);
    Megan.scale.setScalar(0.2);
    Leonard.scale.setScalar(0.2);

    Joe.position.set(0, 0, 0.2);
    Megan.position.set(0, 0, 0.2);
    Leonard.position.set(0, 0, 0.2);
  }, [Joe, Megan, Leonard]);
  // camera.lookAt(Megan.scene);
  camera.position.set(0, 0.2, 0.6);
  return (
    <mesh>
      {charID == 1 ? (
        <primitive object={Megan} />
      ) : charID == 2 ? (
        <primitive object={Joe} />
      ) : (
        <primitive object={Leonard} />
      )}
      <primitive object={backdrop} />
    </mesh>
  );
};

export default SelectCharacter;
