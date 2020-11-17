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
  @Input() maxSize: number;
  @Output() selectedAnswer = new EventEmitter();
  subs = new Subscription();
  answers = [];
  showAnswer = false;
  showExplanation = false;
  submit = false;
  timerText;
  nowChecked = [];
  selectedChoices = [];
  explanationText = '';
  expSubmitted = false;
  readMore = false;
  answerText = 'Show answer';
  shortQuestion;
  reportText = '';
  repSubmitted = false;
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
    this.shortQuestion = this.question;
    if (this.question.length > 175) {
      this.shortQuestion = this.question.slice(0, 150) + '...';
      this.readMore = true;
    }
    this.styleCheckedAnswers(this.checkedAnswers);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  styleCheckedAnswers(answers): void {
    answers.forEach(answer => {
      this.selectedChoices.push(answer);
    });
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

  choiceSelected(a, i): void {
    const choice = {a, i};
    if (this.selectedChoices.find(c => c.a === a)) {
      this.selectedChoices.splice(this.selectedChoices.findIndex(c => c.i === i), 1);
    } else {
      this.selectedChoices.push(choice);
    }
  }

  isChecked(choice): boolean {
    return this.checkedAnswers.find(c => c.a === choice);
  }

  checkChoice(i): boolean {
    return this.selectedChoices.find(c => c.i === i);
  }

  isCorrect(choice): boolean {
    return this.correctAnswers.find(c => c === choice);
  }

  submitExplanation(): void {
    console.log(this.explanationText);
    setTimeout(() => {
      this.expSubmitted = true;
    }, 500);
  }

  onAnswer(): void {
    this.showAnswer = !this.showAnswer;
    this.answerText = this.showAnswer ? 'Hide answer' : 'Show answer';
  }

  submitReport(): void {
    console.log(this.reportText);
    setTimeout(() => {
      this.repSubmitted = true;
    }, 500);
  }
}
