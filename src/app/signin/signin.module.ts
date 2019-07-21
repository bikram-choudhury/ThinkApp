import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './signin.component';
import { SharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [{
    path: '',
    component: SignInComponent
}]

@NgModule({
    imports: [ RouterModule.forChild(routes), FormsModule, CommonModule ],
    declarations: [ SignInComponent ]
})
export class SignInModule {

}