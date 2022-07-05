import React from "react";
import { useState } from "react";
import { useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { selectIsConnectedToRoom } from '@100mslive/hms-video-store';
const axios = require('axios');


function JoinForm(props) {
  const hmsActions = useHMSActions();
  // const token = localStorage.getItem('token');
  console.log(props);
  const room_id = props.id




  // const room_id = '62c16150c42dc78aa5b81d5e'
  const role = 'moderator'
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
    const room =
      console.log(room_id);
    axios.post('http://localhost:2000/get-room', JSON.stringify({ id: room_id }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'token': token
        }
      }
    ).then((res) => {
      console.log(res.data.data)
      // return res.data.data;
      axios.post('http://localhost:2000/token',
        JSON.stringify({ room_id: res.data.data.hms_id, role: role }),
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
          userName: 'saswat-mishra',
          authToken: res.data.title,
          rememberDeviceSelection: true,
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

    }).catch((err) => {
      console.log(err);
      // swal({
      //   text: err.response.data.errorMessage,
      //   icon: "error",
      //   type: "error"
      // });
    });

    console.log(room);

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
