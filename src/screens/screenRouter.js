import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LoginScreen from "./loginScreen";
import DeviceSelScreen from "./deviceSelScreen";
import MainScreen from "./mainScreen";
import {setAllValues} from "../store/actions/accountActions";
import Loading from "../common/loading";

const ScreenRouter = () => {

    const dispatch = useDispatch();
    const account = useSelector(state => state.account);
    const [isLoading, setIsLoading]=useState(true);

    useEffect(() => {
        // const Store = window.require('@electron/remote').require('electron-store');
        // const store = new Store();
        const main = window.require('@electron/remote').require('./electron');
        const store = main.getStore();

        store.set('unicorn', '🦄');
        console.log(store.get('unicorn'));

        const accountState = {
            isLoading: true,
            userToken: store.get('user_token') === undefined ? null : store.get('user_token'),
            email: store.get('email') === undefined ? null : store.get('email'),
            username: store.get('user_name') === undefined ? null : store.get('user_name'),
            deviceName: store.get('device_name') === undefined ? null : store.get('device_name'),
            saveLocation: (store.get('save_location') === undefined)||store.get('save_location') === null ? '' : store.get('save_location'),
        };
        dispatch(setAllValues(accountState));
        setIsLoading(false);
    }, [])

    useEffect(() => {
        console.log(account);
    }, [account])

    if(isLoading)return <Loading/>

    // Logged in and set device name: Show Main Screen
    if (account.userToken !== null && account.email !== null && account.deviceName !== null)
        return (
            <MainScreen/>
        )

    // Logged in :Show Device Selection Screen
    else if (account.userToken !== null && account.email !== null)
        return (
            <DeviceSelScreen/>
        )

    // Not Logged in :Show Login Screen
    else
        return (
            <LoginScreen/>
        )

    return(<p>Hello 2</p>)


}


export default ScreenRouter