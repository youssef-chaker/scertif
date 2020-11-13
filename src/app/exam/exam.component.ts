import {Component, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ExamService} from '../services/exam.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CountdownComponent, CountdownConfig} from 'ngx-countdown';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, OnDestroy {

  subs = new Subscription();
  questions = [];
  p;
  correctPoints = 0;
  points = [];
  result = 0;
  pHasChanged = new EventEmitter();
  loading = true;
  submitted = new BehaviorSubject(false);
  redone = false;
  showResult = false;
  showSubmit = true;
  showTimer = false;
  examStarted = true;
  timerMinutes;
  startedTimer = false;
  timerConfig: CountdownConfig;
  closeResult = '';
  @ViewChild('cd', { static: false }) countdown: CountdownComponent;

  constructor(private examService: ExamService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    const exam = this.route.snapshot.params.exam;
    this.subs.add(
      this.examService.getQuestions(exam)
        .subscribe(questions => {
            this.questions = questions;
          }, () => {
            this.loading = false;
            this.router.navigate(['**']).then();
          }
          , () => this.loading = false)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  pageChanged(e): void {
    this.p = e;
    this.pHasChanged.emit(true);
  }

  addAnswer(answers, id): void {
    if (this.redone) {
      this.redone = false;
      this.p = 1;
      return;
    }
    const point = {id, answers};
    if (this.points.find(p => p.id === id)) {
      this.points[this.points.findIndex(p => p.id === id)] = point;
    } else {
      this.points.push(point);
    }
  }

  checkedAnswers(id): any {
    const point = this.points.find(p => p.id === id);
    if (point) {
      return point.answers;
    }
    return [];
  }

  handleResult(): void {
    this.points.forEach(p => {
      let questionAnswers = this.questions.find(q => q.id === p.id);
      if (questionAnswers) {
        questionAnswers = questionAnswers.correctAnswers.sort();
        const sortedPointAnswers = p.answers.sort();
        const pointAnswers = [];
        sortedPointAnswers.forEach(answer => pointAnswers.push(answer.a));
        if (JSON.stringify(questionAnswers) === JSON.stringify(pointAnswers)) {
          this.correctPoints++;
        }
      }
    });
    this.result = (this.correctPoints / this.questions.length) * 100;
    this.showResult = true;
    this.correctPoints = 0;
  }

  onSubmit(): void {
    this.pHasChanged.emit(true);
    this.submitted.next(true);
    this.handleResult();
    this.showSubmit = !this.showSubmit;
    this.examStarted = !this.examStarted;
    this.cancelTimer();
  }

  onRedo(): void {
    this.redone = !this.redone;
    this.showSubmit = !this.showSubmit;
    this.examStarted = !this.examStarted;
    this.p = 1;
    this.points = [];
    this.submitted.next(false);
    this.showResult = false;
  }

  setTimer(): void {
    this.showTimer = true;
  }

  cancelTimer(): void {
    this.showTimer = false;
    this.timerMinutes = undefined;
    this.startedTimer = false;
    if (this.countdown !== undefined) {
      this.countdown.stop();
    }
  }

  startTimer(): void {
    this.timerConfig = {leftTime: +this.timerMinutes * 60};
    this.startedTimer = true;
  }

  handleTimer(e): void {
    if (e.action === 'done') {
      this.cancelTimer();
      this.onSubmit();
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
