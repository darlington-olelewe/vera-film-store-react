import axios from "axios";
import {Film} from "../_models"


const base = 'http://34.125.77.240:8080/veras-film-api/'

const header =(content: 'xml'|'json'|'text') =>{

    switch (content){
        case "xml":
            return {
                'Accept': 'application/xml',
                "Content-Type" :'application/xml'
            };
        case 'json':
            return {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    };
        default:
            return {
                'Content-Type': 'text/plain',
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

const filmToXml=(film:Film)=>{
    try {
        const xmlDoc = document.implementation.createDocument(null, 'Film');
        for (const key of Object.keys(film)) {
            const element = xmlDoc.createElement(key);
            element.textContent = film[key];
            xmlDoc.documentElement.appendChild(element);
        }
        return new XMLSerializer().serializeToString(xmlDoc);
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

export const filmApi = {
    async get(url:string, contentType: 'json' | 'xml' | 'text' = 'json') :Promise<any>{
        const  instance = axios.create(settings(contentType));
        try{
            return instance.get(url);

        }catch (error){
            return error;
        }
    },
    post: async function (url: string, body: Film, contentType: 'json' | 'xml' | 'text' = 'json'): Promise<any> {

        let payload:any = body;



        const instance = axios.create(settings(contentType))
        const xmlString = filmToXml(body);
        if(contentType === 'xml'){
            payload = xmlString
        }

        try {
            return instance.post(url, payload);
        } catch (error) {
            return error;
        }
    },
    async put(url, body:Film, contentType: 'json' | 'xml' | 'text' = 'json'):Promise<any>{
        let payload:any = body;
        const instance = axios.create(settings(contentType))
        const xmlString = filmToXml(body);
        if(contentType === 'xml'){
            payload = xmlString
        }
        try{
            return instance.put(url, payload);
        }catch (error){
            return error;
        }
    },

    async delete(url):Promise<any>{
        const instance = axios.create(settings('json'))
        try{
            return instance.delete(url);
        }catch (error){
            return error;
        }
    }
}

