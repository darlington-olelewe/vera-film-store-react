import style from "./FilmCard.module.css"

export const FilmCard=()=>{
    const props = {
        "title": "Godzilla and Kong",
        "id": 2,
        "year": 2024,
        "director": "Stephen Spillperg",
        "review": "Good scripts, engaging till the end",
        "stars": 5
    }
    return(
        <div className={style.container}>
            <div className={style.film_card}>
                <div>

                </div>
            </div>
        </div>

    )
}


