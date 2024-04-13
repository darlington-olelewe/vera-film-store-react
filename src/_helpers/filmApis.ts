import axios from "axios";
import {Film} from "../_models/Film.ts";

const base = 'http://192.168.0.194:8080/api/v1/films'

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

const instance= axios.create(settings('json'))

export const filmApi = {
    async get(url:string) :Promise<any>{
        try{
            return instance.get(url);
        }catch (error){
            return error;
        }
    },
    async post(url:string, body:Film):Promise<any>{
        try{
            return instance.post(url, body);
        }catch (error){
            return error;
        }
    },
    async patch(url, body :Film):Promise<any>{
        try{
            return instance.patch(url, body);
        }catch (error){
            return error;
        }
    }
}

