import {Route, Routes} from "react-router";
import {HomePage, NewFilmPage} from "../pages";

export const AppRoutes=()=>{

    return(
        <Routes>
            <Route path={"/"} element={<HomePage/>}/>
            <Route path={"new"} element={<NewFilmPage/>}/>
        </Routes>
    )
}