import React, { useEffect } from "react";
import { useState } from "react";
import {
  selectIsConnectedToRoom,
  selectPeers,
  selectPermissions,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { hmsStore } from "./hms";
import getToken from "./utils/getToken";
import { useNavigate } from "react-router-dom";
// import selectIsRoomState from "@100mslive/react-sdk"
const axios = require("axios");

function JoinForm(props) {
  // const hmsActions = useHMSActions();
  // const token = localStorage.getItem('token');
  const hmsActions = useHMSActions();
  // const hmsStore = useHMSStore();
  let room_id = '';
    room_id = props.id;
    const [hmsid, setHmsid] = useState('')
  // const room_id = '62bf33e976f8697390a6db7e'
  const [role, setRole] = useState("speaker");
  // console.log(localStorage.getItem('user_id'))

  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  // const y = selectPermissions(hmsStore.subscribe())
  // console.log(y);
  
  // const headers = {
  //   "Access-Control-Allow-Origin": "*",
  //   'Content-Type': 'application/json',
  //   'token': token
  // }
  // const body = JSON.stringify({ room_id: room_id, role: role })
  // const hmstoken = '';

    let nav = useNavigate();
    useEffect(() => {
    axios
      .post("http://localhost:2000/get-room", JSON.stringify({ id: room_id }), {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then((res) => {
        setHmsid(res.data.data.hms_id);
      })})

  const joinRoom = () => {
    // const room =
    console.log(role, hmsid);
    
        getToken(role, hmsid)
          .then((token) => {
            console.log(token);
            hmsActions.join({
              userName: user_id,
              authToken: token,
              settings: {
                isAudioMuted: true,
              },
              initEndpoint:
                process.env.REACT_APP_HMS_INIT_PEER_ENPOINT || undefined,
            })
            console.log(isConnected)
            nav('../room/'+room_id);
          // })
          // .catch((error) => {
          //   console.log("Token API Error", error);
          // });
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
        Join room
      </button>
      {/* <button onClick={renderRoom(room_id)}>Render room</button> */}
      
    </div>
  );
}

export default JoinForm;
