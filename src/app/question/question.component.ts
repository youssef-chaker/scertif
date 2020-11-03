import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit, OnDestroy {

  @Input() id;
  @Input() question;
  @Input() explanation;
  @Input() choices;
  @Input() correctAnswers;
  @Input() pChanged;
  @Input() pageNumber;
  @Input() checkedAnswers;
  @Input() submitted;
  @Output() selectedAnswer = new EventEmitter();
  subs = new Subscription();
  answers = [];
  showAnswer = false;
  showExplanation = false;
  submit = false;
  timerText;
  constructor() { }

  ngOnInit(): void {
    this.subs.add(
      this.pChanged.subscribe(c => {
        if (c) {
          this.selectedAnswer.emit(this.answers);
        }
      })
    );
    this.subs.add(
      this.submitted.subscribe(s => this.submit = s)
    );
    this.pageNumber = typeof (this.pageNumber) === 'undefined' ? 1 : this.pageNumber;
    this.answers = this.checkedAnswers;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onChange(e, i): void {
    const a = e.target.value;
    const answer = {a, i};
    if (!this.answers.find(ans => ans.a === a)) {
      this.answers.push(answer);
    } else {
      this.answers.splice(this.answers.findIndex(ans => ans.a === a), 1);
    }
  }

  isChecked(choice): boolean {
    return this.checkedAnswers.find(c => c.a === choice);
  }

  isCorrect(choice): boolean {
    return this.correctAnswers.find(c => c === choice);
  }

}
