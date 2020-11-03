import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ExamService} from '../services/exam.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit, OnDestroy, AfterViewInit {

  exams = [];
  examNames = [];
  searchExam;
  subs = new Subscription();
  loading = true;
  currentIndex = 0;
  @ViewChild('scroller') private myScrollContainer: ElementRef;
  constructor(private examService: ExamService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.loading.next(true);
    this.subs.add(
      this.examService.getAllExams()
        .subscribe( exams => {
            this.exams = exams;
            exams.forEach(e1 => {
              e1.exams.forEach(e2 => {
                this.examNames.push(e2.exam);
              });
            });
            this.loading = false;
          },
          () => this.loading = false
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

  onSelectExam(exam: any): void {
    this.router.navigate(['exam/' + exam]).then();
  }

  hideBorder(): boolean {
    return this.searchExam === undefined
      || this.searchExam.length === 0
      || this.filteredExams().length === 0;
  }

  filteredExams(): any[] {
    if (this.searchExam === undefined) {
      return [];
    }
    return this.examNames.filter(e => {
      return e.toLocaleLowerCase().includes(this.searchExam.toLocaleLowerCase());
    });
  }

  onKeyPress($event: KeyboardEvent): void {
    if ($event.key === 'ArrowDown') {
      this.currentIndex = this.currentIndex < this.filteredExams().length - 1 ? ++this.currentIndex : this.currentIndex;
      this.myScrollContainer.nativeElement.scrollTop += 49;
    } else if ($event.key === 'ArrowUp') {
      this.currentIndex = this.currentIndex > 0 ? --this.currentIndex : 0;
      this.myScrollContainer.nativeElement.scrollTop -= 49;
    } else if ($event.key === 'Enter') {
      this.router.navigate(['exam/' + this.filteredExams()[this.currentIndex]]).then();
    } else {
      this.currentIndex = 0;
      this.myScrollContainer.nativeElement.scrollTop = 0;
    }
  }

}
