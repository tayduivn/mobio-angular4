import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FootTrafficReportService } from '../../../common/service/component-service/foot-traffic-report.service';
import { CustomerVisit, PieChartCustomer, FootTraffic } from './foot-traffic-report.model';
import { Shop } from '../../content/shop/shop.model';
import { Observable } from 'rxjs/Observable';
import { Paging } from '../../../common/model/paging';
import { Category } from '../../../common/model/category.model';
import { CategoryService } from '../../../common/service/common-service/category.service';
import { TabsetComponent } from 'ngx-bootstrap';
import * as _ from 'lodash'
import * as moment from 'moment';

@Component({
  selector: 'foot-traffic',
  templateUrl: './foot-traffic-report.component.html',
  styleUrls: ['./foot-traffic-report.component.scss']
})
export class FootTrafficReportComponent implements OnInit {

  public paging: Paging;
  public isNull: boolean;
  public shops: Shop[];
  public foottraffic: any;
  public chartCustomer: CustomerVisit[];
  public piechartcustomer: PieChartCustomer[];
  public newCustomer: any;
  public returnCustomer: any;
  public categories: Category[];
  public categoriesByModal: Category[];
  public customerValue: any[] = new Array();
  public visitedValue: any[] = new Array();
  public timeValue: any[] = new Array();
  public RateOfCustomerData: object;
  public NumberOfCustomerData: object;

  @ViewChild('searchShop') searchShop: ElementRef;
  @ViewChild('shopChek') shopCheck: ElementRef;
  @ViewChild('searchFoottraffic') searchFoottraffic: ElementRef;
  @ViewChild('tab') tab: TabsetComponent;
  @ViewChild('showStateItem') showStateItem: ElementRef;
  @ViewChild('hideStateItem') hideStateItem: ElementRef;
  @ViewChild('allowChangeItem') allowChangeItem: ElementRef;
  @ViewChild('dontAllowChangeItem') dontAllowChangeItem: ElementRef;

