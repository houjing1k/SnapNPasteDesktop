import React from "react";
import {CircularProgress, Grid, Typography} from "@material-ui/core";

const Loading = ({text}) => {
    return (
        <Grid container direction="column" justify="center" alignItems="center" style={{backgroundColor: 'white', width: '100vw', height: '100vh'}}>
            <CircularProgress/>
            <Typography style={{marginTop: 15, fontSize: 25}}>Loading</Typography>
        </Grid>
    );
}

export default Loading