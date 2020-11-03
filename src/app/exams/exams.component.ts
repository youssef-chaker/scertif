import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ExamService} from '../services/exam.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit, OnDestroy, AfterViewInit {

  exams = [];
  subs = new Subscription();
  loading = true;
  constructor(private examService: ExamService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loading.next(true);
    this.subs.add(
      this.examService.getAllExams()
        .subscribe( exams => {
            this.exams = exams;
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.authService.loading.next(false);
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.authService.loading.next(false);
  }

}
