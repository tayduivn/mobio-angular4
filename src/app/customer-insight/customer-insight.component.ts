/**
 * @module customer-insight
 * @author ManhNV - TungNT
 * @description customer insight data
 */

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CardPatternService } from '../common/service/component-service/card-pattern.service';
import { CardPattern } from '../customer-care/content/card-pattern/card-pattern.model';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { CustomerInsightsService } from '../common/service/component-service/customer-insights.service';
import { NumberCustomer, ReportRating } from './customer-insight.model';
import commonConfig from '../common/config/common.config';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-insight',
  templateUrl: './customer-insight.component.html',
  styleUrls: ['./customer-insight.component.scss']
})
export class CustomerInsightComponent implements OnInit {
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

  public customerinsight: object;
  public cardTypeReport: object;
  // ----- card type config chart ---------
  public cardTypeOption: any = {
    legend: { position: 'false' },
    cutoutPercentage: 75,
    animation: {
      duration: 0, // general animation time
    }
  };

  // ---- age config chart -----------------------
  public ageReportLabel: string[] = ['<18', '18-24', '25-34', '35-44', '45-54', '>55'];
  public ageOption: any = {
    legend: { position: 'false' },
    cutoutPercentage: 75,
    animation: {
      duration: 0, // general animation time
    }
  };
  public ageReportColor: any[] = [
    {
      backgroundColor: commonConfig.color.slice(0, 6)
    }
  ];
  public ageReportData: Array<any> = [350, 450, 100, 100, 150, 200];
  public ageReportType: string = 'doughnut';

  // ---- gender config chart -------------------
  public genderReportLabel: string[] = ['Không xác định', 'Nam', 'Nữ'];
  public genderOption: any = {
    legend: { position: 'false' },
    cutoutPercentage: 75,
    animation: {
      duration: 0, // general animation time
    }
  };
  public genderReportColor: any[] = [
    {
      backgroundColor: commonConfig.color.slice(0, 3)
    }
  ];
  public genderReportData: Array<any> = [350, 450, 100];
  public genderReportType: string = 'doughnut';

  // ---- os config chart ------------------------
  public osReportLabel: string[] = ['Android', 'IOS', 'Khác'];
  public osOption: any = {
    legend: { position: 'false' },
    cutoutPercentage: 75,
    animation: {
      duration: 0, // general animation time
    }
  };
  public osReportColor: any[] = [
    {
      backgroundColor: commonConfig.color.slice(0, 3)
    }
  ];
  public osReportData: Array<any> = [350, 450, 100];
  public osReportType: string = 'doughnut';


