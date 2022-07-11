import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import JoinForm from './JoinForm';

function Room() {

  const params = useParams();
  const room_id = params.id;
  const token = localStorage.getItem('token');
  console.log(params.id, token);
  
  return (
    <div>
      <JoinForm id={room_id}></JoinForm>
    </div>
  );
}

export default Room
