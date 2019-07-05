import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { config } from '../../config.js';
import { TopicModel } from '../model/topic.model.js';

@Injectable({
    providedIn: 'root'
})
export class TopicService {
    private _apiURL= `${config.server.url}/api`;
    constructor(private _http: HttpClient){}
    
    fetchTopics(): Observable<TopicModel[]> {
        return this._http.get(`${this._apiURL}/topics`).pipe(
            map((response:{[key: string]: string}[]) => {
                return response.map(adhoc => ({id: adhoc._id, name: adhoc.name}))
            })
        )
    }
    saveTopic(topic: string): Observable<TopicModel> {
        if(topic) {
            const data = {
                name: topic,
                slug: topic.toLowerCase().replace(/\s+/g, '-')
            };
            const options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }
            return this._http.post(`${this._apiURL}/topics`, data,options).pipe(
                map((response: {[key: string]: string}) => {
                    return {
                        id: response._id,
                        name: response.name
                    }
                }),
                catchError(error => of(error))
            )
        }
    }
}