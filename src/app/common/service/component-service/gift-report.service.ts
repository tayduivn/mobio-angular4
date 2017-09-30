import { Injectable } from '@angular/core';
import { ApiRequestService } from '../common-service/api-request.service';
import { AuthenticateService } from '../common-service/authenticate.service';
import { ResponseCustom } from '../../model/response-custom.model';
import { GiftPoint, GiftPoints, GiftCategory, GiftCategorys, GiftInteractive, GiftInteractives, GiftPresent, GiftPresents, PresentDetail, PresentDetails, PresentTransaction, PresentTransactions } from '../../../customer-care/report/gift/gift-report.model';
import { Observable } from 'rxjs/Observable';
import { UtilService } from '../common-service/util.service';

@Injectable()
export class GiftReportService {
  public basePath: string;
  constructor(private _apiRequest: ApiRequestService,
    private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }
  // get point gift chart
  public getPointGiftChart(dataFilter: any): Observable<GiftPoints> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/redemption_point/presents${queryString}`)
  }
  // get gift category chart
  public getGiftCategory(dataFilter: any): Observable<GiftCategorys> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/category_redemption_point/presents${queryString}`);
  }
  // get gift interactive
  public getGiftInteractive(dataFilter: any): Observable<GiftInteractives> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/interactive/presents${queryString}`);
  }
  // get data gift present
  public getGiftPresent(dataFilter: any): Observable<GiftPresents> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/list/presents${queryString}`);
  }
  // get present details
  public getPresentDetail(_idPromotion: any): Observable<PresentDetails> {
    return this._apiRequest.get(`${this.basePath}/reports/presents/${_idPromotion}`)
  }
  // get present transaction
  public getPresentTransaction(_idPromotion: any, dataFilter: any): Observable<PresentTransactions> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/presents/${_idPromotion}/transaction`);
  }
  // define present detail
  public static toPresentDetail(row: any): PresentDetail {
    let presentdetail: PresentDetail = {
      idPromotion: row['KhuyenMaiID'],
      name: row['TenKhuyenMai'],
      image: row['AnhDaiDien'],
      total_user_purchase: row['total_user_purchase'],
      total_purchase: row['total_purchase'],
      total_received: row['total_received']
    }
    return presentdetail
  }
  // define data gift present
  public static toGiftPresent(row: any): GiftPresent {
    let giftpresent: GiftPresent = {
      name: row['TenKhuyenMai'],
      all: row['all'],
      idPromotion: row['KhuyenMaiID'],
      period: row['period']
    }
    return giftpresent
  }
  // define data gift point chart
  public static toGiftPoint(row: any): GiftPoint {
    let giftpoint: GiftPoint = {
      sumary: row['sumary'],
      data: row['data'].map(function (item) {
        return {
          value: item['value'],
          time: item['time']
        }
      })
    }
    return giftpoint;
  }
  // define data gift category
  public static toGiftCategory(row: any): GiftCategory {
    let giftcategory: GiftCategory = {
      sumary: row['sumary'],
      data: row['data'].map(function (item) {
        return {
          idCategory: item['MaDanhMuc'],
          value: item['value']
        }
      })
    }
    return giftcategory;
  }
  // define data gift interactive
  public static toGiftInteractive(row: any): GiftInteractive {
    let giftinteractive: GiftInteractive = {
      received: {
        sumary: row['received']['sumary'],
        data: row['received']['data'].map(function (item) {
          return {
            value: item['value'],
            time: item['time']
          }
        })
      },
      views: {
        sumary: row['views']['sumary'],
        data: row['views']['data'].map(function (item) {
          return {
            value: item['value'],
            time: item['time']
          }
        })
      },
      purchase: {
        sumary: row['purchase']['sumary'],
        data: row['purchase']['data'].map(function (item) {
          return {
            value: item['value'],
            time: item['time']
          }
        })
      }
    }
    return giftinteractive;
  }
  // define present transaction
  public static toPresentTransaction(row: any): PresentTransaction {
    let transaction: PresentTransaction = {
      idCustomer: row['KhachHangID'],
      tel: row['IDSoDienThoai'],
      email: row['Email'],
      code: row['MaGiaoDich'],
      status: row['TrangThai'],
      timeOfRegiter: row['ThoiDiemTao'],
      timeOfConfirm: row['ThoiDiemTao'],
      timeOfUpdate: row['ThoiDiemCapNhat'],
      nameCustomer: row['TenKhachNhanQua'],
      address: row['DiaChiNhanQua'],
      gift: row['HinhThucNhanQua']
    }
    return transaction
  }
}
