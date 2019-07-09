import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionMasterComponent } from './question-master.component';
import { SharedModule } from '../shared.module';
import { QuestionMasterService } from '../services/question-master.service';

const route: Routes = [{
    path: '',
    component: QuestionMasterComponent
}]

@NgModule({
    imports: [RouterModule.forChild(route), SharedModule],
    declarations: [QuestionMasterComponent],
    providers: [QuestionMasterService],
    exports: []
})
export class QuestionMasterModule {

}