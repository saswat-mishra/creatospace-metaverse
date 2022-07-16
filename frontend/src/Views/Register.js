import React, { Component, useState } from "react";
// import swal from 'sweetalert2';
import { Button, TextField, Link, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from 'react-google-login';
import useStore from "../store";

function Register() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const history = useNavigate();
  const register = useStore((state) => state.register);

  return (
    <div id="form-box" style={{ marginTop: "200px" }}>
      <Grid>
        <Grid></Grid>
        <Grid>
          <div>
            <h2>Register</h2>
          </div>

          <div>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="User Name"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="password"
              autoComplete="off"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="password"
              autoComplete="off"
              name="confirm_password"
              value={confirm_password}
              onChange={(e) => {
                setConfirm_password(e.target.value);
              }}
              placeholder="Confirm Password"
              required
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
                register(email, password);
              }}
            >
              Register
            </Button>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/">Login</Link>
          </div>
          <div id="signInButton">
            {/* <GoogleLogin 
         client_id = {process.env.REACT_APP_CLIENT_ID}
         client_secret= {process.env.REACT_APP_CLIENT_SECRET}
         buttonText= "Register with Google"
         onSuccess= {onSuccess}
         onFailure= {onFailure}
         cookiePolicy= {'single_host_origin'}
         isSignedIn= {true}
         /> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;
