import {filmConstants} from "../_constants";

const {
    FETCH_PAGINATED_FILMS,
    FETCHING_PAGINATED_FILMS,
    SET_NAV,
    SET_CONTENT_TYPE

} = filmConstants

const initialState = {
    fetchingPaginatedFilms:false,
    paginatedFilms: [],
    isNavOpen: false,
}



function filmReducer(state = initialState, action : {type:string, payload:any}){


    switch (action.type){
        case FETCHING_PAGINATED_FILMS:
            return {...state, fetchingPaginatedFilms: action.payload};
        case FETCH_PAGINATED_FILMS:
            return {...state, paginatedFilms: action.payload};
        case SET_NAV:
            return {...state, isNavOpen: action.payload}
        default:
            return state
    }
}

export default filmReducer;