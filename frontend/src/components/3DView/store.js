import create from "zustand";
import * as THREE from "three";

let useStore = (set) => ({
  CollisionObj: [],
  addToCollisionObj: (obj) => {
    set((state) => {
      //   const newList = state.CollisionObj;
      //   newList.push(obj);
      state.CollisionObj.push(obj);
    });
  },
});
export default useStore = create(useStore);
