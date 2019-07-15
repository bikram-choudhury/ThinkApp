import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SharedModule } from '../shared.module';

const route: Routes = [{
    path: '',
    component: SignupComponent
}]

@NgModule({
    imports: [ RouterModule.forChild(route), SharedModule ],
    declarations: [ SignupComponent ]
})
export class SignUpModule {

}