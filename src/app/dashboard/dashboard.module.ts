import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '../header/header.component';

const route: Routes = [{
    path: '',
    component: DashboardComponent
}]

@NgModule({
    imports: [RouterModule.forChild(route)],
    declarations: [DashboardComponent, HeaderComponent],
    exports: []
})
export class DashboardModule {

}