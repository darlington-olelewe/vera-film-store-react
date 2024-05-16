import {AppPage, PaginationType} from "../../_models";
import style from "./Paginate.module.css"

import {
    back,
    backActive,
    forward,
    forwardActive,
    first,
    firstActive,
    last,
    lastActive
} from "../../_assets";

export const Paginate=({appPage, changePage}:{appPage: AppPage, changePage:(num:number)=>void})=>{


    const pageAlgo = (curr: number, total: number):PaginationType[] =>{
        const pageArr:PaginationType[] = []
        const start = curr - 2;

        const prev = {
            id: curr - 1,
            text: curr - 1 > 0 ? backActive : back,
            active: curr - 1 > 0,
            current: false,
        }

        const begin = {
            id: 1,
            text: curr > 1 ? firstActive : first,
            active: curr > 1,
            current: false,
        }

        const next = {
            id: curr + 1,
            text: curr + 1 <= total ? forwardActive : forward,
            active: curr + 1 <= total,
            current: false,
        }

        const end = {
            id: total,
            text: curr < total ? lastActive : last,
            active: curr < total,
            current: false,
        }
        pageArr.push(begin)
        pageArr.push(prev)
        for(let i = start; i <= curr + 2; i++){
            if(i <= 0){
                continue;
            }
            const pt:PaginationType = {
                id: i,
                text: i,
                active: (i >= curr && i <= total) || (curr > i),
                current: i === curr,
            }
            pageArr.push(pt)
        }

        pageArr.push(next);
        pageArr.push(end)


        return pageArr
    }
    const paginationArr: PaginationType[] = pageAlgo(appPage.currentPage, appPage.totalPage)



    return <div>
        <div className={style.container}>
            {paginationArr.map((p,index)=>(
                <Touch key={index} pin={p} cl={changePage}/>
            ))}
        </div>
    </div>
}

const Touch = ({pin,cl}:{pin:PaginationType, cl: (num:number)=>void})=>{

    return <div  onClick={()=>{
        if(pin.active && !pin.current){
            cl(pin.id)
        }
    }} className={pin.current ? style.current : pin.active ? style.active : style.in_active}>
        {typeof pin.text === 'number' ? pin.text : <img src={pin.text} alt={'pagination icon'}/> }
    </div>
}