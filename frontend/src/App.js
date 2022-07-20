import { Routes, Route, Link } from "react-router-dom";
import Feed from "./Views/Feed";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Room from "./Views/Room";
import React from "react";
import RestrictedRoute from "./utils/RestrictedRoutes";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
const client_id =
  "215504042537-v5rsk5ss23ktuo28ipe0uq9lm6s01t1i.apps.googleusercontent.com";
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
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/feed"
          element={
            <RestrictedRoute>
              <Feed />
            </RestrictedRoute>
          }
        />

        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
