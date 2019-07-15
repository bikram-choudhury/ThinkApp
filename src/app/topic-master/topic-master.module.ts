import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopicMasterComponent } from './topic-master.component';
import { SharedModule } from '../shared.module';

const route: Routes = [{
    path: '',
    component: TopicMasterComponent
}, {
    path: ':topic_slug',
    component: TopicMasterComponent,
    data: {
        name: 'Besant'
    }
}]

@NgModule({
    imports: [RouterModule.forChild(route), SharedModule],
    declarations: [TopicMasterComponent]
})
export class TopicMasterModule {

}