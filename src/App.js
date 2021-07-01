import React, {useState} from "react";
// import logo from './logo.svg';
// import './App.css';
import authService from "./services/authService";
import allReducers from "./store/reducers/allReducers";
import {createStore} from "redux";
import {Provider, useDispatch, useSelector} from "react-redux";
import LoginScreen from "./screens/loginScreen";
import ScreenRouter from "./screens/screenRouter";

// const electron = require('electron');
// const remote = electron.remote
// const {BrowserWindow} = require('electron')

const fs = window.require('fs');
const pathModule = window.require('fs');
export const store = createStore(allReducers);
const {app} = window.require('@electron/remote');

function App() {



  const [path, setPath]=useState(app.getAppPath())

  console.log('asdasdadas');
  console.log(path);


  return (
      <Provider store={store}>
        <div>
            {/*<p>Hello</p>*/}
          <ScreenRouter/>
        </div>
      </Provider>
  );
}

export default App;
// export store;