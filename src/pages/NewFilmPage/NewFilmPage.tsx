import React, {FormEvent, useState} from "react";
import {Film} from "../../_models";
import {filmActions} from "../../_actions";
import style from "./NewFilmPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {ButtonLoading} from "../../_components";
import {useNavigate} from "react-router-dom";

export const NewFilmPage=()=>{

    const dispatch = useDispatch();
    const { createNewFilm} = filmActions;
    const data = useSelector(({filmState})=> filmState)
    const isLoading = data.creatingNewFilm;

    const [film, setFilm] = useState<Film>({
        id:null,
        title: '',
        review: '',
        director: '',
        year: 2024,
        stars: 1
    })

    const navigate = useNavigate();
    const justNavigate=()=>{
        navigate("/")
    }
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;
        setFilm(prev => {
            return {
                ...prev,
                [name]: value
            }
        })



    }

    const years=():{value}[] => {
        const years:{value:number}[] = []
        for(let i = 2024; i >= 1970; i--){
            years.push({value:i})
        }
        return years
    }

    const justSubmit=(e:React.SyntheticEvent):void=>{
        e.preventDefault()
        dispatch(createNewFilm(film, justNavigate))
        // Argument dispatch is not assignable to parameter type unkown action REACT Typescript

    }

    return (
        <div>

            <form className={style.form} onSubmit={justSubmit} method={"POST"}>

                <h3 className={style.h3}>Add film record</h3>

                <div >
                    <label className={style.label}>Title</label>
                    <input name={"title"}
                           value={film.title}
                           onChange={handleChange}
                           placeholder={"Enter film title"}
                           className={style.input}
                    />
                </div>
                <div>
                    <label className={style.label}>Director</label>
                    <input name={"director"}
                           value={film.director}
                           onChange={handleChange}
                           placeholder={"Enter film director"}
                           className={style.input}
                    />
                </div>

                <div className={style.flex}>
                    <div style={{width:"50%"}}>
                        <label className={style.label}>Stars</label>
                        <div>
                            <select value={film.stars} onChange={handleChange} name={"stars"} className={style.input}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                    </div>
                    <div style={{width:"50%"}}>
                        <label className={style.label}>Year</label>

                        <select
                            onChange={handleChange}
                            name={"year"}
                            value={film.year}
                            className={style.input}>
                            {
                                years()
                                    .map((y) =>
                                        (<option
                                            key={y.value}
                                            value={y.value}>
                                            {`${y.value}`}
                                        </option>))
                            }
                        </select>

                    </div>

                </div>

                <div>
                    <label className={style.label}>Review</label>
                    <textarea name={"review"}
                              value={film.review}
                              onChange={handleChange}
                              placeholder={"Enter your personal review"}
                              cols={25}
                              rows={7}
                              className={style.input}
                    />
                </div>

                {isLoading && <ButtonLoading/>}
                {!isLoading &&
                    <button type={"submit"} className={style.btn}>Add To Records</button>
                }
            </form>
        </div>
    )
}