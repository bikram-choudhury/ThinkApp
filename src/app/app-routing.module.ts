import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: 'signin',
  pathMatch: 'full'
},{
  path: 'signup',
  loadChildren: () => import('./signup/signup.module').then(m => m.SignUpModule)
},{
  path: 'signin',
  loadChildren: () => import('./signin/signin.module').then(m => m.SignInModule)
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