import {Component, EventEmitter, OnInit} from '@angular/core';
import {ExamService} from '../services/exam.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  questions;
  p;
  correctPoints = 0;
  points = [];
  result = 0;
  pHasChanged = new EventEmitter();
  showResult = false;

  constructor(private examService: ExamService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const exam = this.route.snapshot.params.exam;
    /*this.examService.getQuestions(exam)
      .subscribe(questions => {
        this.questions = questions;
      });*/
    this.questions = this.examService.getDumpQuestions();
  }

  pageChanged(e): void {
    this.p = e;
    this.pHasChanged.emit(true);
  }

  addAnswer(answers, id): void {
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

  onSubmit(): void {
    this.pHasChanged.emit(true);
    for (let i = 0 ; i < this.points.length ; i++) {
      const questionAnswers = this.questions[i].correctAnswer.sort();
      const pointAnswers = this.points[i].answers.sort();
      if (JSON.stringify(questionAnswers) === JSON.stringify(pointAnswers)) {
        this.correctPoints++;
      }
    }
    this.result = (this.correctPoints / this.questions.length) * 100;
    this.showResult = true;
    this.correctPoints = 0;
  }

}
