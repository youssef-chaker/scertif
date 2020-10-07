import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { ExamService } from '../services/exam.service';

import { ExamComponent } from '../exam/exam.component';
import { QuestionComponent } from '../question/question.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    ExamComponent,
    QuestionComponent
  ],
  imports: [
    NgxPaginationModule,
    SharedModule
  ],
  providers: [
    ExamService
  ]
})
export class ExamModule { }
