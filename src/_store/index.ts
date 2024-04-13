import {thunk} from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import rootReducer from "../_reducers";

const middleware = [thunk]

const configureStore = createStore(
    rootReducer,
    applyMiddleware(...middleware)

)

export default configureStore;