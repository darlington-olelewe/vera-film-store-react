import style from "./FilmCard.module.css"
import {star, starDark, video} from "../../_assets";
import {Button} from "../Button/Button.tsx";
export const FilmCard=()=>{
    const props = {
        "title": "The Shawshank Redemption",
        "id": 2,
        "year": 2024,
        "director": "Stephen Spillperg",
        "review": "Good scripts, engaging till the end",
        "stars": 3
    }

    const inLineStyle = {
        backgroundImage: `url(${video})`,
        backgroundSize: 'cover',
        height: "70%"
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
            <div className={style.film_card}>
                <div className={style.video}>
                    <img src={video} className={style.img}/>
                </div>
                <div>
                    <p className={style.title_year}><span className={style.title}>{props.title}</span> <span
                        className={style.year}> - {props.year}</span></p>
                    <p className={style.director}>{props.director}</p>
                    <div className={style.star_holder}>
                        stars:
                        <span className={style.rating}>{getStars(props.stars).map((s, index) => <img
                            key={index} src={s}/>)}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}


