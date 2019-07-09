import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';
import { QuestionMasterComponent } from './question-master/question-master.component';
import { TopicMasterComponent } from './topic-master/topic-master.component';
import { HttpInterceptors } from './interceptors/http.interceptors';
import { QuestionViewComponent } from './question-view/question-view.component';
import { QuestionMasterResolveService } from './resolvers/question-master.resolve.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [
    AppComponent,
    WrapperComponent,
    SidebarComponent,
    ContainerComponent,
    FooterComponent,
    QuestionMasterComponent,
    TopicMasterComponent,
    QuestionViewComponent
  ],
  providers: [
    QuestionMasterResolveService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptors,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
