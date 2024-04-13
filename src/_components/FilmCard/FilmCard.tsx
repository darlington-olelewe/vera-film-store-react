import style from "./FilmCard.module.css"
import {star, starDark, play} from "../../_assets";
import {Film} from "../../_models/Film.ts";
export const FilmCard=({film}:{film:Film})=>{

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
            <div className={style.film_card}>
                <div className={style.video}>
                    <img src={play} className={style.img}/>
                </div>
                <div>
                    <p className={style.title_year}><span className={style.title}>{film.title}</span> <span
                        className={style.year}> - {film.year}</span></p>
                    <p className={style.director}>{film.director}</p>
                    <div className={style.star_holder}>
                        stars:
                        <span className={style.rating}>{getStars(film.stars).map((s, index) => <img
                            key={index} src={s} alt={"star icon"}/>)}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}


