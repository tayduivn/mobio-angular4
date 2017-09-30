import {Injectable} from '@angular/core';
import {ApiRequestService} from '../../../common/service/common-service/api-request.service';
import {AuthenticateService} from '../../../common/service/common-service/authenticate.service';
import {Observable} from 'rxjs/Observable';
import {
  TransactionsVoucher, TransactionVoucher, VoucherLineChart, VoucherReport,
  VouchersReport
} from './voucher-report.model';
import {UtilService} from "../../../common/service/common-service/util.service";

@Injectable()
export class VoucherReportService {
  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getPointVoucherChart() {
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
        sum: [this.random(100, 400), this.random(100, 400), this.random(100, 400), this.random(100, 400)].reduce(function (a, b) {
          return a + b;
        }, 0),
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
        label: 'Phát hành',
        labelSum: 'Phát hành'
      }, {
        data: [
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400),
          this.random(100, 400)
        ],
        label: 'Đã sử dụng',
        labelSum: 'Đã sử dụng'
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

  getPointVoucherOfCategory() {
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

  public basePath = '';

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  /**
   * @method getReportListVoucher
   * @description get list report voucher
   * @param params
   * @returns {Observable<VouchersReport>}
   */
  public getReportListVoucher(params: any = {}): Observable<VouchersReport> {
    const queryString = UtilService.encodeParams(params);
    return this._apiRequest.get(`${this.basePath}/reports/list/voucher${queryString}`);
  }

  /**
   * @method getLineChartNumberVoucher
   * @description get line chart number
   * @returns {Observable<any>}
   */
  public getLineChartNumberVoucher(params: any = {}): Observable<VoucherLineChart> {
    const queryString = UtilService.encodeParams(params);
    return this._apiRequest.get(`${this.basePath}/reports/interactive/voucher${queryString}`);
  }

  /**
   * @method getDetailVoicherReport
   * @description get detail voucher report information
   * @param {string} voucher_id
   * @returns {Observable<VoucherReport>}
   */
  public getDetailVoucherReport(voucher_id: string): Observable<VoucherReport> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/reports/voucher/${voucher_id}`)
        .subscribe(
          data => observer.next([data['reports']].map(VoucherReportService.toVoucherReport),
            error => observer.error(error))
        );
    });
  }

  /**
   * @method getTransactions
   * @description get list transaction
   * @param {string} voucher_id
   * @param params
   * @returns {Observable<TransactionVoucher>}
   */
  public getTransactions(voucher_id: string, params: any = {}): Observable<TransactionsVoucher> {
    const queryString = UtilService.encodeParams(params);
    return this._apiRequest.get(`${this.basePath}/reports/voucher/${voucher_id}/transaction${queryString}`);
  }

  /**
   * @method toTransactionReport
   * @description to transaction report
   * @param r
   * @returns {TransactionVoucher}
   */
  public static toTransactionReport(r: any): TransactionVoucher {
    let transactionVoucher: TransactionVoucher = {
      idCustomer: r['KhachHangID'],   // KhachHangID
      idPhone: r['IDSoDienThoai'],    // IDSoDienThoai
      email: r['email'],              // Email
      codeTrading: r['MaGiaoDich'],   // MaGiaoDich
      state: r['TrangThai'],          // TrangThai
      history: [{
        state: r['TrangThai'],        // TrangThai
        description: r['MoTa'],       // MoTa
        time: r['time'],
      }],
      fullName: r['HoTen']
    };
    console.log(transactionVoucher);
    return transactionVoucher;
  }

  /**
   * @method toVoucherReport
   * @description cast to voucher report
   * @param r
   * @returns {VoucherReport}
   */
  public static toVoucherReport(r: any): VoucherReport {
    let voucherReport: VoucherReport = {
      VoucherID: r['VoucherID'],
      nameVoucher: r['TenVoucher'], // TenVoucher
      stateEffect: r['TrangThaiHieuLuc'], // TrangThaiHieuLuc
      avatar: r['AnhDaiDien'],
      total_released: r['total_released'],
      total_used: r['total_used'],
      in_period: {
        released: r['in_period']['released'],
        used: r['in_period']['used']
      },
      all: {
        released: r['all']['released'],
        used: r['all']['used']
      }
    };
    console.log(voucherReport);
    return voucherReport;
  }
}
