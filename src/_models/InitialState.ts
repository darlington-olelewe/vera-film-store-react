import {Film} from "./Film.ts";
import {AppPage} from "./AppPage.ts";

export type InitialState = {
    fetchingPaginatedFilms:boolean,
    paginatedFilms: Film[],
    isNavOpen: boolean,
    search: 'year' | 'title' | 'review' | 'director',
    contentType: 'json'| 'xml' | 'text',
    filmPage: AppPage,
    creatingNewFilm:boolean,
    fetchingFilmById:boolean,
    fetchFilmById:Film | null,
    searchText:string,
    loading: false
}