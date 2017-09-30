import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {GiftReportService} from '../../../common/service/component-service/gift-report.service';
import {
  GiftPoint,
  GiftCategory,
  GiftInteractive,
  GiftPresent,
  PresentDetail,
  PresentTransaction
} from './gift-report.model';
import {PromotionService} from '../../../common/service/component-service/promotion.service';
import {PromotionType} from '../../content/promotion/promotion.model';
import {Paging} from '../../../common/model/paging';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-gift',
  templateUrl: './gift-report.component.html',
  styleUrls: ['./gift-report.component.scss']
})
export class GiftReportComponent implements OnInit {

  constructor(private router: Router,
              private _giftService: GiftReportService,
              private _promotionService: PromotionService) {
    this.showhide1 = false;
    this.showhide = true;
    this.paging = {
      total_page: 0,
      per_page: 10,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
    this.hidden = true;
  }

  public dataFilter = {
    page: 1,
    per_page: 10,
    MaDanhMuc: '',
    TrangThai: '',
    TrangThaiDoiDiem: '',
    ChuoiTimKiem: ''
  };

  @ViewChild('showStateItem') showStateItem: ElementRef;
  @ViewChild('hideStateItem') hideStateItem: ElementRef;
  @ViewChild('allowChangeItem') allowChangeItem: ElementRef;
  @ViewChild('dontAllowChangeItem') dontAllowChangeItem: ElementRef;
  @ViewChild('searchItem') searchItem: ElementRef;

  public hidden: boolean;
  public presentdetail: PresentDetail[];
  public transaction: PresentTransaction[];
  public promotionTypesModal: PromotionType[];
  public promotionTypes: PromotionType[];
  public paging: Paging;
  public giftpresent: GiftPresent[];
  public PointGiftData: object;
  public PointGiftOfCategoryData: any[] = Array();
  public InteractiveData: object;
  public giftinteractive: GiftInteractive[];
  public receivedValue: any[] = new Array();
  public receivedTime: any[] = new Array();
  public receivedSum: number;
  public viewValue: any[] = new Array();
  public viewTime: any[] = new Array();
  public viewSum: number;
  public purchaseValue: any[] = new Array();
  public purchaseTime: any[] = new Array();
  public purchaseSum: number;
  public giftcategory: GiftCategory[];
  public categoryName: any[] = new Array();
  public categoryValue: any[] = new Array();
  public giftSum: number = 0;
  public giftValue: any[] = new Array();
  public giftTime: any[] = new Array();
  public giftpoint: GiftPoint[];
  public showhide: boolean;
  public showhide1: boolean;

  public changeHideShow() {
    if (this.hidden) {
      this.hidden = false
    } else {
      this.hidden = true
    }
  }

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
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

  public changePerPage(_perPage: number) {
    this.dataFilter.per_page = _perPage;
    this.filterGiftPresent();
  }

  public getCurrentPage(_pageSelected: number) {
    this.dataFilter.page = _pageSelected;
    this.filterGiftPresent(_pageSelected);
  }

  // change status
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
    this.filterGiftPresent()
  }

  // search promotion
  public searchProduct(event: any) {
    if (this.searchItem.nativeElement.value !== '') {
      this.dataFilter.ChuoiTimKiem = this.searchItem.nativeElement.value;
    }
    this.filterGiftPresent()
  }

  // show detail promotion
  public showPromotionDetail(_idPromotion: string, _setPage: number) {
    this._giftService.getPresentDetail(_idPromotion)
      .subscribe(
        (data: any) => {
          this.presentdetail = data['reports'].map(GiftReportService.toPresentDetail);
          this.hidden = false;
        }
      );
    this.dataFilter.per_page = _setPage
    this._giftService.getPresentTransaction(_idPromotion, this.dataFilter)
      .subscribe(
        (data: any) => {
          this.transaction = data['transaction'].map(GiftReportService.toPresentTransaction);
        }
      )
  }

  // change status
  public filterAllowChange(event: any) {
    if (this.allowChangeItem.nativeElement.checked) {
      if (this.dontAllowChangeItem.nativeElement.checked)
        this.dataFilter.TrangThaiDoiDiem = '';
      else this.dataFilter.TrangThaiDoiDiem = '1';
    } else if (this.dontAllowChangeItem.nativeElement.checked) {
      this.dataFilter.TrangThaiDoiDiem = '2';
    } else {
      this.dataFilter.TrangThaiDoiDiem = '';
    }
    this.filterGiftPresent()
  }

  // filter in promotin
  public filterPromotion(event: any, _codePromotionType: string) {
    if (event.currentTarget.checked) {
      this.dataFilter.MaDanhMuc += `${_codePromotionType},`;
    } else {
      this.dataFilter.MaDanhMuc = _.replace(this.dataFilter.MaDanhMuc, _codePromotionType + ',', '');
    }
    this.filterGiftPresent();
  }

