import React, {useEffect, useState} from "react";
import logo from "../logo.svg";
import authService from "../services/authService";
import {useDispatch, useSelector} from "react-redux";
import {setDeviceName} from "../store/actions/accountActions";
import {initialiseChat, disconnectChat} from "../services/socketService";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import commonStyle from "../common/commonStyles";
import snpLogo from '../assets/snp-logo.png'
import colors from "../common/colors";
import Loading from "../common/loading";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        // backgroundImage: 'url(https://source.unsplash.com/random)',
        // backgroundRepeat: 'no-repeat',
        // backgroundColor:
        //     theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundColor: commonStyle.color3,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        margin: theme.spacing(5, 4),
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(6),
    },
    submit: {
        margin: theme.spacing(8, 0, 2),
    },
    logo: {
        margin: theme.spacing(8, 2, 2),
        backgroundImage: 'url(' + snpLogo + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        width: 220,
        height: 200,
    },
    sideInfo: {
        margin: theme.spacing(10, 2, 2),
        textAlign: 'center',
    }
}));

const DeviceSelScreen = () => {

    const dispatch = useDispatch();
    const account = useSelector(state => state.account);
    const classes = useStyles();

    const [deviceNameVal, setDeviceNameVal] = useState("")
    const [info, setInfo] = useState("")

    const handleDeviceNameChange = (e) => {
        const val = e.target.value;
        console.log(val)
        setDeviceNameVal(val);
    };

    useEffect(() => {
        // console.log(data.email)
        // console.log(data.password)
        // console.log(data)
    }, [deviceNameVal])

    const proceed = () => {
        setInfo('')
        console.log(deviceNameVal.length === 0)
        if (deviceNameVal.length === 0) setInfo("Please enter valid device name");
        else dispatch(setDeviceName(deviceNameVal));

        // const Store = window.require('@electron/remote').require('electron-store');
        // const store = new Store();
        const main = window.require('@electron/remote').require('./electron');
        const store = main.getStore();
        store.set('user_token', account.userToken);
        store.set('email', account.email);
        store.set('device_name', deviceNameVal);
        console.log('-----------------')
        console.log(account.deviceName)
    }

    const connect = () => {
        initialiseChat(dispatch, account);
    }

    return (
        <div className="App">
            <Grid container direction="row" justify="center" alignItems="center" style={{flexWrap: 'nowrap'}}>
                <Grid style={{backgroundColor: colors.color3, height: '100vh', width: '35vw', userSelect:'none'}} container
                      direction={'column'} alignItems={"center"} justify={'flex-start'}>
                    <Box style={{
                        backgroundImage: 'url(' + snpLogo + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        width: 220,
                        height: 200,
                        marginTop: 70,
                    }}/>
                    <Box style={{marginTop: 70, paddingLeft: 25, paddingRight: 25, textAlign:'center'}}>
                        <Typography>Tip: You can only set the device name at this page.<br/>
                            To rename this device, logout and login again.</Typography>
                    </Box>

                </Grid>
                <Grid
                    style={{backgroundColor: 'white', height: '100vh', width: '65vw', paddingTop: 40, paddingLeft: 50, userSelect:'none'}}
                    container
                    direction={'column'} alignItems={"flex-start"} justify={'flex-start'}>
                    <Typography variant="h3" style={{textAlign: "left"}}>Name this<br/>device</Typography>
                    <Typography style={{fontSize: 13, paddingTop: 80, paddingLeft: 1}}>DEVICE NAME</Typography>
                    <TextField
                        variant="outlined"
                        required
                        id="devicename"
                        // label="Email Address"
                        name="devicename"
                        autoComplete="devicename"
                        autoFocus
                        onChange={handleDeviceNameChange}
                        style={{width: 350}}
                    />
                    <Typography style={{
                        fontSize: 13,
                        paddingTop: 20,
                        paddingLeft: 1,
                        height: 20,
                        color: 'red'
                    }}>{info}</Typography>
                    <Button variant="contained" disableElevation={true}
                            style={{width: 130, height: 50, marginTop: 90}}
                            onClick={proceed}>PROCEED</Button>
                </Grid>
            </Grid>

        </div>
    )

}

export default DeviceSelScreen