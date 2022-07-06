import React from "react";
import { useState } from "react";
import { useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { hmsActions } from "./hms";
import { selectIsConnectedToRoom } from "@100mslive/hms-video-store";
import getToken from "./utils/getToken";
const axios = require("axios");

function JoinForm(props) {
  // const hmsActions = useHMSActions();
  // const token = localStorage.getItem('token');

  console.log(props);
  const room_id = props.id;
  // const room_id = '62bf33e976f8697390a6db7e'
  const [role, setRole] = useState('speaker');
  // console.log(localStorage.getItem('user_id'))
  const token = localStorage.getItem("token");
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  // const headers = {
  //   "Access-Control-Allow-Origin": "*",
  //   'Content-Type': 'application/json',
  //   'token': token
  // }
  // const body = JSON.stringify({ room_id: room_id, role: role })
  // const hmstoken = '';

  const joinRoom = () => {
    // const room =
    console.log(room_id);
    axios
      .post("http://localhost:2000/get-room", JSON.stringify({ id: room_id }), {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        getToken(role, res.data.data.hms_id)
          .then((token) => {
            hmsActions.join({
              userName: "Saswat",
              authToken: token,
              settings: {
                isAudioMuted: true,
              },
              initEndpoint:
                process.env.REACT_APP_HMS_INIT_PEER_ENPOINT || undefined,
            });
          })
          .catch((error) => {
            console.log("Token API Error", error);
          });
      })
      .catch((err) => {
        // swal({
        //   text: err.response.data.errorMessage,
        //   icon: "error",
        //   type: "error"
        // });
        // swal({
        //   text: err.response.data.errorMessage,
        //   icon: "error",
        //   type: "error"
        // });
      });
  };

  return (
    // <form>
    <div>
      <h2>Join Room</h2>
      {/* <div className="input-container">
        <input
          required
          value={inputValues.name}
          onChange={handleInputChange}
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
        />
      </div> */}
      {/* <div className="input-container">
        <input
          required
          value={inputValues.token}
          onChange={handleInputChange}
          id="token"
          type="text"
          name="token"
          placeholder="Auth token"
        />
      </div> */}
      <button onClick={joinRoom} className="btn-primary">
        Join
      </button>
      <div>{isConnected ? "connected" : "not connected, please join."}</div>
    </div>
  );
}

export default JoinForm;
