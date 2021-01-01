import {Component, Input, OnInit} from '@angular/core';
import {ExamService} from '../services/exam.service';

@Component({
  selector: 'app-similar-exams',
  templateUrl: './similar-exams.component.html',
  styleUrls: ['./similar-exams.component.css']
})
export class SimilarExamsComponent implements OnInit {

  @Input() exam;
  exams = [];
  loading = true;
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.examService.getSimilarExams(this.exam)
      .subscribe(exams => {
          this.exams = exams;
          this.loading = false;
        },
        () => this.loading = false);
  }

}
