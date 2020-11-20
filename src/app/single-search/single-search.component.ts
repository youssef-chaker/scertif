import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-single-search',
  templateUrl: './single-search.component.html',
  styleUrls: ['./single-search.component.css']
})
export class SingleSearchComponent implements OnInit {

  @Input() exam;
  constructor() { }

  ngOnInit(): void {
  }

}
