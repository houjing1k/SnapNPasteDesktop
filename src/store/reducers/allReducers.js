import accountReducer from "./accountReducer";
import {combineReducers} from "redux";

const allReducers = combineReducers({
    account: accountReducer,
})

export default allReducers;