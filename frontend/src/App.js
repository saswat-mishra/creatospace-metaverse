

import { Routes, Route, Link } from 'react-router-dom'
// import Dashboard from './Dashboard'; './Dashboard'
import LoginButton from "./Login";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import Feed from './Feed';
import Login from './Login';
import Register from './Register';
import Room from './Room';
import React from 'react';
import './App.css';

const client_id = "215504042537-v5rsk5ss23ktuo28ipe0uq9lm6s01t1i.apps.googleusercontent.com";
function App() {
  useEffect(() => {
    function start(){
      gapi.auth2.init({
        client_id: client_id,
        scope: ""
      })
    };
    gapi.load('client: auth2',start);
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
      {/* <LoginButton/> */}
    </div>
  );
}

export default App;
