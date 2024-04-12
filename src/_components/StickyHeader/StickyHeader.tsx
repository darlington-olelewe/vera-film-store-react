import style from "./StickyHeader.module.css"
import {logo} from "../../_assets"
import {useDispatch,useSelector} from "react-redux";
import {filmConstants} from "../../_constants";
const {
    SET_NAV,
    SET_CONTENT_TYPE,
    SET_SEARCH
} = filmConstants

export const StickyHeader =()=>{
    const dispatch = useDispatch();
    const data = useSelector(({filmState})=> filmState)
    const navOpen = data.isNavOpen;
    const search = data.search;
    const contentType = data.contentType

    const toggleNav=(value:boolean)=>{
        dispatch({type:SET_NAV, payload: value})
    }

    const setSearch=(value:string)=>{
        dispatch({type:SET_SEARCH,payload:value})
    }

    const setContentType=(value:string)=>{
        dispatch({type:SET_CONTENT_TYPE,payload:value})
    }


    return (
        <header className={style.sticky_header}>
            <div className={style.main_head}>
                <div style={{position:"relative"}}>
                    <span className="material-symbols-outlined icon" onClick={()=>toggleNav(true)}>menu</span>

                    {
                        navOpen &&
                        <div className={style.menu_holder}>
                            <div style={{display: "flex", justifyContent: "end"}}><span
                                className="material-symbols-outlined close-icon" onClick={()=>toggleNav(false)}>close</span></div>
                            <menu>
                                <ol className={style.ol}><span className="material-symbols-outlined">home</span>Home
                                </ol>
                                <ol className={style.ol}><span className="material-symbols-outlined">person</span>Actors
                                </ol>
                                <ol className={style.ol}><span className="material-symbols-outlined">add</span>New</ol>
                            </menu>
                        </div>

                    }


                </div>
                <img src={logo} alt={'vera film logo'} className={style.logo}/>
                <div className={style.search_container}>

                    <span className="material-symbols-outlined search_icon">search</span>
                    <input
                        placeholder={`Search film by ${search}`}
                    />

                    <select value={search} onChange={(e)=>setSearch(e.target.value)}>
                        <option value={'title'}>Title</option>
                        <option value={'director'}>Director</option>
                        <option value={'year'}>Year</option>
                        <option value={'review'}>Review</option>
                </select>
            </div>


                <select className={style.media_type} value={contentType} onChange={ e => setContentType(e.target.value)}>
                    <option value={'json'}>JSON</option>
                    <option value={'xml'}>XML</option>
                    <option value={'text'}>TEXT</option>
                </select>

            </div>
        </header>
    )
}
