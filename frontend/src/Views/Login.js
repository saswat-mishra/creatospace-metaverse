import React, { Component, useRef, useState } from "react";
import swal from "sweetalert2";
import { Button, TextField, Link } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import useStore from "../store";
import { checkAuth } from "../utils/checkAuth";
import { GoogleLogin } from 'react-google-login';
const axios = require('axios');
// import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

function Login() {
  var email = useRef();
  var password = useRef();
  const login = useStore((state) => state.login);
  const userLogin = useStore((state) => state.userLogin);
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  if (userLogin) {
    nav("/feed");
  }
  // Get redirect location or provide fallback
  const onSuccess = (res) => {
    console.log("Login Success. Current User: ", res.profileObj.name);
    axios.post('http://localhost:2000/login', {
      email: res.profileObj.email,
      password: "$10$1gaworEfgNoApDgHHWl2Kle4",
    }).then((res) => {
      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('user_id', res.data.data.uid);
      console.log(res);
      nav("/feed");
      // console.log(history, 'test2')
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        new swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }
  const onFailure = (res) => {
    console.log("Login Failed. res: ", res);
  }
  return (
    <>
      {checkAuth() ? (
        <Navigate to={"/feed"} />
      ) : (
        <div id="form-box" style={{ marginTop: "200px" }}>
          <div>
            <h2>Login</h2>
          </div>

          <div>
            <input
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="email"
              placeholder="User Name"
              required
              ref={email}
            />
            <br />
            <br />
            <input
              id="standard-basic"
              type="password"
              autoComplete="off"
              name="password"
              placeholder="Password"
              required
              ref={password}
            />
            <br />
            <br />
            <Button
              className="button_style"
              variant="contained"
              color="primary"
              size="small"
              disabled={email == "" && password == ""}
              onClick={() => {
                console.log(email.current.value);
                login(email.current.value, password.current.value);
              }}
            >
              Login
            </Button>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/register">Register</Link>
          </div>
          <div id="signInButton">
            <GoogleLogin 
         client_id = {process.env.REACT_APP_CLIENT_ID}
         client_secret= {process.env.REACT_APP_CLIENT_SECRET}
         buttonText= "Login with Google"
         onSuccess= {onSuccess}
         onFailure= {onFailure}
         cookiePolicy= {'single_host_origin'}
         isSignedIn= {true}
         />
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
