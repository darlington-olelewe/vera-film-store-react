

import { combineReducers} from 'redux'
import filmReducer from "./film.reducers.ts";

const rootReducer = combineReducers({
    filmState: filmReducer,
})

export default rootReducer;