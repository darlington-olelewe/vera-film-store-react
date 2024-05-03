import {FilmCard, Loading, Paginate} from "../../_components";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filmActions} from "../../_actions";
import {Film} from "../../_models/Film.ts";
import {AppPage} from "../../_models";
import style from "./HomePage.module.css"

export const HomePage=()=>{
    const dispatch = useDispatch();
    const { fetchPaginatedFilms} = filmActions;

    const data = useSelector(({filmState})=> filmState)
    const isLoading = data.fetchingPaginatedFilms;
    const films : Film[]= data.paginatedFilms;
    const pageInfo : AppPage = data.filmPage;
    const text = data.searchText;
    const by = data.search;

    const query=(num: number = 1):string =>{
        return '?' +
        new URLSearchParams({
            pageNo: num.toString(),
            pageSize: pageInfo.pageSize.toString(),
            search_by: by,
            search_value: text

        }).toString()

    }

    const [cPage,setCPage]  = useState<number>(1)
    const timeoutRef = useRef<any>(null)


    useEffect(()=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            // @ts-ignore
            dispatch(fetchPaginatedFilms(query(cPage)))
        }, 500);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
        // @ts-ignore

    },[text])



    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchPaginatedFilms(query(cPage)))
    },[dispatch,cPage])



    if(isLoading){
        return <Loading/>
    }

    return (
        <div>
        <div className={style.films_container}>
            {films.map(film => <FilmCard
                key={film.id}
                film={film}
            />)}
        </div>
            <Paginate
                appPage={pageInfo}
                changePage={setCPage}
            />
        </div>
    )
}

export default HomePage;