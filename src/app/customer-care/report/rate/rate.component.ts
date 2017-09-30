import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RateService } from '../../../common/service/component-service/rate.service';
import { CustomerRating, ChartRating } from './rate.model'
import { Shop } from '../../content/shop/shop.model';
import { Observable } from 'rxjs/Observable';
import { Paging } from '../../../common/model/paging';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash'

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent implements OnInit {
  public dataFilter = {
    DiemDanhGia: '1,2',
    stores: '',
    ChuoiTimKiem: '',
    page: 1,
    per_page: 5
  };
  public dataFilterShop = {
    ChuoiTimKiem: '',
    page: 1,
    per_page: 10000
  }
  public paging: Paging;
  public shops: Shop[];
  public HistoryRateData: object;
  public RatingValue1: any[] = new Array();
  public RatingValue2: any[] = new Array();
  public RatingValue3: any[] = new Array();
  public RatingValue4: any[] = new Array();
  public RatingValue5: any[] = new Array();
  public timeRating: any[] = new Array();
  public chartdata: ChartRating[];
  public customer: CustomerRating[];
  @ViewChild('ratingCheck') ratingCheck: ElementRef;
  @ViewChild('searchCustom') searchCustom: ElementRef;
  @ViewChild('searchShop') searchShop: ElementRef;
  @ViewChild('shopCheck') shopCheck: ElementRef;
  constructor(private router: Router, private _rateService: RateService) {
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
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

  public showDaterangeFitter(event) {
    this.elmDaterangeFitter.nativeElement.click();
  }

  public selectedDateFitter(value: any) {
    this.daterangeFitter.start = value.start;
    this.daterangeFitter.end = value.end;
    this.daterangeFitter.label = value.label;
  }
  public changePerPage(_perPage: number) {
    this.dataFilter.per_page = _perPage;
    this.filterCustomerRating();
  }
  public getCurrentPage(_pageSelected: number) {
    this.dataFilter.page = _pageSelected;
    this.filterCustomerRating(_pageSelected);
  }
  // filter rating
  public filterRating(event: any) {
    if (this.ratingCheck.nativeElement.checked) {
      this.dataFilter.DiemDanhGia = this.ratingCheck.nativeElement.value
    }
    this.filterCustomerRating();
  }
  // search customer rating
  public searchCustomerRating(even: any) {
    if (this.searchCustom.nativeElement.value !== '') {
      this.dataFilter.ChuoiTimKiem = this.searchCustom.nativeElement.value
    }
    this.filterCustomerRating();
  }
  // search shop
  public searchAllShop(even: any) {
    if (this.searchShop.nativeElement.value !== '') {
      this.dataFilterShop.ChuoiTimKiem = this.searchShop.nativeElement.value;
    } else {
      this.dataFilterShop.ChuoiTimKiem = '';
    }
    this.getShop();
  }
  // searh custom rating on shop
  public filterRatingShop(event: any) {
    if (this.shopCheck.nativeElement.checked) {
      this.dataFilter.stores = this.shopCheck.nativeElement.value;
    }
    this.filterCustomerRating();
  }
  // filter data customer rating
  private filterCustomerRating(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._rateService.getCustomerRating(this.dataFilter)
      .subscribe(
      data => {
        this.customer = [data['rating']] ? [] : [data['rating']].map(RateService.toCustomerRating);
        this.paging = data.paging;
        this.paging.page = _setPage;
      });
  }
  public filterFoottraffic(event: any, idShop: string) {
    if (event.currentTarget.checked) {
      this.dataFilter.stores += `,${idShop},`;
    } else {
      this.dataFilter.stores = _.replace(this.dataFilter.stores, idShop + ',', '');
    }
    this.filterCustomerRating();
  }
  // get data shop
  private getShop() {
    this._rateService.getShops(this.dataFilterShop)
      .subscribe(
      data => {
        this.shops = data.stores.map(RateService.toShop);
      }
      );
  }
  // Chart data
  private ChartDataRating() {
    this._rateService.getChartRating(this.dataFilter)
      .subscribe(
      data => {
        this.chartdata = [data['report']].map(RateService.toChartRating);
        for (let i = 0; i < this.chartdata.length; i++) {
          for (let j = 0; j < this.chartdata[i].data.length; j++) {
            this.RatingValue1.push(this.chartdata[i].data[j].rating_1);
            this.RatingValue2.push(this.chartdata[i].data[j].rating_2);
            this.RatingValue3.push(this.chartdata[i].data[j].rating_3);
            this.RatingValue4.push(this.chartdata[i].data[j].rating_4);
            this.RatingValue5.push(this.chartdata[i].data[j].rating_5);
            let datetime = new Date(this.chartdata[i].data[j].time);
            let date = datetime.getDate();
            let month = datetime.getMonth() + 1;
            this.timeRating.push(date + '-' + month);
          }
        }

        let lineChartData: Array<any> = [
          {
            data: this.RatingValue1,
            label: '1 Sao'
          },
          {
            data: this.RatingValue1,
            label: '2 Sao'
          }, {
            data: this.RatingValue1,
            label: '3 Sao'
          }, {
            data: this.RatingValue1,
            label: '4 Sao'
          }, {
            data: this.RatingValue1,
            label: '5 Sao'
          }
        ];

        let lineChartLabels: Array<any> = this.timeRating;
        let lineChartOptions: any = {
          maintainAspectRatio: false
        };
        let lineChartColors: Array<any> = [
          {
            fill: false,
            borderColor: '#C62828',
            backgroundColor: '#C62828'
          }, {
            fill: false,
            borderColor: '#FF9800',
            backgroundColor: '#FF9800'
          }, {
            fill: false,
            borderColor: '#FFEB3B',
            backgroundColor: '#FFEB3B'
          }, {
            fill: false,
            borderColor: '#8BC34A',
            backgroundColor: '#8BC34A'
          }, {
            fill: false,
            borderColor: '#4CAF50',
            backgroundColor: '#4CAF50'
          }
        ];
        let lineChartLegend: boolean = true;
        let lineChartType: string = 'line';
        this.HistoryRateData = {
          datasets: lineChartData,
          labels: lineChartLabels,
          options: lineChartOptions,
          colors: lineChartColors,
          legend: lineChartLegend,
          chartType: lineChartType
        };
         console.log(this.HistoryRateData)
      });
  }

  ngOnInit() {
    this.filterCustomerRating();
    this.ChartDataRating();
    this.getShop();
  }

}
