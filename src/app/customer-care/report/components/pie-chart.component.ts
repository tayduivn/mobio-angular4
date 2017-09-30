import {Component} from '@angular/core';

@Component({
  selector: 'mo-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  inputs: ['data']
})
export class PieChartComponent {
  public data: any;

  constructor() {
  }

}
