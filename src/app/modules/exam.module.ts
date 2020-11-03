import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { ExamService } from '../services/exam.service';

import { ExamComponent } from '../exam/exam.component';
import { QuestionComponent } from '../question/question.component';
import { SharedModule } from './shared.module';
import { ExamRoutingModule } from './exam-routing.module';
import {FormsModule} from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { SingleExamComponent } from '../single-exam/single-exam.component';
import { ExamsComponent } from '../exams/exams.component';
import {RouterModule} from '@angular/router';
import { ExamFilterPipe } from '../pipes/exam-filter.pipe';

@NgModule({
  declarations: [
    ExamComponent,
    QuestionComponent,
    ExamsComponent,
    SingleExamComponent,
    ExamFilterPipe
  ],
  imports: [
    NgxPaginationModule,
    SharedModule,
    ExamRoutingModule,
    FormsModule,
    CountdownModule,
    SharedModule,
    RouterModule
  ],
  providers: [
    ExamService
  ]
})
export class ExamModule { }
