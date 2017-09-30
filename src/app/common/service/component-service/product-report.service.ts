import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {AuthenticateService} from '../common-service/authenticate.service';
import {ResponseCustom} from '../../model/response-custom.model';
import {
  ReportProduct,
  ReportProducts,
  DetailProduct,
  DetailProducts,
  Transaction,
  Transactions,
  ChartProduct,
  ChartProducts
} from '../../../customer-care/report/product-report/product-report.model';
import {Observable} from 'rxjs/Observable';
import {UtilService} from '../common-service/util.service';

@Injectable()
export class ProductReportService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  // get list report product
  public getReportProducts(dataFilter: any): Observable<ReportProducts> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/list/product${queryString}`);
  }

  // get detail product report
  public getDetailProductReport(_idProduct: string): Observable<DetailProducts> {
    return this._apiRequest.get(`${this.basePath}/reports/products/${_idProduct}`);
  }

  // get transaction product report
  public getTransactionProductReport(_idProduct: string, dataFilter: any): Observable<Transactions> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/product/${_idProduct}/transaction${queryString}`);
  }

  // get chart report product
  public getChartProduct(dataFilter: any): Observable<ChartProducts> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/interactive/product${queryString}`);
  }

  // define type report product
  public static toReportProduct(row: any): ReportProduct {
    let reportProduct: ReportProduct = {
      all: {
        count: {
          received: row['all']['count']['received'],
          view: row['all']['count']['view'],
          purchase: row['all']['count']['purchase']
        },
        user: {
          received: row['all']['user']['received'],
          view: row['all']['user']['view'],
          purchase: row['all']['user']['purchase']
        }
      },
      name: row['TenSanPham'],
      statusChangePoint: row['TrangThaiDoiDiem'],
      in_period: {
        count: {
          received: row['in_period']['count']['received'],
          view: row['in_period']['count']['view'],
          purchase: row['in_period']['count']['purchase']
        },
        user: {
          received: row['in_period']['user']['received'],
          view: row['in_period']['user']['view'],
          purchase: row['in_period']['user']['purchase']
        }
      },
      idProduct: row['SanPhamID']
    };
    return reportProduct;
  }

  // define type detail report product
  public static toDetailProductReport(row: any): DetailProduct {
    let productDetail: DetailProduct = {
      idProduct: row['SanPhamID'],
      total_purchase: row['total_purchase'],
      total_received: row['total_received'],
      name: row['TenSanPham'],
      imagePath: row['AnhDaiDien'],
      total_views: row['total_views']
    };
    return productDetail;
  }

  // define type transaction report product
  public static toTransactionProductReport(row: any): Transaction {
    let transaction: Transaction = {
      email: row['email'],
      timeOfReceipt: row['ThoiDiemCapNhat'],
      timeOfConfirm: row['ThoiDiemXacThuc'],
      address: row['DiaChiNhanQua'],
      timeOfRegister: row['ThoiDiemTao'],
      status: row['TrangThai'],
      name: row['HoTen'],
      customer: row['TenKhachNhanQua'],
      tel: row['IDSoDienThoai'],
      giftForm: row['HinhThucNhanQua'],
      deliveryCode: row['MaGiaoDich'],
      customerID: row['KhachHangID']
    }
    return transaction;
  }

  // define type chart product
  public static toChartProduct(row: any): ChartProduct {
    let chartproduct: ChartProduct = {
      received: {
        data: row['received']['data'].map(function (item) {
          return {
            time: item['time'],
            value: item['value']
          }
        }),
        sumary: row['received']['sumary']
      },
      views: {
        data: row['views']['data'].map(function (item) {
          return {
            time: item['time'],
            value: item['value']
          }
        }),
        sumary: row['views']['sumary']
      },
      purchase: {
        data: row['purchase']['data'].map(function (item) {
          return {
            time: item['time'],
            value: item['value']
          }
        }),
        sumary: row['purchase']['sumary']
      },

    }
    return chartproduct;
  }

}
