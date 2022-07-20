import create from "zustand";
import axios from "axios";
const API = "http://localhost:2000";

let useStore = (set) => ({
  rooms: [],
  creators: [],
  HMSId: "",
  userLogin: localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null,
  //
  //
  getRooms: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/all-rooms`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          token: token,
        },
      });
      set({ rooms: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  getCreators: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/creator`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          token: token,
        },
      });
      console.log(res.data);
      set({ creators: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  getHMSId: async (room_id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/get-room`,
        JSON.stringify({ id: room_id }),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      set({ HMSId: res.data.data.hms_id });
    } catch (error) {
      console.log(error);
    }
  },

  login: async (email, password) => {
    try {
      const res = await axios.post(`${API}/login`, {
        email: email,
        password: password,
      });
      set({ userLogin: res.data.data });
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user_id", res.data.data.uid);
    } catch (error) {
      console.log(error);
    }
  },

  register: async (email, password) => {
    const res = await axios.post(`${API}/register`, {
      email: email,
      password: password,
    });
  },
});
export default useStore = create(useStore);
