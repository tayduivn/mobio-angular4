import { Injectable } from '@angular/core';
import { ApiRequestService } from '../common-service/api-request.service';
import { AuthenticateService } from '../common-service/authenticate.service';
import { ResponseCustom } from '../../model/response-custom.model';
import { CustomerRating, CustomerRatings, ChartRating, ChartRatings } from '../../../customer-care/report/rate/rate.model';
import { Shop, Shops } from '../../../customer-care/content/shop/shop.model';
import { Observable } from 'rxjs/Observable';
import { UtilService } from '../common-service/util.service';

@Injectable()
export class RateService {

  public basePath: string;
  constructor(private _apiRequest: ApiRequestService,
    private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  // get list customer rating
  public getCustomerRating(dataFilter: any): Observable<CustomerRatings> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/store/rating${queryString}`);
  }
  // get chart data rating
  public getChartRating(dataFilter: any): Observable<ChartRatings> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/interactive/rating${queryString}`);
  }
  // get list shop
  public getShops(dataFilter: any): Observable<Shops> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/stores${queryString}`);
  }
  // define type customer rating
  public static toCustomerRating(row: any): CustomerRating {
    let customer: CustomerRating = {
      customerId: row['KhachHangDanhGiaID'],
      rating: row['DiemDanhGia'],
      timeOfRegister: row['ThoiDiemTao'],
      address: row['DiaChi'],
      name: row['HoTen'],
      tel: row['SoDienThoai'],
      email: row['ThuDienTu'],
      content: row['LyDo']
    }
    return customer;
  }
  // define type chart data rating
  public static toChartRating(row: any): ChartRating {
    let chartdata: ChartRating = {
      data: row['data'].map(function (item) {
        return {
          rating_1: item['rating_1'],
          rating_2: item['rating_2'],
          rating_3: item['rating_3'],
          rating_4: item['rating_4'],
          rating_5: item['rating_5'],
          time: item['time']
        }
      })
    }
    return chartdata;
  }
  public static toShop(r: any): Shop {
    const shop: Shop = {
      idShop: r['CuaHangID'],
      address: r['DiaChi'],
      city: r['MaTinhThanh'],
      codeStore: r['MaCuaHang'],
      state: r['TrangThai'],
      email: r['ThuDienTu'],
      hotLine: r['HotLine'],
      lat: r['ViDo'],
      lng: r['KinhDo'],
      nameShop: r['TenCuaHang']
    };
    return shop;
  }
}