  // common data ---------------------------------------------------------------------
  public cardPatterns: CardPattern[];
  public toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    limit: 4,
    timeout: 5000,
    animationClass: 'flyRight'
  });
  public reportRating: ReportRating;
  public numberCurrentCustomer: NumberCustomer;
  public numberCustomerInteractive: NumberCustomer;
  public numberCustomerDeleteRatio: NumberCustomer;
  public numberNewCustomer: NumberCustomer;

  constructor(private _cardPatternService: CardPatternService,
    private _customerInsightsService: CustomerInsightsService,
    private _router: Router,
    private _toasterService: ToasterService) {
    // ------- sub circle report --------------------------------
    this.filterReportCircle();
    // this.cardTypeReportLabels = ['x', 'y', 'z'];
  }

  ngOnInit() {
    this.initChartBaseData();
    this.initNumberReportCustomer();
    this.getCustomerInsightChart();
    // init card pattern filter
    this._cardPatternService.getCardPatterns({ page: -1 })
      .subscribe(data => {
        this.cardPatterns = data.cards.length === 0 ? []
          : data.cards.reverse().map(CardPatternService.toCardPattern);
      });
    // ------------------------ report rating -------------------
    this._customerInsightsService.getRatingReport()
      .subscribe(data => {
        this.reportRating = data;
      }, this.funcError);
  }

  // ====== SUB FUNCTION INIT =====================================================
  public initChartBaseData() {
    this.initChardLineCustomer();
    this.initChartCardTemplate();
  }

  /**
   * @method initNumberReportCustomer
   * @description init each number report float right in screen
   */
  public initNumberReportCustomer() {
    this._customerInsightsService.getNumberCurrentCustomer()
      .subscribe(data => {
        this.numberCurrentCustomer = data;
      }, this.funcError);
    this._customerInsightsService.getNumberCustomerInteractive()
      .subscribe(data => {
        this.numberCustomerInteractive = data;
      }, this.funcError);
    this._customerInsightsService.getNumberCustomerDeleteRatio()
      .subscribe(data => {
        this.numberCustomerDeleteRatio = data;
      }, this.funcError);
    this._customerInsightsService.getNumberNewCustomer()
      .subscribe(data => {
        this.numberNewCustomer = data;
      }, this.funcError);
  }

  /**
   * @method initChart
   * @description init new chart de
   */
  public initChardLineCustomer() {
    let lineChartData: Array<any> = [
      {
        data: [100, 100, 100, 100, 100],
        label: 'Mới'
      },
      {
        data: [100, 100, 100, 100, 100],
        label: 'Mua tại cửa hàng'
      },
      {
        data: [100, 100, 100, 100, 100],
        label: 'Mua qua mobio'
      }
    ];

    let lineChartLabels: Array<any> = ['', '', '', '', ''];
    let lineChartOptions: any = {
      maintainAspectRatio: false,
    };
    let lineChartColors: Array<any> = [
      {
        fill: false,
        borderColor: '#70C159',
        backgroundColor: '#70C159'
      }, {
        fill: false,
        borderColor: '#C44518',
        backgroundColor: '#c44518'
      }, {
        fill: false,
        borderColor: '#37B7F7',
        backgroundColor: '#37b7f7'
      }
    ];
    let lineChartLegend: boolean = true;
    let lineChartType: string = 'line';
    this.customerinsight = {
      datasets: lineChartData,
      labels: lineChartLabels,
      options: lineChartOptions,
      colors: lineChartColors,
      legend: lineChartLegend,
      chartType: lineChartType,
    };
  }

  /**
   * @method initChartCardTemplate
   */
  public initChartCardTemplate() {
    let self = this;
    self.cardTypeReport = {
      data: [100, 100, 100],
      labels: ['Thẻ thành viên', 'Thẻ vip', 'Thẻ vàng'],
      chartType: 'doughnut'
    };
  }

  /**
   * @method getCustomerInsightChart
   * @description get chart customer insight
   */
  public getCustomerInsightChart() {
    this._customerInsightsService.getReportCustomerInsight()
      .subscribe(reportCustom => {
        let lineChartData: Array<any> = [
          {
            data: reportCustom.report.data.map(item => item.news),
            label: 'Mới'
          },
          {
            data: reportCustom.report.data.map(item => item.purchase_offline),
            label: 'Mua tại cửa hàng'
          },
          {
            data: reportCustom.report.data.map(item => item.purchase_online),
            label: 'Mua qua mobio'
          }
        ];
        const lineChartOptions: any = {
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
              padding: 50
            }
          }
        };
        const lineChartColors: Array<any> = [
          {
            fill: false,
            borderColor: '#70C159',
            backgroundColor: '#70C159'
          }, {
            fill: false,
            borderColor: '#C44518',
            backgroundColor: '#c44518'
          }, {
            fill: false,
            borderColor: '#37B7F7',
            backgroundColor: '#37b7f7'
          }
        ];
        let lineChartLegend: boolean = true;
        let lineChartType: string = 'line';
        this.customerinsight = {
          datasets: lineChartData,
          // labels: lineChartLabels,
          options: lineChartOptions,
          colors: lineChartColors,
          legend: lineChartLegend,
          chartType: lineChartType,
        };
        Observable.timer(200)
          .subscribe(() => {
            this.customerinsight['labels'] = reportCustom.report.data
              .map(item => item.time.substring(8, 10) + '/' + item.time.substring(5, 7));
          })
      }, this.funcError);
  }

  // ====== SUB FUNCTION FILTER ===================================================
  /**
   * @method filterCardType
   * @description filter with list card pattern type
   * @param {string} idCardPattern
   */
  public filterCardType(idCardPattern: string) {
    console.log(idCardPattern);
    this.featureUpgrade();
  }

  /**
   * @method filterAge
   * @description filter with range age
   * @param {number} ageRanger
   */
  public filterAge(ageRanger: number) {
    console.log(ageRanger);
    this.featureUpgrade();
  }

  /**
   * @method filterGender
   * @description filter with gender information
   * @param {number} gender
   * ** 1 <=> male
   * ** 2 <=> female
   * ** 0 <=> unknown
   */
  public filterGender(gender: number) {
    console.log(gender);
    this.featureUpgrade();
  }

  /**
   * @method filterOs
   * @param _osType
   * ** 1 <=> IOS
   * ** 2 <=> Android
   * ** 3 <=> #
   */
  public filterOs(_osType: string) {
    let osType = parseInt(_osType, 10);
    console.log(osType);
    this.featureUpgrade();
  }

  /**
   * @method filterSatisfaction
   * @param {string} _valueSatisfaction
   */
  public filterSatisfaction(_valueSatisfaction: string) {
    let valueSatisfaction = parseInt(_valueSatisfaction, 10);
    console.log(valueSatisfaction);
    this.featureUpgrade();
  }

  // ====== SUB FUNCTION CARD CIRCLE ==============================================
  /**
   * @method filterReportCircle
   * @description filter data report circle
   */
  public filterReportCircle() {
    // pipe card-type
    this._customerInsightsService.getPipeCardType()
      .subscribe(data => {
        let self = this;
        let cardLabelTemp = [];
        let cardDataTemp = [];
        for (let i = 0; i < data.report.data.length; i++) {
          cardLabelTemp.push(data.report.data[i].nameCard);
          cardDataTemp.push(data.report.data[i].number);
        }
        let pieChartType: string = 'doughnut';
        self.cardTypeReport = {
          data: cardDataTemp,
          chartType: pieChartType,
          colors: [{
            backgroundColor: commonConfig.color.slice(0, data.report.data.length)
          }]
        };
        Observable.timer(200)
          .subscribe(() => {
            self.cardTypeReport['labels'] = cardLabelTemp;
          })
      });
    // pipe age
    this._customerInsightsService.getPipeChartAgeRange()
      .subscribe(data => {
        Observable.timer(200)
          .subscribe(() => {
            let self = this;
            self.ageReportLabel = [];
            self.ageReportData = [];
            self.ageReportColor[0].backgroundColor = commonConfig.color.slice(0, data.report.data.length);
            for (let i = 0; i < data.report.data.length; i++) {
              self.ageReportLabel.push(data.report.data[i].name);
              self.ageReportData.push(data.report.data[i].number);
            }
          });
      });
    // pipe gender
    this._customerInsightsService.getPipeChartGender()
      .subscribe(data => {
        Observable.timer(200)
          .subscribe(() => {
            let self = this;
            self.genderReportLabel = [];
            self.genderReportData = [];
            self.genderReportColor[0].backgroundColor = commonConfig.color.slice(0, data.report.data.length);
            for (let i = 0; i < data.report.data.length; i++) {
              const gender: number = data.report.data[i].gender;
              const genderMap: string = gender === 1 ? 'Không xác định' : gender === 2 ? 'Nam' : 'Nữ';
              self.genderReportLabel.push(genderMap);
              self.genderReportData.push(data.report.data[i].number);
            }
          });
      });
    // pipe os
    this._customerInsightsService.getPipeChartOS()
      .subscribe(data => {
        if (data.report.data.length !== 0)
          Observable.timer(200)
            .subscribe(() => {
              let self = this;
              self.osReportLabel = [];
              self.osReportData = [];
              self.osReportColor[0].backgroundColor = commonConfig.color.slice(0, data.report.data.length);
              for (let i = 0; i < data.report.data.length; i++) {
                self.osReportLabel.push(data.report.data[i].op);
                self.osReportData.push(data.report.data[i].number);
              }
            });
      });
  }

  public chartClicked(event: any) {
    console.log(event);
  }

  // ====== SUB FUNCTION COMMON ==================================================
  public featureUpgrade() {
    this._toasterService.pop('info', null, 'Chức năng này sẽ được hoàn thiện trong phiên bản sắp tới');
  }

  public loadMoreLocation() {
    this.featureUpgrade();
  }

  /**
   * @method funcError
   * @description function common error
   * @param err
   */
  funcError = (err) => {
    this._toasterService.clear();
    console.log(err);
    this._toasterService.pop('error', null, err.D);
    if (err.status === 401) {
      Observable.timer(2000)
        .subscribe(() => {
          this._router.navigate(['login']);
        });
    }
  };
}
