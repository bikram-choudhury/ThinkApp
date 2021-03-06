import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared.module';

const route: Routes = [{
    path: '',
    component: DashboardComponent
}]

@NgModule({
    imports: [RouterModule.forChild(route), SharedModule],
    declarations: [DashboardComponent],
    exports: []
})
export class DashboardModule {

}