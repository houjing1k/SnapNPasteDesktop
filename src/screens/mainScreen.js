import React, {useEffect, useState} from "react";
import logo from "../logo.svg";
import authService from "../services/authService";
import {useDispatch, useSelector} from "react-redux";
import {logout, setDeviceName, setSaveLocation} from "../store/actions/accountActions";
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
import {FormControlLabel, FormGroup, Switch} from "@material-ui/core";
import {CheckBox} from "@material-ui/icons";


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

const MainScreen = () => {

    const dispatch = useDispatch();
    const account = useSelector(state => state.account);
    const classes = useStyles();

    const [saveLocationVal, setSaveLocationVal] = useState(null)
    const [autoStartup, setAutoStartup] = useState(false);

    const main = window.require('@electron/remote').require('./electron');
    const store = main.getStore();
    let AutoLaunch = window.require('auto-launch');

    let AutoLauncher = new AutoLaunch({
        name: 'Snap-N-Paste',
    });

    useEffect(() => {
        // initialiseChat(dispatch, account);
        checkAutoLauncher();
    }, [])

    useEffect(() => {
        if (account.deviceName != null && account.email != null) initialiseChat(dispatch, account);
    }, [account])

    useEffect(() => {
        // console.log(data.email)
        // console.log(data.password)
        // console.log(data)
    }, [saveLocationVal])

    const logoutAction = () => {
        console.log("Logout")
        disconnectChat();

        store.delete('user_token');
        store.delete('email');
        store.delete('device_name');
        store.delete('save_location');
        dispatch(logout());
    }

    const fileChooser = () => {
        const {dialog} = window.require('@electron/remote');
        dialog.showOpenDialog({properties: ['openDirectory']})
            .then(result => {
                console.log(result.canceled)
                console.log(result.filePaths)
                if (!result.canceled) {
                    dispatch(setSaveLocation(result.filePaths[0]))
                    store.set('save_location', result.filePaths[0]);
                }
            }).catch(err => {
            console.log(err)
        })
    }

    const handleSwitchChange = async (event) => {
        console.log(event.target.checked)
        const newState = event.target.checked
        setAutoStartup(newState);
        if (newState) AutoLauncher.enable();
        else {
            AutoLauncher.disable();
        }
    };

    const checkAutoLauncher = () => {
        AutoLauncher.isEnabled()
            .then(function (isEnabled) {
                console.log('AutoLauncher:')
                console.log(isEnabled)
                setAutoStartup(isEnabled)
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    useEffect(() => {
        // console.log('switch')
        // console.log(autoStartup)

    }, [autoStartup])

    const longstr = 'as@@$fghdjkgnvdjkvghdjkgdhjdfsdfsdfsdfsdfsdgfddfgdfgdfgfdgdfgdfgfdgdfgaaa@@@fddfgdfgdfgdfgdfgdfgdfgdfgdfgdfgvdfgdfgdfgdfgfggdfgdfggdgdgvkjvdkfg'

    return (
        <div className="App">
            <Grid container direction="row" justify="center" alignItems="center" style={{flexWrap: 'nowrap'}}>
                <Grid style={{backgroundColor: colors.color3, height: '100vh', width: '35vw', userSelect: 'none'}}
                      container
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
                    <Box style={{marginTop: 20, paddingLeft: 25, paddingRight: 25, textAlign: 'center'}}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={autoStartup}
                                    onChange={handleSwitchChange}
                                    name="checkedA"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                />
                            }
                            label="Launch on Startup"
                        />
                        {/*<button onClick={checkAutoLauncher}>Check</button>*/}
                    </Box>
                    <Box style={{marginTop: 40, paddingLeft: 25, paddingRight: 25, textAlign: 'center'}}>
                        <Typography>Minimize this application to the tray to leave it running in the
                            background</Typography>
                    </Box>
                    <Button variant="contained" disableElevation={true}
                            style={{width: 130, height: 50, marginTop: 50}}
                            onClick={logoutAction}>LOGOUT</Button>

                </Grid>
                <Grid
                    style={{
                        backgroundColor: 'white',
                        height: '100vh',
                        width: '65vw',
                        paddingTop: 40,
                        paddingLeft: 50,
                        userSelect: 'none'
                    }}
                    container
                    direction={'column'} alignItems={"flex-start"} justify={'flex-start'}>
                    <Typography variant="h3" style={{textAlign: "left"}}>You're Set!</Typography>
                    <Typography style={{fontSize: 13, paddingTop: 40, paddingLeft: 1}}>LOGGED IN AS</Typography>
                    <Typography style={{
                        fontSize: 30,
                        paddingTop: 0,
                        paddingLeft: 1,
                        wordWrap: "break-word"
                    }}>{account.email.substring(0, 25)}</Typography>
                    <Typography style={{
                        fontSize: 25,
                        paddingTop: 0,
                        paddingLeft: 1,
                        wordWrap: "break-word"
                    }}>{account.email.substring(26, 60)}</Typography>
                    <Typography style={{fontSize: 13, paddingTop: 40, paddingLeft: 1}}>DEVICE NAME</Typography>
                    <Typography style={{fontSize: 35, paddingTop: 0, paddingLeft: 1}}>{account.deviceName}</Typography>
                    <Typography style={{fontSize: 13, paddingTop: 30, paddingLeft: 1}}>SAVE LOCATION</Typography>
                    <Typography style={{
                        fontSize: 18,
                        paddingTop: 0,
                        paddingLeft: 1,
                        wordWrap: "break-word",
                        textAlign: 'start',
                    }}>{account.saveLocation === '' ? 'Please select default save location' : account.saveLocation.substring(0, 44)}</Typography>
                    <Typography style={{
                        fontSize: 18,
                        paddingTop: 0,
                        paddingLeft: 1,
                        wordWrap: "break-word",
                        textAlign: 'start',
                    }}>{account.saveLocation.substring(45, 89)}</Typography>
                    <Typography style={{
                        fontSize: 18,
                        paddingTop: 0,
                        paddingLeft: 1,
                        wordWrap: "break-word",
                        textAlign: 'start',
                    }}>{account.saveLocation.substring(90, 134)}</Typography>
                    <Typography style={{
                        fontSize: 18,
                        paddingTop: 0,
                        paddingLeft: 1,
                        wordWrap: "break-word",
                        textAlign: 'start',
                    }}>{account.saveLocation.charAt(135) !== '' ? '...' : ''}</Typography>
                    <Button variant="contained" disableElevation={true}
                            style={{width: 130, height: 50, marginTop: 20}}
                            onClick={fileChooser}>CHANGE</Button>
                </Grid>
            </Grid>
        </div>
    )

}

export default MainScreen