import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExamService} from '../services/exam.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit, OnDestroy {

  exams = [];
  subSink = new SubSink();
  loading = true;
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.subSink.sink = this.examService.getAllExams()
      .subscribe( exams => {
        this.exams = exams;
        this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}
