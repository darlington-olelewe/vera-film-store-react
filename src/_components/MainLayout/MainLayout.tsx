import {ReactNode} from "react";
import style from "./MainLayout.module.css"


export const MainLayout =(props:{children:ReactNode})=>{

    return (
        <div className={style.main_layout}>
            {props.children}
        </div>
    );
}

export default MainLayout;