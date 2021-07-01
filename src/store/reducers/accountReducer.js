import {
    LOGIN,
    LOGOUT,
    RETRIEVE_INFO,
    RETRIEVE_TOKEN, SET_ALL_VALUES,
    SET_DEVICE_NAME,
    SET_SAVE_LOCATION
} from "../actions/types";

const initialLoginState = {
    isLoading: true,
    userToken: null,
    email: null,
    username: null,
    deviceName: null,
    saveLocation: '',
};

const accountReducer = (loginState = initialLoginState, action) => {
    switch (action.type) {
        case RETRIEVE_TOKEN:
            return {
                ...loginState,
                userToken: action.token,
                isLoading: false
            };
        case LOGIN:
            return {
                ...loginState,
                email: action.email,
                username: action.username,
                userToken: action.token,
                isLoading: false
            };
        case LOGOUT:
            return {
                ...loginState,
                email: null,
                userToken: null,
                username: null,
                deviceName: null,
                saveLocation: '',
                isLoading: false
            };
        case RETRIEVE_INFO:
            return {
                ...loginState,
                email: action.email,
                username: action.username,
                isLoading: false
            };
        case SET_DEVICE_NAME:
            return {
                ...loginState,
                deviceName: action.deviceName,
            }
        case SET_SAVE_LOCATION:
            return {
                ...loginState,
                saveLocation: action.saveLocation,
            }
        case SET_ALL_VALUES:
            return {
                ...loginState,
                userToken: action.account.userToken,
                email: action.account.email,
                username: action.account.username,
                deviceName: action.account.deviceName,
                saveLocation: action.account.saveLocation,
            }
        default:
            return loginState
    }
};

export default accountReducer;