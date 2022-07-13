import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import * as THREE from "three";
import useJoe from "./Characters/Joe";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import useUtkarsh from "./Characters/utkarsh";
import KeyboardControls from "../Utils/Controls";
import UpdateCam from "../Utils/Camera";
import useStore from "../store";
const socket = io.connect("https://localhost:3001/");

const AddUsers = () => {
  const CollisionObj = useStore((state) => state.CollisionObj);
  console.log(CollisionObj);
  const StaticJoe = useJoe(true, true);
  const static2 = useUtkarsh(true, true);
  const { scene, camera } = useThree();
  const newmesh = static2.gltf.scene;
  newmesh.traverse((char) => {
    char.castShadow = true;
  });
  const actions = static2.actions;
  const uuid = uuidv4();
  const boxEnvelope = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1, 0.5),
    new THREE.MeshBasicMaterial()
  );
  useEffect(() => {
    console.log(uuid);
    socket.emit("add-user", uuid);
    scene.add(newmesh);
    scene.add(boxEnvelope);
    newmesh.position.set(0, 0.25, 0);
    boxEnvelope.position.copy(newmesh.position);
    boxEnvelope.visible = false;
  }, []);

  const otherUsers = [];
  socket.on("pre-user", (d) => {
    if (d.uuid != uuid) {
      const tempJoe = SkeletonUtils.clone(StaticJoe.gltf.scene);
      const mixer = new THREE.AnimationMixer(tempJoe);
      mixer.clipAction(StaticJoe.actions["stand-idle"]._clip).play();
      scene.add(tempJoe);
      tempJoe.userData = { uuid: d.uuid };
      otherUsers.push([tempJoe, mixer]);
      d.position
        ? tempJoe.position.copy(d.position)
        : tempJoe.position.set(0, 0.25, 0);
      d.rotation && tempJoe.rotation.copy(d.rotation);
    }
  });
  socket.on("render-new", (d) => {
    if (d.uuid != uuid) {
      const tempJoe = SkeletonUtils.clone(StaticJoe.gltf.scene);
      const mixer = new THREE.AnimationMixer(tempJoe);
      mixer.clipAction(StaticJoe.actions["stand-idle"]._clip).play();

      scene.add(tempJoe);
      tempJoe.userData = { uuid: d.uuid };
      otherUsers.push([tempJoe, mixer]);
      tempJoe.position.set(0, 0.25, 0);
    }
  });

  socket.on("user-update-position", (d) => {
    for (let i = 0; i < otherUsers.length; i++) {
      // console.log(otherUsers[i].userData.uuid);
      if (otherUsers[i][0].userData.uuid == d.uuid) {
        // console.log(d.newPos);
        otherUsers[i][0].position.copy(d.newPos);
        otherUsers[i][0].rotation.copy(d.newRot);
        otherUsers[i][1]
          .clipAction(StaticJoe.actions["stand-idle"]._clip)
          .stop();
        otherUsers[i][1].clipAction(StaticJoe.actions["walk"]._clip).play();
      }
    }
  });

  socket.on("stop-animate-walk", (d) => {
    for (let i = 0; i < otherUsers.length; i++) {
      if (otherUsers[i][0].userData.uuid == d.uuid) {
        otherUsers[i][1].clipAction(StaticJoe.actions["walk"]._clip).stop();
        otherUsers[i][1]
          .clipAction(StaticJoe.actions["stand-idle"]._clip)
          .play();
      }
    }
  });

  socket.on("disconnect-user", (d) => {
    console.log(d);
    for (let i = 0; i < otherUsers.length; i++) {
      if (otherUsers[i][0].userData.uuid == d.uuid) {
        console.log(otherUsers[i][0].userData.uuid);
        scene.remove(otherUsers[i][0]);
        otherUsers.splice(i, 1);
      }
    }
  });
  console.log(newmesh);
  let keyPressed;
  useEffect(() => {
    keyPressed = KeyboardControls(actions);
  }, [newmesh]);

  const clock = new THREE.Clock();
  useFrame(() => {
    const delta = clock.getDelta();
    otherUsers.map((user) => {
      user[1].update(delta);
    });
    if (keyPressed) {
      if (keyPressed?.w) {
        newmesh.translateZ(delta * 0.2);
        boxEnvelope.position.copy(newmesh.position);
        socket.emit("update-position", {
          uuid,
          newPos: newmesh.position,
          newRot: newmesh.rotation,
        });
      }

      if (keyPressed?.s) {
        newmesh.translateZ(-0.01);
      }

      if (keyPressed?.a) {
        newmesh.rotation.y += 0.02;
        socket.emit("update-position", {
          uuid,
          newPos: newmesh.position,
          newRot: newmesh.rotation,
        });
      }
      if (keyPressed?.d) {
        newmesh.rotation.y -= 0.02;
        socket.emit("update-position", {
          uuid,
          newPos: newmesh.position,
          newRot: newmesh.rotation,
        });
      }
      if (!keyPressed?.w) {
        socket.emit("stop-walk", uuid);
      }
    }

    UpdateCam(newmesh, camera);
    // console.log(newmesh);
    const CollisionBox = new THREE.Box3().setFromObject(boxEnvelope);

    CollisionObj.map((arr) => {
      if (arr[0].intersectsBox(CollisionBox)) {
        if (CollisionObj.indexOf(arr) == 0) {
          newmesh.position.y = 0.25;
        }
        if (CollisionObj.indexOf(arr) == 1) {
          newmesh.position.y = 0.77;
        }
        if (CollisionObj.indexOf(arr) == 2) {
          newmesh.position.y = 1.27;
        }
        if (CollisionObj.indexOf(arr) == 3) {
          newmesh.position.y = 1.77;
        }
        if (CollisionObj.indexOf(arr) == 4) {
          newmesh.position.y = 2.27;
        }
        if (CollisionObj.indexOf(arr) == 5) {
          newmesh.position.y = 2.77;
        }
        if (CollisionObj.indexOf(arr) == 6) {
          newmesh.position.y = 3.27;
        }
        if (CollisionObj.indexOf(arr) == 7) {
          newmesh.position.y = 3.77;
        }
        if (CollisionObj.indexOf(arr) == 8) {
          newmesh.position.y = 4.27;
        }
      }
    });
  });

  return <></>;
};

export default AddUsers;
