import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionMasterComponent } from './question-master/question-master.component';
import { TopicMasterComponent } from './topic-master/topic-master.component';
import { QuestionViewComponent } from './question-view/question-view.component';
import { QuestionMasterResolveService } from './resolvers/question-master.resolve.service';

const routes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},{
  path: 'dashboard',
  component: DashboardComponent
}, {
  path: 'create-question',
  component: QuestionMasterComponent
}, {
  path: 'view-questions',
  component: QuestionViewComponent,
  resolve: { questionList: QuestionMasterResolveService}
}, {
  path: 'topics',
  component: TopicMasterComponent
}]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}