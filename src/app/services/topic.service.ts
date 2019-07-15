import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { config } from '../../config.js';
import { TopicModel } from '../model/topic.model.js';
import { TopicMasterModule } from '../topic-master/topic-master.module.js';

@Injectable()
export class TopicService {
    private _apiURL= `${config.server.url}/api`;
    constructor(private _http: HttpClient){}
    
    fetchTopics(): Observable<TopicModel[]> {
        return this._http.get(`${this._apiURL}/topics`).pipe(
            map((response:{[key: string]: string}[]) => {
                return response.map(adhoc => ({slug: adhoc.slug, name: adhoc.name}))
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
                        slug: response.slug,
                        name: response.name
                    }
                }),
                catchError(error => of(error))
            )
        }
    }
    deleteTopic(topic_slug: string): Observable<{message: string}> {
        if(topic_slug) {
            return this._http.delete(`${this._apiURL}/topics/${topic_slug}`).pipe(
                map((response: {[key: string]: string}) => ({message: response.message})),
                catchError(error => of(error))
            )
        }
    }
}