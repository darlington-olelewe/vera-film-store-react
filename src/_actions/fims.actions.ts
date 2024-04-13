import {filmConstants} from "../_constants";
import {filmApi} from "../_helpers/filmApis.ts";
import {Film} from "../_models/Film.ts";
import {ApiResponse} from "../_models/ApiResponse.ts";
import { Dispatch } from 'redux';

const {
    FETCH_PAGINATED_FILMS,
    FETCHING_PAGINATED_FILMS
} = filmConstants

interface FetchPaginatedFilm{
    type: FetchPaginatedFilm,
    payload: Film[]
}
interface FetchingPaginatedFilm{
    type: string,
    payload: boolean | any
}
const fetchPaginatedFilms = ()=>{
    return  (dispatch: Dispatch )=> {
        dispatch({type:FETCHING_PAGINATED_FILMS, payload:true})
        filmApi
            .get('')
            .then(res => {
                if(res.status === 200){
                    const apiResponse: ApiResponse<Film> = res.data;
                    dispatch({type:FETCH_PAGINATED_FILMS, payload: apiResponse.data.records})
                    dispatch({type:FETCHING_PAGINATED_FILMS, payload:false})
                }else{
                    dispatch({type:FETCHING_PAGINATED_FILMS, payload:false})
                }
            })
            .catch(e=>{
                dispatch({type:FETCHING_PAGINATED_FILMS, payload:false})
            })

    }
 }

 const filmActions = {
    fetchPaginatedFilms
 }
 export default filmActions