import {Film} from "./Film.ts";

export type InitialState = {
    fetchingPaginatedFilms:boolean,
    paginatedFilms: Film[],
    isNavOpen: boolean,
    search: 'year' | 'title' | 'review' | 'director',
    contentType: 'json'| 'xml' | 'text'
}