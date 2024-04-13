import {FilmCard, Loading} from "../../_components";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filmActions} from "../../_actions";
import {Film} from "../../_models/Film.ts";


export const HomePage=()=>{
    const dispatch = useDispatch();
    const { fetchPaginatedFilms} = filmActions;

    const data = useSelector(({filmState})=> filmState)
    const isLoading = data.fetchingPaginatedFilms;
    const films : Film[]= data.paginatedFilms;
    console.table(films)
    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchPaginatedFilms())
    },[dispatch])

    if(isLoading){
        return <Loading/>
    }

    return (
        <div style={{display: 'flex', flexWrap: "wrap"}}>
            {films.map(film => <FilmCard
                key={film.id}
                film={film}
            />)}
        </div>
    )
}

export default HomePage;