import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {

  @Input() id;
  @Input() title;
  @Input() body;
  @Input() explanation;
  @Input() choices;
  @Input() correctAnswer;
  @Input() pChanged;
  @Input() pageNumber;
  @Input() checkedAnswers;
  @Input() submitted;
  @Output() selectedAnswer = new EventEmitter();
  answers = [];
  showAnswer = false;
  showExplanation = false;
  submit = false;
  timerText;
  nowChecked = [];
  selectedChoices = [];
  constructor() { }

  ngOnInit(): void {
    this.pChanged.subscribe(c => {
      if (c) {
        this.selectedAnswer.emit(this.answers);
      }
    });
    this.submitted.subscribe(s => this.submit = s);
    this.pageNumber = typeof (this.pageNumber) === 'undefined' ? 1 : this.pageNumber;
    this.answers = this.checkedAnswers;
    this.styleCheckedAnswers(this.checkedAnswers);
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
    return this.correctAnswer.find(c => c === choice);
  }

}
