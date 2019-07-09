import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},{
  path: 'dashboard',
  loadChildren: './dashboard/dashboard.module#DashboardModule'
}, {
  path: 'create-question',
  loadChildren: './question-master/question-master.module#QuestionMasterModule'
}, {
  path: 'view-questions',
  loadChildren: './question-view/question-view.module#QuestionViewModule'
}, {
  path: 'topics',
  loadChildren: './topic-master/topic-master.module#TopicMasterModule'
}]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}