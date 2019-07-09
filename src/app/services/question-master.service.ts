import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of as observableOf } from 'rxjs';
import { config } from '../../config.js';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class QuestionMasterService {
    private _apiUrl = `${config.server.url}/api`;
    constructor(private _http: HttpClient){}
    saveQuestion(question: any):Observable<{status: boolean}> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        } 
        return this._http.post(`${this._apiUrl}/questions/save`, question, options).pipe(
            map((response: {[key:string]: any}) => {
                if(response.id) {
                    return {status: true};
                } else {
                    return {status: false};
                }
            }),
            catchError(error => observableOf(error))
        )
    }
    fetchQuestions(): Observable<any> {
        return this._http.get(`${this._apiUrl}/questions/fetch`).pipe(
            map(response => response),
            catchError(error => observableOf(error))
        )
    }
}