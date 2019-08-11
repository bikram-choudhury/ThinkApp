import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../config.js';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    private _apiUrl = `${config.server.url}/api`;
    constructor(private _http: HttpClient){}

    saveUser(user: {[key: string]: string}): Observable<any> {
        if(user) {
            const URL = `${this._apiUrl}/user/register`;
            const options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization-Code': 'Bearer Token',
                    'Author-Name': 'Arshitha'
                })
            } 
            return this._http.post(URL, user, options).pipe(
                map(response => response),
                catchError(error => throwError(error))
            )
        }
    }

    loginUser(user: {[key: string]: string}): Observable<any> {
        if(user) {
            const URL = `${this._apiUrl}/user/authenticat`;
            return this._http.post(URL, user).pipe(
                map(success => success),
                catchError(error => {
                    return throwError({
                        status: error.status,
                        message: error.message,
                        statusText: error.statusText
                    })
                })
            );
        } else {
            return null;
        }
    }
}