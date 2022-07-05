import React, { Component, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoinForm from './JoinForm';
import swal from 'sweetalert2';

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
