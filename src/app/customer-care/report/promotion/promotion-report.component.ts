import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionReportService } from './promotion-report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion-report.component.html',
  styleUrls: ['./promotion-report.component.scss'],
  providers: [PromotionReportService]
})
export class PromotionReportComponent implements OnInit {

  constructor(private router: Router, private _promotionService: PromotionReportService) {
    this.showhide1 = false;
    this.showhide = true;
  }
  public showhide: boolean;
  public showhide1: boolean;
  public changeShowHide() {
    this.showhide1 = true;
    this.showhide = false;
  }
  public changeHideShow() {
    this.showhide1 = false;
    this.showhide = true;
  }
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public daterangeFitter: any = {};
  public stringdaterangeFitter: string = '';
  public optionsDateFitter: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    startDate: moment().subtract(1, 'month'),
    endDate: moment()
  };
  public dateTimeMask: any = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  @ViewChild('elmDaterangeFitter') elmDaterangeFitter: ElementRef;

  /**
   * @method showDaterangeFitter
   * @description show ui change datetime rage
   * @param event
   */
  public showDaterangeFitter(event) {
    this.elmDaterangeFitter.nativeElement.click();
  }

  /**
   * @method selectedDateFitter
   * @description change datetime rage
   * @param value
   */
  public selectedDateFitter(value: any) {
    this.daterangeFitter.start = value.start;
    this.daterangeFitter.end = value.end;
    this.daterangeFitter.label = value.label;
  }
  public brandPrimary: string = '#20a8d8';
  public brandSuccess: string = '#4dbd74';
  public brandInfo: string = '#67c2ef';
  public brandWarning: string = '#f8cb00';
  public brandDanger: string = '#f86c6b';

  // convert Hex to RGBA
  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    let rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return rgba;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // lineChart1
  public lineChartData: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  // progress
  public max: number = 200;
  public showWarning: boolean;
  public dynamic: number;
  public type: string;
  public category: string;
  public proGressData: Array<any> = [
    {
      max: this.max,
      dynamic: this.dynamic,
      type: this.type,
      category: this.category
    }
  ];

  PointPromotionData: object = this._promotionService.getPointPromotionChart();
  PointPromotionOfCategoryData: object = this._promotionService.getPointPromotionOfCategory();
  InteractiveData: object = this._promotionService.getInteractiveChart();

  ngOnInit() {
  }

}
