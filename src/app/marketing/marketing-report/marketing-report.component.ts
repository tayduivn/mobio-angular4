import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-marketing-report',
  templateUrl: './marketing-report.component.html',
  styleUrls: ['./marketing-report.component.scss']
})
export class MarketingReportComponent implements OnInit {
  public chart: object;
  public chartreport: object;
  public daterangeFitter: any = {};
  public stringdaterangeFitter: string = '';
  public optionsDateFitter: any = {
    locale: {format: 'DD/MM/YYYY'},
    alwaysShowCalendars: false,
    startDate: moment().subtract(1, 'month'),
    endDate: moment()
  };
  public dateTimeMask: any = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  @ViewChild('elmDaterangeFitter') elmDaterangeFitter: ElementRef;

  public showDaterangeFitter(event) {
    this.elmDaterangeFitter.nativeElement.click();
  }

  public selectedDateFitter(value: any) {
    this.daterangeFitter.start = value.start;
    this.daterangeFitter.end = value.end;
    this.daterangeFitter.label = value.label;
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getMarketingReportChart() {
    let lineChartData: Array<any> = [
      {
        data: [
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400)
        ],
        label: 'Tiếp cận'
      }, {
        data: [
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400)
        ],
        label: 'Mo'
      }
    ];

    let lineChartLabels: Array<any> = ['17/08', '19/08', '21/08', '23/08', '25/08'];
    let lineChartOptions: any = {
      maintainAspectRatio: false,
      animation: {
        duration: 0, // general animation time
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
      },
      legend: {
        position: 'top',
        fullWidth: false,
        labels: {
          boxWidth: 12,
          padding: 70
        }
      }
    };
    let lineChartColors: Array<any> = [
      {
        fill: false,
        borderColor: '#606060',
        backgroundColor: '#606060'
      }, {
        fill: false,
        borderColor: '#F85061',
        backgroundColor: '#F85061'
      }
    ];
    let lineChartLegend: boolean = true;
    let lineChartType: string = 'line';
    this.chart = {
      datasets: lineChartData,
      labels: lineChartLabels,
      options: lineChartOptions,
      colors: lineChartColors,
      legend: lineChartLegend,
      chartType: lineChartType,
    };
  }

  getMarketingChart() {
    let lineChartData: Array<any> = [
      {
        data: [
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400)
        ],
        label: 'Lấy mã'
      }, {
        data: [
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400)
        ],
        label: 'Sử dụng mã'
      }
    ];

    let lineChartLabels: Array<any> = ['17/08', '19/08', '21/08', '23/08', '25/08'];
    let lineChartOptions: any = {
      maintainAspectRatio: false,
      animation: {
        duration: 0, // general animation time
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
      },
      legend: {
        position: 'top',
        fullWidth: false,
        labels: {
          boxWidth: 12,
          padding: 70
        }
      }
    };
    let lineChartColors: Array<any> = [
      {
        fill: false,
        borderColor: '#C44518',
        backgroundColor: '#C44518'
      }, {
        fill: false,
        borderColor: '#F8C255',
        backgroundColor: '#F8C255'
      }
    ];
    let lineChartLegend: boolean = true;
    let lineChartType: string = 'line';
    this.chartreport = {
      datasets: lineChartData,
      labels: lineChartLabels,
      options: lineChartOptions,
      colors: lineChartColors,
      legend: lineChartLegend,
      chartType: lineChartType,
    };
  }

  constructor() {
  }

  ngOnInit() {
    this.getMarketingReportChart();
    this.getMarketingChart();
  }
}
