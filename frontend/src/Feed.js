import { Grid } from '@mui/material';
import React, { useState } from 'react';
import Profilecard from './components/Profilecard'

function Feed() {
    const users = [];

    return (
        <div>
            <Grid container spacing={12}>
                <Grid md={12} >
                    <Profilecard></Profilecard>
                </Grid>
                <Grid md={12} >
                    <Profilecard></Profilecard>
                </Grid>
            </Grid>

        </div>
    );
}

export default Feed;