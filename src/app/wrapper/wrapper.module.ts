import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './wrapper.component';

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
      }]
},{
    path: 'user/:username',
    loadChildren: () => import('./../container/container.module').then(m => m.ContainerModule)
}]

@NgModule({
    imports: [ SharedModule, RouterModule.forChild(routes) ],
    declarations: [ WrapperComponent ]
})
export class WrapperModule {

}