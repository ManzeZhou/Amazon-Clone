
import {combineReducers} from "redux";
import {productReducer} from "./productReducer";
import addressReducer from "./addressReducer";

const rootReducer = combineReducers({
    productReducer,addressReducer
})

export default rootReducer;