import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./quiz/quiz.moudule').then(module => module.QuizModule)
},{
  path: 'admin',
  loadChildren: () => import('./wrapper/wrapper.module').then(module => module.WrapperModule)
},{
  path: '**',
  redirectTo: ''
}]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}