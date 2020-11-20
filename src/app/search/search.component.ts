import { Component, OnInit } from '@angular/core';
import {ExamService} from '../services/exam.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  exam = '';
  exams = [];
  loading = true;
  constructor(private examService: ExamService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.exam = this.route.snapshot.params.exam;
    this.examService.getSearchedExams(this.exam)
      .subscribe(exams => {
        this.exams = exams;
        this.loading = false;
      },
        () => this.loading = false);
  }

}
