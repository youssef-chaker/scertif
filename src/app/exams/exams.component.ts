import { Component, OnInit } from '@angular/core';
import {ExamService} from '../services/exam.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  exams = [];
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.exams = this.examService.getAllExams();
  }

}
