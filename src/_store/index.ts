import {createStore} from "redux";
import rootReducer from "../_reducers";


const configureStore = createStore(
    rootReducer,

)

export default configureStore;