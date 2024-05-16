import {Paginate} from "../../_components";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filmActions} from "../../_actions";
import {Film} from "../../_models";
import {AppPage} from "../../_models";
import {Spin, Table} from "antd";
import {useNavigate} from "react-router";

export const HomePage=()=>{
    const dispatch = useDispatch();
    const { fetchPaginatedFilms, deleteFilmById} = filmActions;



    const data = useSelector(({filmState})=> filmState)
    const isLoading = data.fetchingPaginatedFilms;
    const films : Film[]= data.paginatedFilms;
    const pageInfo : AppPage = data.filmPage;
    const text = data.searchText;
    const contentType = data.contentType;

    const navigate = useNavigate();

    const navigateToSinglePage=(id:number):void=>{
        navigate(`film/${id}`)
    }

    const justNavigate=()=>{
        // @ts-ignore
        window.location.reload()
    }
    const handleDelete=(id:number | string)=>{
        // @ts-ignore
        dispatch(deleteFilmById(id,justNavigate))
    }
    const query=(num: number = 1):string =>{
        return '?' +
        new URLSearchParams({
            pageNo: num.toString(),
            pageSize: '14',
            search: text,
        }).toString()

    }

    const [cPage,setCPage]  = useState<number>(1)
    const timeoutRef = useRef<any>(null)


    useEffect(()=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            // @ts-ignore
            dispatch(fetchPaginatedFilms(contentType,query(cPage)))
        }, 500);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
        // @ts-ignore

    },[text, dispatch])



    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchPaginatedFilms(contentType,query(cPage)))
    },[dispatch,cPage])

    const columns = [

        {
            title: 'Film ID',
            dataIndex: '',
            render: ({id}) => {
                return <p style={{fontWeight: 'bold'}}>{id}</p>
            }
        },
        {
            title: 'Film Title',
            dataIndex: '',
            render: ({title}) =>{
                return <p style={{fontWeight: 'bold'}}>{title}</p>
            }
        },
        {
            title: 'Film Stars',
            dataIndex: '',
            render: ({stars}) =>{
                return <p >{stars}</p>
            }
        },
        {
            title: 'Year',
            dataIndex: '',
            render: ({year}) =>{
                return <p style={{fontWeight: 'bold'}}>{year}</p>
            }
        },
        {
            title: 'Review',
            dataIndex: '',
            render: ({review}) =>{
                return <p >{review}</p>
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            render: ({id}) =>{
                return (<div style={{display: "flex", gap: '10px', padding: '10px'}}>

                    <button onClick={()=>navigateToSinglePage(id)} style={{background:"#0174d8", padding: '10px 15px', color:"white", borderRadius: '4px', fontWeight: '700', border: 'none'}}>view</button>
                    <button onClick={()=>{handleDelete(id)}}
                            style={{background:"red", padding: '10px 15px', color:"white", borderRadius: '4px', fontWeight: '700', border: 'none'}}>delete</button>
                </div>)
            }
        }
    ]

    if(isLoading){
        return <div
            style={{textAlign:"center", margin:"30px auto"}}
            >
            <Spin tip={"fetching films from db"} size={"large"}/>
        </div>
    }



    return (
        <div>
            <Table
                rowKey={r => r.id}
                dataSource={films}
                columns={columns}
                pagination={false}
            />
            <div>
                <Paginate
                    appPage={pageInfo}
                    changePage={setCPage}
                />
            </div>
        </div>


    );
}



export default HomePage;