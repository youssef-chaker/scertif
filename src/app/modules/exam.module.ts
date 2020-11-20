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
import { ChartsModule } from 'ng2-charts';
import { SearchComponent } from '../search/search.component';
import { SingleSearchComponent } from '../single-search/single-search.component';

@NgModule({
  declarations: [
    ExamComponent,
    QuestionComponent,
    ExamsComponent,
    SingleExamComponent,
    ExamFilterPipe,
    SearchComponent,
    SingleSearchComponent
  ],
  imports: [
    NgxPaginationModule,
    SharedModule,
    ExamRoutingModule,
    FormsModule,
    CountdownModule,
    SharedModule,
    RouterModule,
    ChartsModule
  ],
  providers: [
    ExamService
  ]
})
export class ExamModule { }
