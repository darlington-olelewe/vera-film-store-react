import {AppPage} from "./AppPage.ts";

export type ApiResponse <T> = {
    code: string,
    data: Data<T>
}

export type Data <T> = {
    records: T,
    appPage: AppPage
}