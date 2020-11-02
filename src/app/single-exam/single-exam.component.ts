import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-single-exam',
  templateUrl: './single-exam.component.html',
  styleUrls: ['./single-exam.component.css']
})
export class SingleExamComponent implements OnInit {

  @Input() provider;
  @Input() exams;

  constructor() { }

  ngOnInit(): void {
  }

}
