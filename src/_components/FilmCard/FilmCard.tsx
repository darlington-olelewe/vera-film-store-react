import style from "./FilmCard.module.css"
import {star, starDark, play} from "../../_assets";
import {Film} from "../../_models/Film.ts";
import {useNavigate} from "react-router";
export const FilmCard=({film}:{film:Film})=>{

    const navigate = useNavigate();

    const navigateToSinglePage=(id:number):void=>{
        navigate(`film/${id}`)
    }

    const getStars=(value:number)=>{
        const stars = [];
        for(let i = 0; i < value; i++){
            stars.push(star)
        }
        for(let i = value; i < 5; i++){
            stars.push(starDark)
        }
        return stars;
    }


    return(
        <div className={style.container}>
            <div className={style.film_card} onClick={()=>navigateToSinglePage(film.id)}>
                <div className={style.video}>
                    <img src={play} className={style.img}/>
                </div>
                <div className={style.down}>
                    <p className={style.title_year}><span className={style.title}>{film.title}</span> <span
                        className={style.year}> - {film.year}</span></p>
                    <p className={style.director}>{film.director}</p>
                    <div className={style.star_holder}>
                        stars:
                        <span className={style.rating}>{getStars(5).map((s, index) => <img
                            key={index} src={s} alt={"star icon"}/>)}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}