  // get chart data gift point
  private filterGiftPoint() {
    this._giftService.getPointGiftChart(this.dataFilter)
      .subscribe(
        data => {
          this.giftpoint = [data['reports']].map(GiftReportService.toGiftPoint);
          for (let i = 0; i < this.giftpoint.length; i++) {
            this.giftSum = this.giftpoint[i].sumary;
            for (let j = 0; j < this.giftpoint[i].data.length; j++) {
              this.giftValue.push(this.giftpoint[i].data[j].value);
              let datetime = new Date(this.giftpoint[i].data[j].time);
              let date = datetime.getDate();
              let month = datetime.getMonth() + 1;
              this.giftTime.push(date + '-' + month);
            }
          }
          let lineChartData: Array<any> = [
            {
              data: this.giftValue,
              label: 'Điểm đổi quà tặng',
              sum: this.giftSum,
              labelSum: 'mPoint'
            }
          ];

          let lineChartLabels: Array<any> = this.giftTime;
          let lineChartOptions: any = {
            maintainAspectRatio: false
          };
          let lineChartColors: Array<any> = [
            {
              fill: false,
              borderColor: '#FDD835',
              backgroundColor: '#FDD835'
            }
          ];
          let lineChartLegend: boolean = true;
          let lineChartType: string = 'line';
          this.PointGiftData = {
            datasets: lineChartData,
            labels: lineChartLabels,
            options: lineChartOptions,
            colors: lineChartColors,
            legend: lineChartLegend,
            chartType: lineChartType,
          };
        }
      );
  }

  // chart data gift category
  private filterGiftCategory() {
    this._giftService.getGiftCategory(this.dataFilter)
      .subscribe(
        data => {
          this.giftcategory = [data['reports']].map(GiftReportService.toGiftCategory);
          for (let i = 0; i < this.giftcategory.length; i++) {
            for (let j = 0; j < this.giftcategory[i].data.length; j++) {
              this.categoryName.push(this.giftcategory[i].data[j].idCategory);
              this.categoryValue.push(this.giftcategory[i].data[j].value);
            }
          }
          this.PointGiftOfCategoryData = [
            {
              max: this.categoryValue[0] + 100,
              dynamic: this.categoryValue[0],
              type: 'danger',
              category: 'Ẩm thực'
            }, {
              max: this.categoryValue[1] + 100,
              dynamic: this.categoryValue[1],
              type: 'warning',
              category: 'Giải trí'
            }, {
              max: this.categoryValue[2] + 100,
              dynamic: this.categoryValue[2],
              type: 'success',
              category: 'Mua sắm'
            }, {
              max: this.categoryValue[3] + 100,
              dynamic: this.categoryValue[3],
              type: 'info',
              category: 'Làm đẹp'
            }, {
              max: this.categoryValue[4] + 100,
              dynamic: this.categoryValue[4],
              type: 'purple',
              category: 'Khác'
            }
          ];
        }
      );
  }

  // get chart data gift interactive
  private filterGiftInteractive() {
    this._giftService.getGiftInteractive(this.dataFilter)
      .subscribe(
        data => {
          this.giftinteractive = [data['reports']].map(GiftReportService.toGiftInteractive);
          for (let i = 0; i < this.giftinteractive.length; i++) {
            this.receivedSum = this.giftinteractive[i].received.sumary;
            this.viewSum = this.giftinteractive[i].views.sumary;
            this.purchaseSum = this.giftinteractive[i].purchase.sumary;
            for (let j = 0; j < this.giftinteractive[i].received.data.length; j++) {
              this.receivedValue.push(this.giftinteractive[i].received.data[j].value);
              let datetime = new Date(this.giftinteractive[i].received.data[j].time);
              let date = datetime.getDate();
              let month = datetime.getMonth() + 1;
              this.receivedTime.push(date + '-' + month);
            }
            for (let j = 0; j < this.giftinteractive[i].views.data.length; j++) {
              this.viewValue.push(this.giftinteractive[i].views.data[j].value);
            }
            for (let j = 0; j < this.giftinteractive[i].purchase.data.length; j++) {
              this.purchaseValue.push(this.giftinteractive[i].purchase.data[j].value);
            }
          }
          let lineChartData: Array<any> = [
            {
              data: this.receivedValue,
              label: 'Xem',
              sum: this.receivedSum,
              labelSum: 'Lượt xem'
            }, {
              data: this.viewValue,
              label: 'Đổi quà tặng',
              sum: this.viewSum,
              labelSum: 'Lượt đổi quà'
            }, {
              data: this.purchaseValue,
              label: 'Đã nhận',
              sum: this.purchaseSum,
              labelSum: 'Lượt nhận quà'
            }
          ];
          let lineChartLabels: Array<any> = this.receivedTime;
          let lineChartOptions: any = {
            maintainAspectRatio: false
          };
          let lineChartColors: Array<any> = [
            {
              fill: false,
              borderColor: '#9C27B0',
              backgroundColor: '#9C27B0'
            }, {
              fill: false,
              borderColor: '#03A9F4',
              backgroundColor: '#03A9F4'
            }, {
              fill: false,
              borderColor: '#FF9800',
              backgroundColor: '#FF9800'
            }
          ];
          let lineChartLegend: boolean = true;
          let lineChartType: string = 'line';
          this.InteractiveData = {
            datasets: lineChartData,
            labels: lineChartLabels,
            options: lineChartOptions,
            colors: lineChartColors,
            legend: lineChartLegend,
            chartType: lineChartType
          };
        }
      );
  }

  // get data gift present
  private filterGiftPresent(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._giftService.getGiftPresent(this.dataFilter)
      .subscribe(
        data => {
          this.giftpresent = data.presents.map(GiftReportService.toGiftPresent);
          this.paging = data.paging;
          this.paging.page = _setPage;
        }
      );
  }


  ngOnInit() {
    this.filterGiftPoint();
    this.filterGiftCategory();
    this.filterGiftInteractive();
    this.filterGiftPresent();
    this._promotionService.getPromotionTypes()
      .subscribe(dataPromotionType => {
        this.promotionTypes = dataPromotionType;
      });
  }

}
