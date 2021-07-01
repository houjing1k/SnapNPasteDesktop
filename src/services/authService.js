import React from "react";
import axios from "axios";
import {login} from "../store/actions/accountActions";

const BYTEUS_URL = 'http://byteus.me:8000'

const URL = {
    login: BYTEUS_URL + '/auth/jwt/login',
    register: BYTEUS_URL + '/auth/register',
    forgot_password: BYTEUS_URL + '/auth/forgot-password',
    reset_password: BYTEUS_URL + '/auth/reset-password',
    request_verify_token: BYTEUS_URL + '/auth/request-verify-token',
    verify: BYTEUS_URL + '/auth/verify',
    me: BYTEUS_URL + '/users/me',
    refresh_token: BYTEUS_URL + 'auth/jwt/refresh',
}

const authService = {
    signIn: async (email, password, dispatch) => {
        // let formData = {username: email, password: password};
        // console.log(encodeFormData(formData))
        // try {
        //     const res = await fetch(URL.login, {
        //         method: 'POST',
        //         mode: 'no-cors',
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //             'accept': 'application/json',
        //             "Access-Control-Allow-Origin": "*"
        //         },
        //         body: encodeFormData(formData)
        //     })
        //     console.log('success')
        //     console.log(res)
        //     return(true);
        // } catch (e) {
        //     console.log('failed')
        //     return false;
        // }

        // fetch(URL.login, {
        //     method: 'POST',
        //     // mode: 'no-cors',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'accept': 'application/json',
        //         "Access-Control-Allow-Origin": "*",
        //     },
        //     body: encodeFormData(formData)
        // })
        //     .then(response => {
        //         console.log("res")
        //         console.log(response)
        //         console.log(response)
        //         if(response.status===200)
        //         {
        //             console.log('Success')
        //             dispatch(login(email, "123"))
        //         }
        //         else
        //         {
        //             console.log("invalid credentials")
        //         }
        //
        //         // return true;
        //     })
        //     .catch(error => {
        //             console.log(error)
        //             console.log('Error logging in')
        //         }
        //     )
        // return false


let userToken = null;
const formData = new FormData();
formData.append('username', email);
formData.append('password', password);
try {
    let response = await axios.post(URL.login, formData,
        {headers: {'Content-Type': 'multipart/form-data', "Access-Control-Allow-Origin": "*"}});
    // console.log(response);
    try {
        let data = response.data;
        // console.log('/////////data//////////')
        // console.log(data);
        userToken = data.access_token;
        // console.log(userToken);
        dispatch(login(email, userToken))
        return {
            type: 'SUCCESS',
            data: userToken
        }
    } catch (e) {
        console.log(e);
        return {
            type: 'ERROR',
            data: null
        }
    }
} catch (e) {
    console.log(e);
    return {
        type: 'INVALID_CREDENTIAL',
        data: null
    }
}


    },
// getProfile: async (userToken) => {
//     const TOKEN = userToken;
//     try {
//         const response = await axios.get(
//             URL.me, {
//                 headers: {
//                     'Authorization': `Bearer ${TOKEN}`,
//                 },
//             });
//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }
// },
}

const postMultipart = (url, formData, userToken) => {
    // console.log("token: "+ userToken);
    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userToken}`,
        },
    };

    return fetch(url, options);
}

const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

export default authService;