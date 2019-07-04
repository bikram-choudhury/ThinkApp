import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { config } from '../../config.js';

@Injectable({
    providedIn: 'root'
})
export class TopicService {
    private _apiURL= `${config.server.url}/api`;
    constructor(private _http: HttpClient){}
    
    fetchTopics(): Observable<any> {
        return this._http.get(`${this._apiURL}/topics`).pipe(
            map((response:any[]) => {
                return response.map(adhoc => ({id: adhoc._id, name: adhoc.name}))
            })
        )
    }
    saveTopic(topic: string): Observable<string> {
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
                map((response: {[key: string]: string}) => response.status),
                catchError(error => of(error))
            )
        }
    }
}