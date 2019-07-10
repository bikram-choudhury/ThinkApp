import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TopicService } from '../services/topic.service';
import { map } from 'rxjs/operators';

@Injectable()
export class TopicMasterResolve implements Resolve<any> {
    constructor(private _topicService: TopicService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._topicService.fetchTopics().pipe(
            map(response => response)
        );
    }
}