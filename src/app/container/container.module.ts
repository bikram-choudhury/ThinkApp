import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ContainerComponent } from '../container/container.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthoriztionService } from '../services/authorization.service';

const routes: Routes = [{
    path: '',
    component: ContainerComponent,
    canActivateChild: [AuthoriztionService],
    children: [{
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
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
        SidebarComponent,
        ContainerComponent,
        FooterComponent
    ],
    providers: [
      AuthoriztionService
    ]
})
export class ContainerModule {

}