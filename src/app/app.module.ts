import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamComponent } from './exam/exam.component';
import { QuestionComponent } from './question/question.component';
import {ExamService} from './services/exam.service';
import {RouterModule, Routes} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'exam/:exam', component: ExamComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ExamComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule
  ],
  providers: [ExamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
