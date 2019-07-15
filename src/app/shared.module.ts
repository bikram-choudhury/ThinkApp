import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { HttpClientModule } from '@angular/common/http';
import { TopicService } from './services/topic.service';

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    declarations: [HeaderComponent],
    providers: [TopicService],
    exports: [
        HeaderComponent,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FroalaEditorModule,
        FroalaViewModule
    ]
})
export class SharedModule {

}