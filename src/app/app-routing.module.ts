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
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
}, {
  path: 'create-question',
  loadChildren: () => import('./question-master/question-master.module').then(m => m.QuestionMasterModule)
}, {
  path: 'view-questions',
  loadChildren: () => import('./question-view/question-view.module').then(m => m.QuestionViewModule)
}, {
  path: 'topics',
  loadChildren: () => import('./topic-master/topic-master.module').then(m => m.TopicMasterModule)
}]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}