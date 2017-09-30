import { Injectable } from '@angular/core';

@Injectable()
export class PromotionReportService {
  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  getPointPromotionChart() {
    let lineChartData: Array<any> = [
      {
        data: [
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400)
        ],
        label: 'Điểm đổi quà tặng',
        sum: [this.random(100, 400), this.random(100, 400), this.random(100, 400), this.random(100, 400)].reduce(function (a, b) { return a + b; }, 0),
        labelSum: 'mPoint'
      }
    ];

    let lineChartLabels: Array<any> = ['17/08', '19/08', '21/08', '23/08', '25/08'];
    let lineChartOptions: any = {
      maintainAspectRatio: false
    };
    let lineChartColors: Array<any> = [
      {
        fill: false,
        borderColor: '#FDD835',
      }
    ];
    let lineChartLegend: boolean = true;
    let lineChartType: string = 'line';
    return {
      datasets: lineChartData,
      labels: lineChartLabels,
      options: lineChartOptions,
      colors: lineChartColors,
      legend: lineChartLegend,
      chartType: lineChartType,
    };
  }

  getInteractiveChart() {
    let lineChartData: Array<any> = [
      {
        data: [
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400)
        ],
        label: 'Xem',
        sum: [this.random(100, 400), this.random(100, 400), this.random(100, 400), this.random(100, 400)].reduce(function (a, b) { return a + b; }, 0),
        labelSum: 'Lượt xem'
      }, {
        data: [
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400)
        ],
        label: 'Đổi ưu đãi',
        sum: [this.random(100, 400), this.random(100, 400), this.random(100, 400), this.random(100, 400)].reduce(function (a, b) { return a + b; }, 0),
        labelSum: 'Lượt ưu đãi'
      }, {
        data: [
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400)
        ],
        label: 'Đã nhận',
        sum: [this.random(100, 400), this.random(100, 400), this.random(100, 400), this.random(100, 400)].reduce(function (a, b) { return a + b; }, 0),
        labelSum: 'Lượt nhận ưu đãi'
      }
    ];

    let lineChartLabels: Array<any> = ['17/08', '19/08', '21/08', '23/08', '25/08'];
    let lineChartOptions: any = {
      maintainAspectRatio: false
    };
    let lineChartColors: Array<any> = [
      {
        fill: false,
        borderColor: '#9C27B0'
      }, {
        fill: false,
        borderColor: '#03A9F4',
      }, {
        fill: false,
        borderColor: '#FF9800',
      }
    ];
    let lineChartLegend: boolean = true;
    let lineChartType: string = 'line';
    return {
      datasets: lineChartData,
      labels: lineChartLabels,
      options: lineChartOptions,
      colors: lineChartColors,
      legend: lineChartLegend,
      chartType: lineChartType
    };
  }

  getPointPromotionOfCategory() {
    let proGressData: Array<any> = [
      {
        max: 1000,
        dynamic: 900,
        type: 'primary',
        category: 'Ẩm thực'
      }, {
        max: 1000,
        dynamic: 700,
        type: 'success',
        category: 'Giải trí'
      }, {
        max: 1000,
        dynamic: 500,
        type: 'warning',
        category: 'Mua sắm'
      }, {
        max: 1000,
        dynamic: 100,
        type: 'info',
        category: 'Làm đẹp'
      }, {
        max: 1000,
        dynamic: 40,
        type: 'danger',
        category: 'Khác'
      }
    ];
    return proGressData;
  }
  constructor() { }

}
