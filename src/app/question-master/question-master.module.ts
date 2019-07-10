import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionMasterComponent } from './question-master.component';
import { SharedModule } from '../shared.module';
import { QuestionMasterService } from '../services/question-master.service';
import { TopicMasterResolve } from '../resolvers/topic-master.resolve';

const route: Routes = [{
    path: '',
    component: QuestionMasterComponent,
    resolve: { topics: TopicMasterResolve}
}]

@NgModule({
    imports: [RouterModule.forChild(route), SharedModule],
    declarations: [QuestionMasterComponent],
    providers: [QuestionMasterService, TopicMasterResolve],
    exports: []
})
export class QuestionMasterModule {

}