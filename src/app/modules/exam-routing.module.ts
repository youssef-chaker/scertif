import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExamComponent} from '../exam/exam.component';
import {ExamsComponent} from '../exams/exams.component';
import {AuthGuardService} from '../services/auth-guard.service';

const routes: Routes = [
  { path: '', component: ExamsComponent},
  { path: ':exam', component: ExamComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [],
  providers: [AuthGuardService],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ExamRoutingModule { }
