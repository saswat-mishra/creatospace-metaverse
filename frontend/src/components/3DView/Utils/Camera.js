import * as THREE from "three";

const currentCameraPosition = new THREE.Vector3();
const currentCameraLookAt = new THREE.Vector3();

const calculateIdealOffset = (body) => {
  const idealOffset = new THREE.Vector3(-1, 2, -4);
  idealOffset.applyQuaternion(body.quaternion);
  idealOffset.add(body.position);
  return idealOffset;
};
const calculateIdealLookAt = (body) => {
  const idealLookAt = new THREE.Vector3(0, 2.6, 10);
  idealLookAt.applyQuaternion(body.quaternion);
  idealLookAt.add(body.position);
  return idealLookAt;
};

const UpdateCam = (body, camera) => {
  const idealOffset = calculateIdealOffset(body);
  const idealLookAt = calculateIdealLookAt(body);
  currentCameraPosition.lerp(idealOffset, 0.6);
  currentCameraLookAt.lerp(idealLookAt, 0.6);
  camera.position.copy(currentCameraPosition);
  camera.lookAt(currentCameraLookAt);
};

export default UpdateCam;
