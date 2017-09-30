import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'mo-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  inputs: ['data']
})
export class ProgressComponent implements OnInit {
  public data: any;

  constructor() {
  }

  ngOnInit() {
  }

}
