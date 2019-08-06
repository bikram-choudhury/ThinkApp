import { Injectable } from '@angular/core';
import { questionModel } from '../model/question.model';
import { Observable, of as observableOf } from 'rxjs';
import { config } from '../../config.js';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class QuizService {
    private _apiUrl = `${config.server.url}/api`;
    constructor(private _http: HttpClient) {}

    fetchQuizData(): Observable<questionModel[]> {
        return this._http.get(`${this._apiUrl}/questions/fetch`).pipe(
            map((response: {questionList: {[key:string]: any}}) => {
                return response.questionList.map((adhoc) => {
                    return {
                        question: adhoc.question,
                        Type: adhoc.questionType,
                        slug: adhoc.questionSlug,
                        Title: adhoc.questionTitle,
                        options: adhoc.options,
                        isActive: false,
                        isVisited: false,
                        notAnswered: false,
                    }
                })
            })
        )
        /* const observableData = observableOf(this.quizData);
        return observableData; */
    }
}