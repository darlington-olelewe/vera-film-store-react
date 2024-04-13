import {FilmCard} from "../../_components";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filmActions} from "../../_actions";


export const HomePage=()=>{
    const dispatch = useDispatch();
    const { fetchPaginatedFilms} = filmActions;

    const data = useSelector(({filmState})=> filmState)
    const isLoading = data.fetchingPaginatedFilms;
    const films = data.paginatedFilms;
    useEffect(()=>{
        dispatch(fetchPaginatedFilms())
    },[dispatch])

    return (
        <div style={{display: 'flex', flexWrap: "wrap"}}>
            <FilmCard/>
            <FilmCard/>
            <FilmCard/>
            <FilmCard/>
            <FilmCard/>
            <FilmCard/>
            <FilmCard/>
            <FilmCard/>
            <FilmCard/>
        </div>
    )
}

export default HomePage;