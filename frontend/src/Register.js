import React, { Component, useState } from 'react';
// import swal from 'sweetalert2';
import { Button, TextField, Link, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
const axios = require('axios');

function Register() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: '',
  //     password: '',
  //     confirm_password: ''
  //   };
  // }
  // const swal = require('sweetalert2')
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_password] = useState('')

  const history = useNavigate();

  // const onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  const register = () => {
    console.log(email, password);

    axios.post('http://localhost:2000/register', {
      email: email,
      password: password,
    }).then((res) => {
      // new swal({
      //   text: res.data.title,
      //   icon: "success",
      //   type: "success"
      // });
      history('/');
    }).catch((err) => {
      console.log(err);
      // new swal({
      //   // text: err.response.data.errorMessage,
      //   text: err.message,
      //   // text: err,
      //   icon: "error",
      //   type: "error"
      // });
    });
  }
const onSuccess= (res)=>{
  axios.post('http://localhost:2000/register', {
      email: res.profileObj.email,
      password: "$10$1gaworEfgNoApDgHHWl2Kle4",
    }).then((res) => {
      // new swal({
      //   text: res.data.title,
      //   icon: "success",
      //   type: "success"
      // });
      history('/');
    }).catch((err) => {
      console.log(err);
      // new swal({
      //   // text: err.response.data.errorMessage,
      //   text: err.message,
      //   // text: err,
      //   icon: "error",
      //   type: "error"
      // });
    });
}
const onFailure = (res) => {
  console.log("Login Failed. res: ", res);
}
  return (
    <div id="form-box" style={{ marginTop: '200px' }}>
      <Grid>
        <Grid>

        </Grid>
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
              onChange={(e) => { setemail(e.target.value) }}
              placeholder="User Name"
              required
            />
            <br /><br />
            <TextField
              id="standard-basic"
              type="password"
              autoComplete="off"
              name="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              placeholder="Password"
              required
            />
            <br /><br />
            <TextField
              id="standard-basic"
              type="password"
              autoComplete="off"
              name="confirm_password"
              value={confirm_password}
              onChange={(e) => { setConfirm_password(e.target.value) }}
              placeholder="Confirm Password"
              required
            />
            <br /><br />
            <Button
              className="button_style"
              variant="contained"
              color="primary"
              size="small"
              disabled={email == '' && password == ''}
              onClick={register}
            >
              Register
            </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/">
              Login
            </Link>
          </div>
          <div id="signInButton">
        <GoogleLogin 
         client_id = {process.env.REACT_APP_CLIENT_ID}
         client_secret= {process.env.REACT_APP_CLIENT_SECRET}
         buttonText= "Register with Google"
         onSuccess= {onSuccess}
         onFailure= {onFailure}
         cookiePolicy= {'single_host_origin'}
         isSignedIn= {true}
         />
      </div>
        </Grid>
      </Grid>

    </div>
  );
}

export default Register;

