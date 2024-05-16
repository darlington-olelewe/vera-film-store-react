import {filmConstants} from "../_constants";
import {filmApi} from "../_helpers/filmApis";
import {Film} from "../_models";
import { Dispatch } from 'redux';

import convert from "xml-js"

const {
    FETCH_PAGINATED_FILMS,
    FETCHING_PAGINATED_FILMS,
    ALL_FILM_PAGINATION,
    CREATING_NEW_FILM,
    FETCH_FILM_BY_ID,
    FETCHING_FILM_BY_ID
} = filmConstants

type ContentType = 'json' | 'xml' | 'text'
const createNewFilm = (contentType: ContentType, payload:Film, navigate:()=>void)=>{
    return (dispatch:Dispatch)=>{

        dispatch({type: CREATING_NEW_FILM,payload:true})
        filmApi
            .post("films",payload, contentType)
            .then(res=>{
                if(res.status === 200){
                    dispatch({type: CREATING_NEW_FILM,payload:false})
                    navigate()
                }
            })
            .catch(()=>{
                dispatch({type: CREATING_NEW_FILM,payload:false})
            })

    }
}

const fetchSingleFilmById=(contentType:ContentType,id:string)=>{
    return  (dispatch: Dispatch )=> {
        dispatch({type:FETCHING_FILM_BY_ID, payload:true})
        dispatch({type:FETCH_FILM_BY_ID, payload:null})
        filmApi
            .get(`films?id=${id}`, contentType)
            .then(res => {
                if(res.status === 200){

                    let apiResponse: Film  = res.data;
                    if(contentType === 'xml'){
                        const xmlData = res.data;
                        const parsedData = convert.xml2json(xmlData, { compact: true, spaces: 2 });
                        const parsedJson = JSON.parse(parsedData);
                        const filmData = parsedJson.Film;
                        apiResponse = {
                            id: parseInt(filmData.id._text),
                            title: filmData.title._text,
                            director: filmData.director._text,
                            review: filmData.review._text,
                            stars: filmData.stars._text,
                            year: parseInt(filmData.year._text)
                        };
                    }else {
                        apiResponse = res.data;
                    }

                    dispatch({type:FETCHING_FILM_BY_ID, payload:false})
                    dispatch({type:FETCH_FILM_BY_ID, payload:apiResponse})
                }else{
                    dispatch({type:FETCHING_PAGINATED_FILMS, payload:false})
                }
            })
            .catch(()=>{
                dispatch({type:FETCHING_FILM_BY_ID, payload:false})
            })

    }

}
const fetchPaginatedFilms = (contentType:ContentType, query:string)=>{
    return  (dispatch: Dispatch )=> {
        dispatch({type:FETCHING_PAGINATED_FILMS, payload:true})
        filmApi
            .get(`films${query}`, contentType)
            .then(res => {
                if(res.status === 200){
                    const apiResponse = res.data;

                    let filmsArray = []

                    if(contentType === 'xml'){

                        const xmlData = res.data;
                        const parsedData = convert.xml2json(xmlData, { compact: true, spaces: 2 });
                        const parsedJson = JSON.parse(parsedData);
                       filmsArray = [];

                        if (Array.isArray(parsedJson.Films.Film)) {
                            // Handle the case where multiple films are under the 'Film' tag
                            filmsArray = parsedJson.Films.Film.map((film: any) => ({
                                id: parseInt(film.id._text),
                                title: film.title._text,
                                director: film.director._text,
                                review: film.review._text,
                                stars: film.stars._text,
                                year: parseInt(film.year._text)
                            }));
                        } else {
                            // Handle the case where there's only one film under the 'Film' tag
                            const filmData = parsedJson.Films.Film;
                            filmsArray.push({
                                id: parseInt(filmData.id._text),
                                title: filmData.title._text,
                                director: filmData.director._text,
                                review: filmData.review._text,
                                stars: filmData.stars._text,
                                year: parseInt(filmData.year._text)
                            });
                        }

                        dispatch({type:FETCH_PAGINATED_FILMS, payload: filmsArray})
                        dispatch({type: FETCHING_PAGINATED_FILMS, payload: false})
                        const pageN = parseInt(parsedJson.Films.pageNo._text || '1');
                        const pageSiz = parseInt(parsedJson.Films.pageSize._text || '0');
                        const totalPag = parseInt(parsedJson.Films.totalPage._text || '0');


                        const appPag = {
                            currentPage: pageN,
                            pageSize: pageSiz,
                            pageNo: pageN,
                            totalRecords: totalPag,
                            totalPage: totalPag
                        }
                        dispatch({type: ALL_FILM_PAGINATION, payload: appPag})
                    }else {


                        dispatch({type: FETCH_PAGINATED_FILMS, payload: apiResponse.films})
                        dispatch({type: FETCHING_PAGINATED_FILMS, payload: false})
                        const appPage = {
                            currentPage: apiResponse.pageNo,
                            pageSize: apiResponse.pageSize,
                            pageNo: apiResponse.pageNo,
                            totalRecords: apiResponse.totalPage,
                            totalPage: apiResponse.totalPage
                        }
                        dispatch({type: ALL_FILM_PAGINATION, payload: appPage})
                    }
                }else{
                    dispatch({type:FETCHING_PAGINATED_FILMS, payload:false})
                }
            })
            .catch(()=>{
                dispatch({type:FETCHING_PAGINATED_FILMS, payload:false})
            })

    }
 }

const deleteFilmById = (id:string, toHome)=>{
    return  (dispatch: Dispatch )=> {

        filmApi
            .delete(`films?id=${id}`)
            .then(res => {
                if(res.status === 200){
                   toHome()
                }
            })
            .catch(()=>{
                dispatch({type:"LOADING",payload:true})
            })

    }
}

const editFilmById = (contentType:ContentType, id:string | number, payload:Film)=>{
    return  (dispatch: Dispatch )=> {
        dispatch({type:FETCHING_PAGINATED_FILMS, payload:true})
        filmApi
            .put(`films?id=${id}`,payload, contentType)
            .then(res => {
                if(res.status === 200){
                    //anything
                }else{
                    dispatch({type:FETCHING_PAGINATED_FILMS, payload:false})
                }
            })
            .catch(()=>{
                dispatch({type:FETCHING_PAGINATED_FILMS, payload:false})
            })

    }
}





 const filmActions = {
    fetchPaginatedFilms,
     createNewFilm,
     fetchSingleFilmById,
     editFilmById,
     deleteFilmById
 }
 export default filmActions