import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SharedModule } from '../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const route: Routes = [{
    path: '',
    component: SignupComponent
}]

@NgModule({
    imports: [ RouterModule.forChild(route), ReactiveFormsModule, CommonModule ],
    declarations: [ SignupComponent ]
})
export class SignUpModule {

}