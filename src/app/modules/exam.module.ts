import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { ExamService } from '../services/exam.service';

import { ExamComponent } from '../exam/exam.component';
import { QuestionComponent } from '../question/question.component';
import { SharedModule } from './shared.module';
import { ExamRoutingModule } from './exam-routing.module';

@NgModule({
  declarations: [
    ExamComponent,
    QuestionComponent
  ],
  imports: [
    NgxPaginationModule,
    SharedModule,
    ExamRoutingModule
  ],
  providers: [
    ExamService
  ]
})
export class ExamModule { }
