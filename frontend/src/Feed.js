import { HMSLogLevel } from "@100mslive/react-sdk";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profilecard from "./components/Profilecard";
import "./Feed.css";
import { hmsActions } from "./hms";
import JoinForm from "./JoinForm";
const axios = require("axios");

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

function Feed() {
  var [rooms, setRooms] = useState([]);
  const token = localStorage.getItem("token");
  // var roomlist = [];
  hmsActions.setLogLevel(HMSLogLevel.WARN);
  useEffect(() => {
    axios
      .get("http://localhost:2000/all-rooms", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then((res) => {
        setRooms(res.data.data);
        // console.log(rooms, res.data.data);
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          console.log(err);
        }
      });
  });

  return (
    <div id="bodydiv">
      <Grid container spacing={12}>
        <Grid item md={6}>
          <div className="heading">
            <h1>Join your favourite events here!</h1>
          </div>
          <button id="create-room">Create Room</button>
        </Grid>
        {rooms ? (
          <div id="content">
            {rooms.map((e, index) => (
              <Grid key={index} item md={12} >
                <Profilecard
                  name={e.name}
                  desc={e.desc}
                  price={e.price}
                ></Profilecard>
                <p>{e._id}</p>
                <JoinForm id={e._id} ></JoinForm>
              </Grid>
            ))}
          </div>
        ) : (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
      </Grid>
    </div>
  );
}

export default Feed;
