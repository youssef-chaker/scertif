import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { ExamService } from '../services/exam.service';

import { ExamComponent } from '../exam/exam.component';
import { QuestionComponent } from '../question/question.component';
import { SharedModule } from './shared.module';
import { ExamRoutingModule } from './exam-routing.module';
import {FormsModule} from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [
    ExamComponent,
    QuestionComponent
  ],
    imports: [
      NgxPaginationModule,
      SharedModule,
      ExamRoutingModule,
      FormsModule,
      CountdownModule
    ],
  providers: [
    ExamService
  ]
})
export class ExamModule { }
