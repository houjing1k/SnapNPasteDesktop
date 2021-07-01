// import {useDispatch} from "react-redux";
// import {useSelector} from "react-redux";
// import {INITIALISE, SELECT_DEVICE, UPDATE_DEVICE_LIST} from "./types";
import {store} from '../App'

const BYTEUS_URL = 'http://byteus.me:8000'
const wsURL = BYTEUS_URL + '/ws';
const io = require('socket.io-client')

const {clipboard, Notification} = window.require('@electron/remote');

let socket = null;


export const initialiseChat = async (dispatch) => {

    const account = store.getState().account;
    // Initialise Socket IO
    console.log('CHAT INITIALISE')
    console.log(account)
    const user = account.email;
    const deviceName = account.deviceName;

    if (socket !== null) {
        console.log('Socket already initialised')
        return;
    }

    socket = io(wsURL, {
        path: "/ws/socket.io",
        // withCredentials: true,
        // transports: ["websocket"],
        extraHeaders: {
            "USERNAME": user,
            "DEVICENAME": deviceName,
            "ISPHONE": "false"
        }
    },);

    // dispatch({type: INITIALISE, user: user, device: deviceName})

    // Get Online Devices
    socket.on('sendtext', (data) => {
        console.log('received....')
        // console.log(data);
        pasteData(data);
    });

    const pasteData = (data) => {
        const account = store.getState().account;
        const saveLocation = account.saveLocation;
        console.log(saveLocation);
        const main = window.require('@electron/remote').require('./electron');
        const fs = window.require('fs');
        const path = window.require('path');
        // console.log(data);

        // Data is Image
        let imageBuffer = decodeBase64Image(data);
        if (imageBuffer != null) {
            console.log('Image!')
            console.log(imageBuffer);

            const mode = imageBuffer.mode.split('/')
            console.log(mode)
            if (mode[1] === 'paste') {
                fs.writeFile('temp.jpg', imageBuffer.data, function (err) {
                    clipboard.writeImage('temp.jpg');
                    main.pasteAction();
                    console.log('Image pasted!')
                    showNotification("Image Pasted!")
                });
            }
            if (mode[1] === 'save') {
                const dir = path.join(saveLocation, (mode[2] + '.jpg'))
                // console.log(dir);
                fs.writeFile(dir, imageBuffer.data, function (err) {
                    console.log('Image saved to ' + dir);
                    showNotification("Image saved to "+dir);
                });
            }
        }

        // Data is Text
        else {
            clipboard.writeText(data);
            console.log("Copied!")
            main.pasteAction();
            console.log("Text Pasted!")
            showNotification("Text Pasted!")
        }
    }

    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^mode:([A-Za-z0-9-+\/]+);data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches == null) return null;
        if (matches.length !== 4) {
            return null;
        }
        // console.log('matches[0]')
        // console.log(matches[0])
        // console.log('matches[1]')
        // console.log(matches[1])
        // console.log('matches[2]')
        // console.log(matches[2])

        response.mode = matches[1];
        response.type = matches[2];
        response.data = new Buffer(matches[3], 'base64');

        return response;
    }

};

export const disconnectChat = () => {
    if (socket !== null) socket.disconnect();
    socket = null;
}


function showNotification (NOTIFICATION_BODY) {
    const NOTIFICATION_TITLE = 'Snap-N-Paste'
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}