import React from "react";
import { useState } from "react";
import { useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { selectIsConnectedToRoom } from '@100mslive/hms-video-store';
const axios = require('axios');


function JoinForm() {
  const hmsActions = useHMSActions();
  // const token = localStorage.getItem('token');


  const room_id = '62bf33e976f8697390a6db7e'
  const role = 'new-role-8544'
  // console.log(localStorage.getItem('user_id'))
  const token = localStorage.getItem('token')
  const isConnected = useHMSStore(selectIsConnectedToRoom)


  // const headers = {
  //   "Access-Control-Allow-Origin": "*",
  //   'Content-Type': 'application/json',
  //   'token': token
  // }
  // const body = JSON.stringify({ room_id: room_id, role: role })
  // const hmstoken = '';

  const getToken = () => {
    axios.post('http://localhost:2000/token',
      JSON.stringify({ room_id: room_id, role: role }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'token': token
        }
      }
    ).then((res) => {
      console.log(res)
      hmsActions.join({
        userName: 'saswat',
        authToken: res.data.title,
      })
      console.log(isConnected);

    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        // swal({
        //   text: err.response.data.errorMessage,
        //   icon: "error",
        //   type: "error"
        // });
        console.log(err);
      }
    });
  }



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
      <button onClick={getToken} className="btn-primary">Join</button>
      <div>{isConnected ? 'connected' : 'not connected, please join.'}</div>
    </div>
  );
}

export default JoinForm;
