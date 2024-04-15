import style from "./Loading.module.css"
export const Loading=()=>{
    return <div className={style.loading}></div>
}

export const ButtonLoading=()=>{
    return <button className={style.btn_loading}><div className={style.bt_load}></div></button>
}
export default Loading