import {Component} from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'mo-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  inputs: ['data']
})

export class LineChartComponent {
  public data: any;
  constructor() {
  }
}
