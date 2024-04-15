import {filmConstants} from "../_constants";
import {InitialState} from "../_models/InitialState.ts";
import {s} from "vite/dist/node/types.d-aGj9QkWt";

const {
    FETCH_PAGINATED_FILMS,
    FETCHING_PAGINATED_FILMS,
    SET_NAV,
    SET_CONTENT_TYPE,
    SET_SEARCH,
    ALL_FILM_PAGINATION,
    CREATING_NEW_FILM

} = filmConstants

const initialState :InitialState = {
    fetchingPaginatedFilms:false,
    paginatedFilms: [],
    filmPage: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 10,
        totalRecords: 10
    },
    isNavOpen: false,
    search: 'director',
    contentType: 'json',
    creatingNewFilm: false
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
        case ALL_FILM_PAGINATION:
            return {...state, filmPage: action.payload}
        case CREATING_NEW_FILM:
            return {...state, creatingNewFilm: action.payload}
        default:
            return state
    }
}

export default filmReducer;