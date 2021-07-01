import React, {useEffect, useState} from "react";
import logo from "../logo.svg";
import authService from "../services/authService";
import {useDispatch, useSelector} from "react-redux";
import {setDeviceName} from "../store/actions/accountActions";
import {initialiseChat, disconnectChat} from "../services/socketService";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import commonStyle from "../common/commonStyles";
import {Image} from "@material-ui/icons";
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

const LoginScreen = () => {

    const dispatch = useDispatch();
    const account = useSelector(state => state.account);
    const classes = useStyles();

    const [isloading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
    })
    const [info, setInfo] = useState(" ")

    const handleEmailChange = (e) => {
        const val = e.target.value;
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
            })
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
            })
        }
    };
    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setData({
            ...data,
            password: val,
            check_textInputChange: true,
        })
    };


    const login = async () => {
        setIsLoading(true);
        console.log("login")
        setInfo(" ")
        const email = 'user@user.com'
        const password = '123'
        const res = await authService.signIn(data.email, data.password, dispatch)
        setIsLoading(false);
        console.log(res)
        if (res.type === "SUCCESS") {
            console.log("Success")
        }
        else{
            setInfo("Login Failed. Please check username or password.")
        }
    }

    return (
        isloading?<Loading/>:
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
                        <Typography>Welcome to Snap-N-Paste!<br/><br/>To get started, download the mobile app and
                            register for an account.</Typography>
                    </Box>

                </Grid>
                <Grid
                    style={{backgroundColor: 'white', height: '100vh', width: '65vw', paddingTop: 40, paddingLeft: 50, userSelect:'none'}}
                    container
                    direction={'column'} alignItems={"flex-start"} justify={'flex-start'}>
                    <Typography variant="h3" style={{textAlign: "left"}}>Log in your<br/>account</Typography>
                    <Typography style={{fontSize: 13, paddingTop: 40, paddingLeft: 1}}>EMAIL</Typography>
                    <TextField
                        variant="outlined"
                        required
                        id="email"
                        // label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmailChange}
                        style={{width: 350}}
                    />
                    <Typography style={{fontSize: 13, paddingTop: 40, paddingLeft: 1}}>PASSWORD</Typography>
                    <TextField
                        variant="outlined"
                        required
                        id="password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                        style={{width: 350}}
                    />
                    <Typography style={{fontSize: 13, paddingTop: 20, paddingLeft: 1, height:20, color: 'red'}}>{info}</Typography>
                    <Button variant="contained" disableElevation={true}
                            style={{width: 130, height: 50, marginTop: 40}}
                            onClick={login}>SIGN IN</Button>
                    {/*<Button variant="contained" disableElevation={true}*/}
                    {/*        style={{width: 130, height: 50, marginTop: 40}}*/}
                    {/*        onClick={test}>TEST</Button>*/}
                </Grid>
            </Grid>

        </div>
    )
}

export default LoginScreen