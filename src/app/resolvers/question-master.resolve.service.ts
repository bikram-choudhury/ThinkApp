import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { QuestionMasterService } from '../services/question-master.service';
import { map } from 'rxjs/operators';

@Injectable()
export class QuestionMasterResolveService implements Resolve<any> {
    constructor(private _questionService: QuestionMasterService) {}
    resolve(activatedRoute: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot){
        return this._questionService.fetchQuestions().pipe(
            map(response => response && response.questionList || [])
        )
    }
}