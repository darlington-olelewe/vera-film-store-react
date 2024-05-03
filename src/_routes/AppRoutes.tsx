import {Route, Routes} from "react-router";
import {HomePage, NewFilmPage, SingleFilmPage} from "../pages";

export const AppRoutes=()=>{

    return(
        <Routes>
            <Route path={"/"} element={<HomePage/>}/>
            <Route path={"/new"} element={<NewFilmPage/>}/>
            <Route path={"/film/:id"} element={<SingleFilmPage/>}/>
        </Routes>
    )
}