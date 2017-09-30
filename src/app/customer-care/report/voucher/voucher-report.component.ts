import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {VoucherReportService} from './voucher-report.service';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {ToasterService} from 'angular2-toaster';
import {TransactionVoucher, VoucherReport, VouchersReport} from './voucher-report.model';
import {Paging} from '../../../common/model/paging';
import {PromotionType} from '../../content/promotion/promotion.model';
import {PromotionService} from '../../../common/service/component-service/promotion.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-voucher-report',
  templateUrl: './voucher-report.component.html',
  styleUrls: ['./voucher-report.component.scss'],
  providers: [VoucherReportService]
})
export class VoucherReportComponent implements OnInit {
  public showhide: boolean;
  public showhide1: boolean;

  public changeHideShow() {
    this.showhide1 = false;
    this.showhide = true;
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

  PointVoucherData: object = this._voucherReportService.getPointVoucherChart();
  PointVoucherOfCategoryData: object = this._voucherReportService.getPointVoucherOfCategory();

  // Element prop =======
  // filter native element state
  @ViewChild('showStateItem') showStateItem: ElementRef;
  @ViewChild('hideStateItem') hideStateItem: ElementRef;
  // filter native element effect
  @ViewChild('acceptEffect') acceptEffect: ElementRef;
  @ViewChild('rejectEffect') rejectEffect: ElementRef;

  // ------ COMMON DATA -----------------------------------------------------
  public lineChartNumberVoucher: object;
  public vouchers: VoucherReport[];
  public dataFilter = {
    TrangThai: '', // 1:Visible, 2:Invisible
    TrangThaiHieuLuc: '', // 1:Valid, 2:Expire
    MaDanhMuc: '',
    ChuoiTimKiem: '',
    sort: '',
    order: '',
    page: 1, // default page select is 1
    per_page: 5 // default get 5 item
  };
  public keySearch: string = '';
  public paging: Paging;

  // data menu left
  public promotionTypes: PromotionType[];

  constructor(private _router: Router,
              private _toasterService: ToasterService,
              private _promotionService: PromotionService,
              private _voucherReportService: VoucherReportService) {
    this.showhide1 = false;
    this.showhide = true;
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 5
    };
    this.pagingTransaction = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
    this.lineChartNumberVoucher = this._voucherReportService.getInteractiveChart(); // init default line chart
  }

  ngOnInit() {
    this.getChartNumberVoucher();
    this.filterVoucher();
    this._promotionService.getPromotionTypes()
      .subscribe(dataPromotionType => {
        this.promotionTypes = dataPromotionType;
      });
  }

  // ==== FUNCTION INIT PAGE ====================================================
  // init line-chart
  /**
   * @method getChartNumberVoucher
   * @description get chart number voucher
   * @param params
   */
  public getChartNumberVoucher(params: any = {}) {
    this._voucherReportService.getLineChartNumberVoucher(params)
      .subscribe(data => {
        let lineChartData: Array<any> = [
          {
            data: data.reports.released.data.map(item => item.value),
            label: 'Phát hành',
            sum: data.reports.released.sumary,
            labelSum: 'Phát hành'
          }, {
            data: data.reports.used.data.map(item => item.value),
            label: 'Đã sử dụng',
            sum: data.reports.released.sumary,
            labelSum: 'Đã sử dụng'
          }
        ];

        let lineChartLabels: Array<any> = data.reports.released.data
          .map(item => item.time.substring(8, 10) + '/' + item.time.substring(5, 7));
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
        this.lineChartNumberVoucher = {
          datasets: lineChartData,
          options: lineChartOptions,
          colors: lineChartColors,
          legend: lineChartLegend,
          chartType: lineChartType
        };
        Observable.timer(200)
          .subscribe(() => {
            this.lineChartNumberVoucher['labels'] = lineChartLabels;
          })
      });
  }

  // ==== SUB FUNCTION FILTER ===================================================
  /**
   * @function filterVoucher
   * @description support filter voucher
   * @private
   */
  private filterVoucher(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._voucherReportService.getReportListVoucher(this.dataFilter)
      .subscribe(data => {
        // set data and add temp field select
        this.vouchers = data.vouchers.map(VoucherReportService.toVoucherReport);
        if (data.paging) {
          this.paging = data.paging;
          this.paging.page = _setPage;
        }
      }, this.funcError);
  }

  public getCurrentPage(_pageSelected: number) {
    this.dataFilter.page = _pageSelected;
    this.filterVoucher(_pageSelected);
  }

  public changePerPage(_perPage: number) {
    this.dataFilter.per_page = _perPage;
    this.filterVoucher();
  }

  public searchVoucher() {
    this.dataFilter.ChuoiTimKiem = this.keySearch;
    if (!this.keySearch) {
      this.dataFilter.ChuoiTimKiem = '';
    }
    this.filterVoucher();
  }

  /**
   * @method filterStateShow
   * @description filter by state product equal show (1)
   */
  public filterStateShow() {
    if (this.showStateItem.nativeElement.checked) {
      if (this.hideStateItem.nativeElement.checked)
        this.dataFilter.TrangThai = '';
      else this.dataFilter.TrangThai = '1';
    } else if (this.hideStateItem.nativeElement.checked) {
      this.dataFilter.TrangThai = '2';
    } else {
      this.dataFilter.TrangThai = '';
    }
    this.filterVoucher();
  }

