import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'signup',
  pathMatch: 'full'
},{
  path: 'signup',
  component: SignupComponent
},{
  path: 'signin',
  component: SignInComponent
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