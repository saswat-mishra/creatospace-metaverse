import React, { Component, useState } from 'react';
import swal from 'sweetalert2'
import { Button, TextField, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

const client_id = "215504042537-v5rsk5ss23ktuo28ipe0uq9lm6s01t1i.apps.googleusercontent.com";

function Login() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: '',
  //     password: ''
  //   };
  // }
  // let navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const axios = require('axios');
  // const bcrypt = require('bcryptjs');
  // var salt = bcrypt.genSaltSync(10);


  // const onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  const history = useNavigate();

  const login = () => {

    // const pwd = bcrypt.hashSync(password, salt);


    axios.post('http://localhost:2000/login', {
      username: username,
      password: password,
    }).then((res) => {

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      console.log(history, 'test1')
      history.push("/feed")
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
  const onSuccess = (res) => {
    console.log("Login Success. Current User: ", res.profileObj);
    login();
  }
  const onFailure = (res) => {
    console.log("Login Failed. res: ", res);
  }

  return (
    <div style={{ marginTop: '200px' }}>
      <div>
        <h2>Login</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="username"
          onChange={
            (e) => {
              setUsername(e.target.value)
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
          disabled={username == '' && password == ''}
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
         client_id = {client_id}
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
