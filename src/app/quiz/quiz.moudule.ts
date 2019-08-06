import { NgModule } from '@angular/core';
import { QuizComponent } from './quiz.component';
import { SharedModule } from '../shared.module';
import { RouterModule, Routes } from '@angular/router';
import { QuizService } from '../services/quiz.service';

const routes: Routes = [{
    path: '',
    component: QuizComponent
}]

@NgModule({
    imports: [ SharedModule, RouterModule.forChild(routes) ],
    providers: [ QuizService ],
    declarations: [ QuizComponent ]
})
export class QuizModule {

}