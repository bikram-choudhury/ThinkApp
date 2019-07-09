import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionViewComponent } from './question-view.component';
import { QuestionMasterResolveService } from '../resolvers/question-master.resolve.service';
import { SharedModule } from '../shared.module';
import { QuestionMasterService } from '../services/question-master.service';

const route: Routes = [{
    path: '',
    component: QuestionViewComponent,
    resolve: { questionList: QuestionMasterResolveService}
}]

@NgModule({
    imports: [RouterModule.forChild(route), SharedModule],
    declarations: [QuestionViewComponent],
    providers: [QuestionMasterResolveService, QuestionMasterService],
    exports: []
})
export class QuestionViewModule {

}