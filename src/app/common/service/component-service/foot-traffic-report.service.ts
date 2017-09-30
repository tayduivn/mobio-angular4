import { Injectable } from '@angular/core';
import { ApiRequestService } from '../common-service/api-request.service';
import { AuthenticateService } from '../common-service/authenticate.service';
import { ResponseCustom } from '../../model/response-custom.model';
import { CustomerVisit, CustomerVisits, PieChartCustomer, PieChartCustomers, FootTraffic, FootTraffics } from '../../../customer-care/report/foot-traffic/foot-traffic-report.model';
import { Shop, Shops } from '../../../customer-care/content/shop/shop.model';
import { Observable } from 'rxjs/Observable';
import { UtilService } from '../common-service/util.service';

@Injectable()
export class FootTrafficReportService {
  public basePath: string;
  constructor(private _apiRequest: ApiRequestService,
    private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }
  // get chart data customer visited
  public getChartCustomerVisited(dataFilter: any): Observable<CustomerVisits> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/interactive/foot-traffic/visit${queryString}`);
  }
  // get pie chart data customer
  public getPieChartCustomer(dataFilter: any): Observable<PieChartCustomers> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/foot-traffic/visit/ratio${queryString}`);
  }
  // get list foot-traffic
  public getListFootTraffic(dataFilter: any): Observable<FootTraffics> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/reports/foot-traffic${queryString}`)
  }
  // get list shop
  public getShops(dataFilter: any): Observable<Shops> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/stores${queryString}`);
  }
  // define type data char customer visited
  public static toChartCustomerVisited(row: any): CustomerVisit {
    let chartCustomer: CustomerVisit = {
      data: row['data'].map(function (item) {
        return {
          time: item['ThoiDiem'],
          numberOfCustomer: item['SoLuongKhachHang'],
          numberOfVisited: item['SoLuotGheTham']
        }
      })
    }
    return chartCustomer
  }
  // define pie chart data customer
  public static toPieCharCustomer(row: any): PieChartCustomer {
    let piechartCustomer: PieChartCustomer = {
      data: {
        newCustomer: row['data']['new'],
        return: row['data']['return']
      }
    }
    return piechartCustomer
  }
  // define list foot traffic
  public static toFootTraffic(row: any): FootTraffic {
    let foottraffic: FootTraffic = {
      id: row['id'],
      name: row['TenKhuyenMai'],
      numberVisited: row['SoLuotGheTham'],
      numberCustomer: row['SoKhachHangGheTham'],
      numberSale: row['SoKhachHangMuaSam'],
      numberPointGift: row['SoDiemTangKhachHang'],
      address: row['DiaChi']
    }
    return foottraffic
  }
  // define type data list shop 
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