  /**
   * @method filterStateHide
   * @description filter by state product equal hide (2)
   */
  public filterStateHide() {
    if (this.hideStateItem.nativeElement.checked) {
      if (this.showStateItem.nativeElement.checked)
        this.dataFilter.TrangThai = '';
      else this.dataFilter.TrangThai = '2';
    } else if (this.showStateItem.nativeElement.checked) {
      this.dataFilter.TrangThai = '1';
    } else {
      this.dataFilter.TrangThai = '';
    }
    this.filterVoucher();
  }

  /**
   * @method filterAcceptEffect
   * @description filter by state accept effect <-> value = 1
   */
  public filterAcceptEffect() {
    if (this.acceptEffect.nativeElement.checked) {
      if (this.rejectEffect.nativeElement.checked)
        this.dataFilter.TrangThaiHieuLuc = '';
      else this.dataFilter.TrangThaiHieuLuc = '1';
    } else if (this.rejectEffect.nativeElement.checked) {
      this.dataFilter.TrangThaiHieuLuc = '2';
    } else {
      this.dataFilter.TrangThaiHieuLuc = '';
    }
    this.filterVoucher();
  }

  /**
   * @method filterRejectEffect
   * @description filter by state reject effect <-> value = 2
   */
  public filterRejectEffect() {
    if (this.rejectEffect.nativeElement.checked) {
      if (this.acceptEffect.nativeElement.checked)
        this.dataFilter.TrangThaiHieuLuc = '';
      else this.dataFilter.TrangThaiHieuLuc = '2';
    } else if (this.acceptEffect.nativeElement.checked) {
      this.dataFilter.TrangThaiHieuLuc = '1';
    } else {
      this.dataFilter.TrangThaiHieuLuc = '';
    }
    this.filterVoucher();
  }

  // -------- filter category -----
  /**
   * @method filterCate
   * @description filter category
   * @param event
   * @param {string} _codePromotionType
   */
  public filterCate(event: any, _codePromotionType: string) {
    if (event.currentTarget.checked) {
      this.dataFilter.MaDanhMuc += `${_codePromotionType},`;
    } else {
      this.dataFilter.MaDanhMuc = _.replace(this.dataFilter.MaDanhMuc, _codePromotionType + ',', '');
    }
    this.filterVoucher();
  }

  // === SUB FUNCTION FILTER TRANSACTION ===========
  // function show infor voucher
  public changeShowHide(idVoucher: string) {
    // set selected voucher
    this.selectedVoucherID = idVoucher;
    // this.filterTransaction();
    let _setPage = 1;
    this.dataFilterTransaction.page = _setPage;
    this.filterTransaction();
    this.showhide1 = true;
    this.showhide = false;
  }

  public dataFilterTransaction = {
    ChuoiTimKiem: '',
    lang: '',
    page: 1, // default page select is 1
    per_page: 10 // default get 5 item
  };
  public selectedVoucherID: string = '';
  public transactions: TransactionVoucher[];
  public pagingTransaction: Paging;
  public keySearchTransaction: string = '';

  /**
   * @function filterTransaction
   * @description support filter voucher
   * @private
   */
  private filterTransaction(_setPage: number = 1) {
    this.dataFilterTransaction.page = _setPage;
    this._voucherReportService.getTransactions(this.selectedVoucherID, this.dataFilterTransaction)
      .subscribe(data => {
        // set data and add temp field select
        this.transactions = !data['transaction'] || data['transaction'].length === 0 ? []
          : data['transaction'].map(VoucherReportService.toTransactionReport);
        if (data.paging) {
          this.pagingTransaction = data.paging;
          this.pagingTransaction.page = _setPage;
        }
      }, this.funcError);
  }

  /**
   * @method getCurrentPageTransaction
   * @description get current new page transaction
   * @param _pageSelected
   */
  public getCurrentPageTransaction(_pageSelected: number) {
    this.dataFilterTransaction.page = _pageSelected;
    this.filterTransaction(_pageSelected);
  }

  /**
   * @method changePerPageTransaction
   * @description change to form per page
   * @param {number} _perPage
   * @memberof VoucherReportComponent
   */
  public changePerPageTransaction(_perPage: number) {
    this.dataFilterTransaction.per_page = _perPage;
    this.filterTransaction();
  }

  /**
   * @method searchTransaction
   * @description search transaction
   * @memberof VoucherReportComponent
   */
  public searchTransaction() {
    this.dataFilterTransaction.ChuoiTimKiem = this.keySearchTransaction;
    if (!this.keySearchTransaction) {
      this.dataFilterTransaction.ChuoiTimKiem = '';
    }
    this.filterTransaction();
  }

  // === SUB FUNCTION COMMON ==================================================
  /**
   * @method funcError
   * @description execute error function
   * @param err
   */
  funcError = (err) => {
    this._toasterService.clear();
    this._toasterService.pop('error', null, err.D || 'Lỗi không xác định!');
    if (err.status === 401) {
      Observable.timer(2000)
        .subscribe(() => {
          this._router.navigate(['login']);
        });
    }
  }
}



















