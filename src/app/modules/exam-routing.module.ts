import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExamComponent} from '../exam/exam.component';

const routes: Routes = [
  { path: ':exam', component: ExamComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ExamRoutingModule { }
