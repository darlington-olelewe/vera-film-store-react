import style from "./StickyHeader.module.css"
import {useDispatch,useSelector} from "react-redux";
import {filmConstants} from "../../_constants";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
const {
    SET_NAV,
    SET_CONTENT_TYPE,
    SET_SEARCH_TEXT,
} = filmConstants

export const StickyHeader =()=>{
    const dispatch = useDispatch();
    const data = useSelector(({filmState})=> filmState)
    const navOpen = data.isNavOpen;
    const searchText = data.searchText;
    const contentType = data.contentType


    const navigate = useNavigate();

    const toHome=()=>{
        navigate("/")
    }

    const toggleNav=(value:boolean)=>{
        dispatch({type:SET_NAV, payload: value})
    }


    const setSearchText=(value:string)=>{
        dispatch({type:SET_SEARCH_TEXT,payload:value})
    }

    const setContentType=(value:string)=>{
        dispatch({type:SET_CONTENT_TYPE,payload:value})
    }

    useEffect(()=>{
        toHome()
    },[searchText])



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
                                <ol className={style.ol} onClick={()=>navigate("/")} ><span className="material-symbols-outlined">home</span>Home
                                </ol>
                                <ol className={style.ol}><span className="material-symbols-outlined">person</span>Actors
                                </ol>
                                <ol className={style.ol} onClick={()=>navigate("/new")}><span className="material-symbols-outlined">add</span>New</ol>
                            </menu>
                        </div>

                    }

                </div>
                <div className={style.search_container}>

                    <span className="material-symbols-outlined search_icon">search</span>
                    <input
                        placeholder={`search film db`}
                        onChange={(e)=>setSearchText(e.target.value)}
                    />

                    <button> search
                </button>
            </div>
                <button onClick={()=>navigate("/new")}
                        style={{background:"#0174d8", padding: '13px 15px', color:"black", borderRadius: '6px', fontWeight: '500', border: 'none'}}>New Film</button>
                <button onClick={()=>navigate("/")}
                        style={{background:"#0174d8", padding: '13px 15px', color:"black", borderRadius: '6px', fontWeight: '500', border: 'none', marginLeft: '10px'}}>All Film</button>


                <select className={style.media_type} value={contentType} onChange={ e => setContentType(e.target.value)}>
                    <option value={'json'}>JSON</option>
                    <option value={'xml'}>XML</option>
                    <option value={'text'}>TEXT</option>
                </select>

            </div>
        </header>
    )
}
