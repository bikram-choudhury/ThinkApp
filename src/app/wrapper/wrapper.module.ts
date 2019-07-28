import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './wrapper.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ContainerComponent } from '../container/container.component';
import { FooterComponent } from '../footer/footer.component';

const routes: Routes = [{
    path: '',
    component: WrapperComponent,
    children: [{
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
      },{
        path: 'signup',
        loadChildren: () => import('./../signup/signup.module').then(m => m.SignUpModule)
      },{
        path: 'signin',
        loadChildren: () => import('./../signin/signin.module').then(m => m.SignInModule)
      },{
        path: 'dashboard',
        loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: 'create-question',
        loadChildren: () => import('./../question-master/question-master.module').then(m => m.QuestionMasterModule)
      }, {
        path: 'view-questions',
        loadChildren: () => import('./../question-view/question-view.module').then(m => m.QuestionViewModule)
      }, {
        path: 'topics',
        loadChildren: () => import('./../topic-master/topic-master.module').then(m => m.TopicMasterModule)
      }]
}]

@NgModule({
    imports: [ SharedModule, RouterModule.forChild(routes) ],
    declarations: [ 
        WrapperComponent,
        SidebarComponent,
        ContainerComponent,
        FooterComponent
    ]
})
export class WrapperModule {

}