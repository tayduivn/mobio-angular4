import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
@Component({
  templateUrl: 'line-chart.component.html',
  styleUrls: ['line-chart.component.scss'],
  selector: 'mo-line-chart',
  inputs: ['data']
})

export class LineChartComponent {
  public data: any ;
  // value date time ranger
  public mainInput = {
    start: moment().subtract(30, 'day'),
    end: moment()
  }
  public optionsDateFitter: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    startDate: moment().subtract(1, 'month'),
    endDate: moment()
  };


  constructor() {

  }
}
