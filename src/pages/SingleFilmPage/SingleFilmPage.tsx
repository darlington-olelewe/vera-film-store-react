import style from "./SingleFilmPage.module.css"
import React, {FormEvent, useEffect, useState} from "react";
import {Film} from "../../_models";
import {filmActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {ButtonLoading} from "../../_components";
import {useNavigate, useParams} from "react-router-dom";

export const SingleFilmPage=()=>{

    const {id} = useParams();
    console.log(id)

    const dispatch = useDispatch();
    const { createNewFilm, fetchSingleFilmById} = filmActions;
    const data = useSelector(({filmState})=> filmState)

    const isLoading = data.fetchingFilmById;
    const filmSelected = data.fetchFilmById;

    const [film, setFilm] = useState<Film | null>(filmSelected)

    const [loads, setLoads] = useState({editing:false, mode:'view'})

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

    useEffect(()=>{
        dispatch(fetchSingleFilmById(id))
    },[])

    useEffect(()=>{
        setFilm(filmSelected)
    },[filmSelected])
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

            {filmSelected &&

                <form className={style.form} onSubmit={justSubmit} method={"POST"}>
                    {loads.mode === 'view' &&
                        <h3 className={style.h3}>View Film Details</h3>
                    }
                    {loads.mode === 'edit' &&
                        <h3 className={style.h3}>Edit Film Details</h3>
                    }

                    <div>
                        <label className={style.label}>Title</label>
                        {loads.mode === 'view' &&
                            <p className={style.input}>{filmSelected?.title}</p>
                        }

                        {loads.mode === 'edit' &&
                            <input name={"title"}
                                   value={film?.title}
                                   onChange={handleChange}
                                   placeholder={"Enter film title"}
                                   className={style.input}
                            />
                        }
                    </div>
                    <div>
                        <label className={style.label}>Director</label>
                        {loads.mode === 'view' &&
                            <p className={style.input}>{filmSelected?.director}</p>
                        }
                        {loads.mode === 'edit' &&
                            <input name={"director"}
                                   value={film?.director}
                                   onChange={handleChange}
                                   placeholder={"Enter film director"}
                                   className={style.input}
                            />
                        }
                    </div>

                    <div className={style.flex}>
                        <div style={{width: "50%"}}>
                            <label className={style.label}>Stars</label>
                            <div>
                                {loads.mode === 'view' &&
                                    <p className={style.input}>{filmSelected?.stars}</p>
                                }
                                {loads.mode === 'edit' &&
                                    <select value={film?.stars} onChange={handleChange} name={"stars"}
                                            className={style.input}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                }
                            </div>
                        </div>
                        <div style={{width: "50%"}}>
                            <label className={style.label}>Year</label>
                            {loads.mode === 'view' &&
                                <p className={style.input}>{filmSelected?.year}</p>
                            }
                            {loads.mode === 'edit' &&

                                <select
                                    onChange={handleChange}
                                    name={"year"}
                                    value={film?.year}
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
                            }

                        </div>

                    </div>

                    <div>
                        <label className={style.label}>Review</label>
                        {loads.mode === 'view' &&
                            <textarea className={style.input} cols={25}
                                      rows={7}
                                      defaultValue={filmSelected?.review}
                                      readOnly={true}
                            ></textarea>
                        }
                        {loads.mode === 'edit' &&
                            <textarea name={"review"}
                                      value={film?.review}
                                      onChange={handleChange}
                                      placeholder={"Enter your personal review"}
                                      cols={25}
                                      rows={7}
                                      className={style.input}
                            />
                        }
                    </div>
                    {loads.mode === 'view' &&
                    <button type={"button"}
                            className={style.btn}
                            onClick={()=> setLoads(prevState => {
                                return {
                                    ...prevState,
                                    mode: 'edit'
                                }
                            })}
                    >Change To Edit Mode</button>
                    }
                    {loads.mode === 'edit' &&
                    <button type={"button"}
                            className={style.btn}
                            onClick={()=> setLoads(prevState => {
                                return {
                                    ...prevState,
                                    mode: 'view'
                                }
                            })}
                    >Change To View Mode</button>
                    }
                    {isLoading && <ButtonLoading/>}
                    {(!isLoading && loads.mode === 'edit') &&
                        <button type={"submit"} className={style.btn}>Edit Record</button>
                    }
                    {(!isLoading && loads.mode === 'view') &&
                        <button type={"submit"} className={style.btn} style={{border:"solid 2px red", color:"darkred"}}>Delete Record</button>
                    }
                </form>
            }
        </div>
    )
}

export default SingleFilmPage
