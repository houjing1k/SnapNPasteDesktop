const {app, BrowserWindow, Menu, Tray, Notification} = require('electron')

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
require('@electron/remote/main').initialize();

const openDevTool = false;
let tray = null
let mainWindow;

const NOTIFICATION_TITLE = 'Snap-N-Paste'
const NOTIFICATION_BODY = 'Snap-N-Paste is running in the background'

function showNotification () {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: openDevTool ? 1200 : 800,
        height: 600,
        icon: path.join(__dirname, 'icon-256.png'),
        backgroundColor: 'white',
        title: 'Snap-N-Paste',
        frame: true,
        show: false,
        fullscreenable: false,
        resizable: false,
        transparent: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    })
    if (openDevTool) mainWindow.webContents.openDevTools()
    mainWindow.setMenu(null);
    mainWindow.loadURL(isDev ? 'http://localhost:3100' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()})
    mainWindow.on('minimize', function (event) {
        event.preventDefault();
        mainWindow.hide();
        showNotification();
    })
    mainWindow.on('close', function (event) {
        mainWindow = null;
    })
}

function createTray() {
    tray = new Tray(path.join(__dirname, 'icon-32.png'))
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Show App', click: () => mainWindow.show()},
        {label: 'Quit', click: () => app.quit()},
    ])
    tray.setToolTip('Snap-N-Paste is running')
    tray.setContextMenu(contextMenu)
    tray.on('click', event => toggleWindow())
}

function toggleWindow() {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
}

exports.pasteAction = () => {
    console.log('Yay');
    // let ks = require('node-key-sender');
    // ks.sendCombination(['control','v']).then(console.log('paste!!'))

    let robot = require("robotjs");
    // robot.typeString("Hello World");
    robot.keyTap('v', ['control']);
}

const Store = require('electron-store');
const store = new Store();
exports.getStore = () => {
    return store;
}


app.whenReady().then(() => {
    createWindow();
    createTray();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// app.on('activate', () => {
//     if (mainWindow === null) {
//         createWindow();
//     }
// });