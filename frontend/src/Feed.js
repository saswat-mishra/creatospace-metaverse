import { Grid } from '@mui/material';
import React, { useState } from 'react';
import Profilecard from './components/Profilecard';
import './Feed.css'
const axios = require('axios');

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));


function Feed() {
    var [rooms, setRooms] = useState([]);
    const token = localStorage.getItem('token');
    // var roomlist = [];
    axios.get('http://localhost:2000/all-rooms', {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'token': token
        }
      }
    ).then((res) => {
        setRooms(res.data.data);
        // console.log(rooms)
    }).catch((err) => {
        if (err.response && err.response.data && err.response.data.errorMessage) {
            console.log(err);
        }
    });
    

    return (
        <div>
            <Grid container spacing={12}>
                <Grid item md={6}>
                    <div className='heading'>
                    <h1>Join your favourite events here!</h1>
                    </div>
                </Grid>
                {rooms.map((e) => (
                    <Grid item md={12} >
                        <Profilecard name={e.name} desc={e.desc} price={e.price}></Profilecard>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
}

export default Feed;