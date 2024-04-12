import * as axios from "axios";
import {AxiosInstance} from "axios";
const base = 'http://localhost:8080/api/v1/films'

const header =(content: 'xml'|'json'|'text') =>{

    switch (content){
        case "xml":
            return { 'Accept': 'application/xml'};
        case 'json':
            return {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    };
        default:
            return {
                'Accept': 'text/plain'
            }
    }


}

const settings = (content: 'xml'|'json'|'text')=>{

    return {
        baseURL : base,
        headers: header(content)
    }
}

const instance: AxiosInstance = axios.create(settings('json'))

export const filmApi = {
    async get(url){
        try{
            return instance.get(url);
        }catch (error){
            return error;
        }
    },
    async post(url, body){
        try{
            return instance.post(url, body ?? {});
        }catch (error){
            return error;
        }
    },
    async patch(url, body){
        try{
            return instance.patch(url, body ?? {});
        }catch (error){
            return error;
        }
    }
}

