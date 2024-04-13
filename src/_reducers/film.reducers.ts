import {filmConstants} from "../_constants";
import {InitialState} from "../_models/InitialState.ts";

const {
    FETCH_PAGINATED_FILMS,
    FETCHING_PAGINATED_FILMS,
    SET_NAV,
    SET_CONTENT_TYPE,
    SET_SEARCH

} = filmConstants

const initialState :InitialState = {
    fetchingPaginatedFilms:false,
    paginatedFilms: [],
    isNavOpen: false,
    search: 'director',
    contentType: 'json'
}

function filmReducer(state = initialState, action : {type:string, payload:any}){


    switch (action.type){
        case FETCHING_PAGINATED_FILMS:
            return {...state, fetchingPaginatedFilms: action.payload};
        case FETCH_PAGINATED_FILMS:
            return {...state, paginatedFilms: action.payload};
        case SET_NAV:
            return {...state, isNavOpen: action.payload}
        case SET_SEARCH:
            return {...state, search: action.payload}
        case SET_CONTENT_TYPE:
            return {...state, contentType: action.payload}
        default:
            return state
    }
}

export default filmReducer;