import {LOGIN, LOGOUT, REGISTER, RETRIEVE_INFO, RETRIEVE_TOKEN, SET_DEVICE_NAME, SET_SAVE_LOCATION, SET_ALL_VALUES} from "./types";

export const retrieveToken = (userToken) => {
    return {
        type: RETRIEVE_TOKEN,
        token: userToken
    }
}
export const login = (email, userToken) => {
    return {
        type: LOGIN,
        email: email,
        token: userToken
    }
}
export const logout = () => {
    return {
        type: LOGOUT,
    }
}
export const retrieveInfo = (email, username) => {
    return {
        type: RETRIEVE_INFO,
        email: email,
        username: username,
    }
}
export const setDeviceName = (deviceName) => {
    return {
        type: SET_DEVICE_NAME,
        deviceName: deviceName,
    }
}
export const setSaveLocation = (saveLocation) => {
    return {
        type: SET_SAVE_LOCATION,
        saveLocation: saveLocation,
    }
}

export const setAllValues= (accountState)=>{
    return{
        type: SET_ALL_VALUES,
        account: accountState,
    }
}
