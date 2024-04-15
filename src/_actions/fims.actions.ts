import {filmConstants} from "../_constants";
import {filmApi} from "../_helpers/filmApis.ts";
import {Film} from "../_models/Film.ts";
import {ApiResponse} from "../_models/ApiResponse.ts";
import { Dispatch } from 'redux';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useNavigate} from "react-router-dom";

const {
    FETCH_PAGINATED_FILMS,
    FETCHING_PAGINATED_FILMS,
    ALL_FILM_PAGINATION,
    CREATE_NEW_FILM,
    CREATING_NEW_FILM
} = filmConstants
const createNewFilm = (payload:Film, navigate:()=>void)=>{
    return (dispatch:Dispatch)=>{

        dispatch({type: CREATING_NEW_FILM,payload:true})
        filmApi
            .post("films",payload)
            .then(res=>{
                if(res.status === 201){
                    dispatch({type: CREATING_NEW_FILM,payload:false})
                    navigate()
                }
            })
            .catch(error=>{
                dispatch({type: CREATING_NEW_FILM,payload:false})
            })

    }
}
const fetchPaginatedFilms = (query:string)=>{
    return  (dispatch: Dispatch )=> {
        dispatch({type:FETCHING_PAGINATED_FILMS, payload:true})
        filmApi
            .get(`films${query}`)
            .then(res => {
                if(res.status === 200){
                    const apiResponse: ApiResponse<Film> = res.data;
                    dispatch({type:FETCH_PAGINATED_FILMS, payload: apiResponse.data.records})
                    dispatch({type:FETCHING_PAGINATED_FILMS, payload:false})
                    dispatch({type: ALL_FILM_PAGINATION, payload: apiResponse.data.appPage})
                }else{
                    dispatch({type:FETCHING_PAGINATED_FILMS, payload:false})
                }
            })
            .catch(e=>{
                console.log(e)
                dispatch({type:FETCHING_PAGINATED_FILMS, payload:false})
            })

    }
 }



 const filmActions = {
    fetchPaginatedFilms,
     createNewFilm
 }
 export default filmActions