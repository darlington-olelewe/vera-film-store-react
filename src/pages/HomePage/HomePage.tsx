import {FilmCard, Loading, Paginate} from "../../_components";
import {useEffect, useState} from "react";
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

    const query=(num: number = 1, searchBy: string = 'title', searchValue: string = ''):string =>{
        return '?' +
        new URLSearchParams({
            pageNo: num.toString(),
            pageSize: pageInfo.pageSize.toString(),
            search_by: searchBy,
            search_value: searchValue

        }).toString()

    }

    const [cPage,setCPage]  = useState<number>(1)

    console.table(films)
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