  constructor(private router: Router, private _footTrafficService: FootTrafficReportService, private _categoryService: CategoryService) {
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    }
  }
  // value filter chart visited
  public dataFilterChartVisited = {
    start: moment().subtract(30, 'day').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD')
  }
  // value filter shop
  public dataFilterShop = {
    ChuoiTimKiem: '',
    page: 1,
    per_page: 10000
  }
  // value filter pie chart
  public dataFilterPieChart = {
    start: moment().subtract(30, 'day').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD')
  }
  // value filter report
  public dataFilter: any = {
    type: '1',
    start: moment().subtract(30, 'day').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
    stores: '9c4550c2-922b-11e7-98c4-0242ac160008',
    ChuoiTimKiem: '',
    TrangThai: '',
    MaDanhMuc: '',
    TrangThaiHieuLuc: '',
    per_page: 5,
    page: 1,
  };
  // display date time
  public mainInput = {
    start: moment().subtract(30, 'day'),
    end: moment()
  }
  // filter chart datetime
  private selectedDateLineChart(value: any, dateInput: any) {
    this.timeValue = [];
    dateInput.start = value.start;
    dateInput.end = value.end;
    this.dataFilterChartVisited.start = value.start.format('YYYY-MM-DD');
    this.dataFilterChartVisited.end = value.end.format('YYYY-MM-DD');
    this.getDataChartCustomerVisited();
  }
  // filter pie chart datetime

  private selectedDatePieChart(value: any, dateInput: any) {
    dateInput.start = value.start;
    dateInput.end = value.end;
    this.dataFilterPieChart.start = value.start.format('YYYY-MM-DD');
    this.dataFilterPieChart.end = value.end.format('YYYY-MM-DD');
    this.getPieChartCustomer();
  }
  private selectedDateList(value: any, dateInput: any) {
    dateInput.start = value.start;
    dateInput.end = value.end;
    this.dataFilter.start = value.start.format('YYYY-MM-DD');
    this.dataFilter.end = value.end.format('YYYY-MM-DD');
    this.getListFoottraffic();
  }
  // value date time ranger;
  public optionsDateFitter: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    startDate: moment().subtract(30, 'day'),
    endDate: moment()
  };


  // search Foottraffic
  public searchFoottrafficReport() {
    if (this.searchFoottraffic.nativeElement.value !== '') {
      this.dataFilter.ChuoiTimKiem = this.searchFoottraffic.nativeElement.value;
    } else {
      this.dataFilter.ChuoiTimKiem = '';
    }
    this.getListFoottraffic();
  }

  // change state
  public filterStateShow(event: any) {
    if (this.showStateItem.nativeElement.checked) {
      if (this.hideStateItem.nativeElement.checked)
        this.dataFilter.TrangThai = '';
      else this.dataFilter.TrangThai = '1';
    } else if (this.hideStateItem.nativeElement.checked) {
      this.dataFilter.TrangThai = '2';
    } else {
      this.dataFilter.TrangThai = '';
    }
    this.getListFoottraffic();
  }

  // change state
  public filterAllowChange(event: any) {
    if (this.allowChangeItem.nativeElement.checked) {
      if (this.dontAllowChangeItem.nativeElement.checked)
        this.dataFilter.TrangThaiHieuLuc = '';
      else this.dataFilter.TrangThaiHieuLuc = '1';
    } else if (this.dontAllowChangeItem.nativeElement.checked) {
      this.dataFilter.TrangThaiHieuLuc = '2';
    } else {
      this.dataFilter.TrangThaiHieuLuc = '';
    }
    this.getListFoottraffic();
  }

  // change type report
  public getTabValue() {
    if (this.tab.tabs[0].active) {
      this.dataFilter.type = '1';
      this.dataFilter.stores = '9c4550c2-922b-11e7-98c4-0242ac160008';
    }
    this.getListFoottraffic();
  }

  public getTabValue1() {
    if (this.tab.tabs[1].active) {
      this.dataFilter.type = '2'
      this.dataFilter.stores = ''
    }
    this.getListFoottraffic();
  }

  // filter category
  public filterCategory(event: any, idCategory: string) {
    if (event.currentTarget.checked) {
      this.dataFilter.MaDanhMuc += `${idCategory},`;
    } else {
      this.dataFilter.MaDanhMuc = _.replace(this.dataFilter.MaDanhMuc, idCategory + ',', '');
    }
    this.getListFoottraffic();
  }

  // change perpage and get current page
  public changePerPage(_perPage: number) {
    this.dataFilter.per_page = _perPage;
    this.getListFoottraffic();
  }

  public getCurrentPage(_pageSelected: number) {
    this.dataFilter.page = _pageSelected;
    this.getListFoottraffic(_pageSelected);
  }

  // search shop
  public searchAllShop(event: any) {
    if (this.searchShop.nativeElement.value !== '') {
      this.dataFilterShop.ChuoiTimKiem = this.searchShop.nativeElement.value;
    } else {
      this.dataFilterShop.ChuoiTimKiem = '';
    }
    this.getShop();
  }

  // get data shop
  private getShop() {
    this._footTrafficService.getShops(this.dataFilterShop)
      .subscribe(
      data => {
        this.shops = data.stores.map(FootTrafficReportService.toShop);
      }
      );
  }

  // filter data foottraffic
  public filterFoottraffic(event: any, idShop: string) {
    if (event.currentTarget.checked) {
      this.dataFilter.stores += `,${idShop},`;
    } else {
      this.dataFilter.stores = _.replace(this.dataFilter.stores, idShop + ',', '');
    }
    this.getListFoottraffic();
  }

  // get data chart customer visited
  private getDataChartCustomerVisited() {
    this._footTrafficService.getChartCustomerVisited(this.dataFilterChartVisited)
      .subscribe(
      data => {
        this.chartCustomer = [data['report']].map(FootTrafficReportService.toChartCustomerVisited);
        for (let i = 0; i < this.chartCustomer.length; i++) {
          for (let j = 0; j < this.chartCustomer[i].data.length; j++) {
            this.customerValue.push(this.chartCustomer[i].data[j].numberOfCustomer);
            this.visitedValue.push(this.chartCustomer[i].data[j].numberOfVisited);
            let datetime = new Date(this.chartCustomer[i].data[j].time);
            let date = datetime.getDate();
            let month = datetime.getMonth() + 1;
            this.timeValue.push(date + '-' + month);
          }
        }
        let lineChartData: Array<any> = [
          {
            data: this.visitedValue,
            label: 'Số lượt'
          },
          {
            data: this.customerValue,
            label: 'Số khách hàng',
          },
        ];

        let lineChartLabels: Array<any> = this.timeValue;
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
            fullWidth: true,
            labels: {
              boxWidth: 12
            }
          }
        };
        let lineChartColors: Array<any> = [
          {
            fill: false,
            borderColor: '#FDD835',
            backgroundColor: '#FDD835'
          },
          {
            fill: false,
            borderColor: '#806ec1',
            backgroundColor: '#806ec1'
          }
        ];
        let lineChartLegend: boolean = true;
        let lineChartType: string = 'line';

        this.NumberOfCustomerData = {
          datasets: lineChartData,
          labels: lineChartLabels,
          options: lineChartOptions,
          colors: lineChartColors,
          legend: lineChartLegend,
          chartType: lineChartType
        };
      }
      )
  }

  // get pie chart customer data
  private getPieChartCustomer() {
    this._footTrafficService.getPieChartCustomer(this.dataFilterPieChart)
      .subscribe(
      data => {
        this.piechartcustomer = [data['report']].map(FootTrafficReportService.toPieCharCustomer);
        for (let i = 0; i < this.piechartcustomer.length; i++) {
          this.newCustomer = this.piechartcustomer[i].data.newCustomer;
          this.returnCustomer = this.piechartcustomer[i].data.return;
        }
        let pieChartLabels: string[] = ['Mới', 'Quay lại'];
        let pieChartData: number[] = [this.newCustomer, this.returnCustomer];
        let pieChartType: string = 'pie';
        let pieChartColors: any[] = [
          {
            backgroundColor: ['#2196F3', '#4CAF50']
          }
        ];
        let pieChartOptions: any = {
          legend: {
            display: false
          },
          animation: {
            duration: 0, // general animation time
          }
        }
        this.RateOfCustomerData = {
          data: pieChartData,
          options: pieChartOptions,
          labels: pieChartLabels,
          chartType: pieChartType,
          colors: pieChartColors
        };
      }
      )
  }

  // get list foottraffic
  private getListFoottraffic(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._footTrafficService.getListFootTraffic(this.dataFilter)
      .subscribe(
      data => {
        this.foottraffic = data.D ? [data.D] : [data['report']].map(FootTrafficReportService.toFootTraffic);
        console.log(this.foottraffic);
      }
      )
  }


  ngOnInit() {
    this.getShop();
    this.getDataChartCustomerVisited();
    this.getPieChartCustomer();
    this.getListFoottraffic();
    this._categoryService.getCategories()
      .subscribe(
      dataCategories => {
        let categoriesTemp = dataCategories;
        _.map(categoriesTemp, category => category['idCategory'] = category['idCategory'].replace('&', '%26'));
        this.categories = categoriesTemp;
        this.categoriesByModal = categoriesTemp;
      });
  }

}
