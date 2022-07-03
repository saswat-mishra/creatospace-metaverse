import { Grid, Paper, styled } from '@mui/material';
import React, { useState } from 'react';
import Profilecard from './components/Profilecard';
import './Feed.css'

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));


function Feed() {
    const users = [];

    return (
        <div>
            <Grid container spacing={12}>
                <Grid item md={6}>
                    <div class='heading'>
                    <h1>Join your favourite events here!</h1>
                    </div>
                </Grid>
                <Grid item md={12} >
                    {/* <Item> */}
                        <Profilecard></Profilecard>
                    {/* </Item> */}
                </Grid>
                <Grid item md={12} >
                    {/* <Item> */}
                        <Profilecard></Profilecard>
                    {/* </Item> */}
                </Grid>
            </Grid>

        </div>
    );
}

export default Feed;