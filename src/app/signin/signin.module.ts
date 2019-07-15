import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './signin.component';
import { SharedModule } from '../shared.module';

const routes: Routes = [{
    path: '',
    component: SignInComponent
}]

@NgModule({
    imports: [ RouterModule.forChild(routes), SharedModule ],
    declarations: [ SignInComponent ]
})
export class SignInModule {

}