import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { QuestionMasterComponent } from './question-master/question-master.component';
import { TopicMasterComponent } from './topic-master/topic-master.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    WrapperComponent,
    SidebarComponent,
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    QuestionMasterComponent,
    TopicMasterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
