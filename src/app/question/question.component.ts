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
  @Input() checkedAnswers;
  @Output() selectedAnswer = new EventEmitter();
  answers = [];
  showAnswer = false;
  showExplanation = false;
  constructor() { }

  ngOnInit(): void {
    this.pChanged.subscribe(c => {
      if (c) {
        this.selectedAnswer.emit(this.answers);
      }
    });
    this.answers = this.checkedAnswers;
  }

  onChange(e): void {
    const answer = e.target.value;
    if (!this.answers.find(a => a === answer)) {
      this.answers.push(answer);
    } else {
      this.answers.splice(this.answers.indexOf(answer), 1);
    }
  }

  isChecked(i): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0 ; j < this.checkedAnswers.length ; j++) {
      if (this.checkedAnswers[j] === i.toString()) {
        return true;
      }
    }
    return false;
  }

}
