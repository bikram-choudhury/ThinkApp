import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TopicService {
    private _apiURL="http://localhost:3000/api";
    constructor(private _http: HttpClient){}
    
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
            return this._http.post(`${this._apiURL}/topic`, data,options).pipe(
                map((response: {[key: string]: string}) => response.status),
                catchError(error => of(error))
            )
        }
    }
}