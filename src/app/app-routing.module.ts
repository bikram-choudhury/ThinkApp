import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionMasterComponent } from './question-master/question-master.component';
import { TopicMasterComponent } from './topic-master/topic-master.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},{
  path: 'dashboard',
  component: DashboardComponent
}, {
  path: 'questions',
  component: QuestionMasterComponent
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