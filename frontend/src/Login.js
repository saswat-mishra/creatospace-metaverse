import React, { Component, useState } from 'react';
// import swal from 'sweetalert2'
import { Button, TextField, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from 'react-google-login';
import './Login.css';
const axios = require('axios');
function Login() {

  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  // const bcrypt = require('bcryptjs');
  // var salt = bcrypt.genSaltSync(10);


  // const onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  const history = useNavigate();

  const login = () => {

    // const pwd = bcrypt.hashSync(password, salt);


    axios.post('http://localhost:2000/login', {
      email: email,
      password: password,
    }).then((res) => {

      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('user_id', res.data.data.uid);
      console.log(res);
      history("/feed")
      // console.log(history, 'test2')
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        // new swal({
        //   text: err.response.data.errorMessage,
        //   icon: "error",
        //   type: "error"
        // });
      }
    });
  }
  const onSuccess = (res) => {
    console.log("Login Success. Current User: ", res.profileObj.name);
    axios.post('http://localhost:2000/login', {
      email: res.profileObj.email,
      password: "$10$1gaworEfgNoApDgHHWl2Kle4",
    }).then((res) => {

      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('user_id', res.data.data.uid);
      console.log(res);
      history("/feed")
      // console.log(history, 'test2')
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        // new swal({
        //   text: err.response.data.errorMessage,
        //   icon: "error",
        //   type: "error"
        // });
      }
    });
  }
  const onFailure = (res) => {
    console.log("Login Failed. res: ", res);
  }

  return (
    <div id="form-box" style={{ marginTop: '200px' }}>
      <div>
        <h2>Login</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="email"
          onChange={
            (e) => {
              setemail(e.target.value)
            }}
          placeholder="User Name"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="password"
          onChange={
            (e) => {
              setPassword(e.target.value)
            }}
          placeholder="Password"
          required
        />
        <br /><br />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={email == '' && password == ''}
          onClick={login}
        >
          Login
        </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/register">
          Register
        </Link>
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
  );
}

export default Login;
