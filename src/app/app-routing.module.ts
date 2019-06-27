import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionMasterComponent } from './question-master/question-master.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent
}, {
  path: 'questions',
  component: QuestionMasterComponent
}]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}