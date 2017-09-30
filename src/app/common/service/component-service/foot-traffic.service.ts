/**
 * @module FootTraffic-service
 * @author Mr.Duy
 * @description config FootTraffic service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs';
import {FootTraffic} from '../../../customer-care/content/foot-traffic/foot-traffic.model';
import {UtilService} from '../common-service/util.service';
import {AuthenticateService} from '../common-service/authenticate.service';
import {ResponseCustom} from '../../model/response-custom.model';
import {ShopService} from './shop.service';
import * as _ from 'lodash';

@Injectable()
export class FootTrafficService {

  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}/foot-traffic`;
  }

  /**
   * @method getFootTraffics
   * @description get list foot-traffic
   * @returns {Observable<FootTraffic>}
   */
  public getFootTraffics(dataFilter: any): Observable<FootTraffic[]> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}${queryString}`);
  }

  /**
   * @method getFootTrafficDetail
   * @description get detail foot-traffic
   * @param {string} _idFootTraffic
   * @returns {Observable<FootTraffic>}
   */
  public getFootTrafficDetail(_idFootTraffic: string): Observable<FootTraffic> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/${_idFootTraffic}`)
        .subscribe(data => {
          return observer.next([data['foot-traffic']].map(FootTrafficService.toFootTraffic)[0]);
        }, err => observer.error(err));
    })
  }

  /**
   * @method changeStateShowFootTraffic
   * @description visible, inVisible multiple foot-traffic
   * @param body
   * @returns {Observable<ResponseCustom>}
   */
  public changeStateShowFootTraffic(body: any): Observable<ResponseCustom> {
    return this._apiRequest.patch(`${this.basePath}`, body, 1, {});
  }

  /**
   * @method deleteMultipleFootTraffic
   * @param params
   * @returns {Observable<ResponseCustom>}
   */
  public deleteMultipleFootTraffic(params): Observable<ResponseCustom> {
    return this._apiRequest.delete(`${this.basePath}?${params}`);
  }

  /**
   * @method createFootTraffic
   * @description create new foot-traffic
   * @param {FootTraffic} body
   * @param bodyCustom
   * @param {any[]} files
   * @returns {Observable<ResponseCustom>}
   */
  public createFootTraffic(body: FootTraffic, bodyCustom: any, files: any[]): Observable<ResponseCustom> {
    let bodyData = {
      MaDanhMuc: bodyCustom['promotionTypesSelect'],
      TenKhuyenMai: body.namePromotion,
      MoTaChiTiet: body.description,
      ThoiDiemBatDauHienThi: typeof body.timeStartDisplay === 'string'
        ? (new Date(body.timeStartDisplay)).toISOString() : body.timeStartDisplay.toISOString(),
      ThoiDiemKetThucHienThi: typeof body.timeEndDisplay === 'string'
        ? (new Date(body.timeEndDisplay)).toISOString()
        : body.timeEndDisplay !== null ? body.timeEndDisplay.toISOString() : null,
      ThoiDiemBatDauKhuyenMai: typeof body.timeStartPromotion === 'string'
        ? (new Date(body.timeStartPromotion)).toISOString() : body.timeStartPromotion.toISOString(),
      ThoiDiemKetThucKhuyenMai: typeof body.timeEndPromotion === 'string'
        ? (new Date(body.timeEndPromotion)).toISOString()
        : body.timeEndPromotion !== null ? body.timeEndPromotion.toISOString() : null,
      tags: bodyCustom['tags'],
      CuaHangID: bodyCustom['storeIds'],
      TrangThai: body.state,
      GioiHanTangDiem: body.limitPointDonation,
      TongSoDiemTang: body.totalPointsAwarded,
      TongSoLuotGheTham: body.totalNumberVisit,
      SoDiemTang: body.pointsAwarded,
      SoLanTichToiDa: body.maximumAccumulations,
      KhoangCachGiuaHaiLanTangDiem: body.distance
    };
    bodyData = _.omitBy(bodyData, _.isNil);
    return this._apiRequest.sendWithFile(`${this.basePath}`, 'post', bodyData, files);
  }

  /**
   * @method updateFootTraffic
   * @description update foot-traffic information
   * @param {Voucher} body
   * @param bodyCustom
   * @param file
   * @returns {Observable<ResponseCustom>}
   */
  public updateFootTraffic(body: FootTraffic, bodyCustom: any, file: any): Observable<ResponseCustom> {
    let bodyData = {
      MaDanhMuc: bodyCustom['promotionTypesSelect'],
      TenKhuyenMai: body.namePromotion,
      MoTaChiTiet: body.description,
      ThoiDiemBatDauHienThi: typeof body.timeStartDisplay === 'string'
        ? (new Date(body.timeStartDisplay)).toISOString() : body.timeStartDisplay.toISOString(),
      ThoiDiemKetThucHienThi: typeof body.timeEndDisplay === 'string'
        ? (new Date(body.timeEndDisplay)).toISOString()
        : body.timeEndDisplay !== null ? body.timeEndDisplay.toISOString() : null,
      ThoiDiemBatDauKhuyenMai: typeof body.timeStartPromotion === 'string'
        ? (new Date(body.timeStartPromotion)).toISOString() : body.timeStartPromotion.toISOString(),
      ThoiDiemKetThucKhuyenMai: typeof body.timeEndPromotion === 'string'
        ? (new Date(body.timeEndPromotion)).toISOString()
        : body.timeEndPromotion !== null ? body.timeEndPromotion.toISOString() : null,
      tags: bodyCustom['tags'],
      CuaHangID: bodyCustom['storeIds'],
      TrangThai: body.state,
      GioiHanTangDiem: body.limitPointDonation,
      TongSoDiemTang: body.totalPointsAwarded,
      TongSoLuotGheTham: body.totalNumberVisit,
      SoDiemTang: body.pointsAwarded,
      SoLanTichToiDa: body.maximumAccumulations,
      KhoangCachGiuaHaiLanTangDiem: body.distance
    };
    bodyData = _.omitBy(bodyData, _.isNil);
    if (file.length === 0)
      return this._apiRequest.sendNotFile(`${this.basePath}/${body.idFootTraffic}`, 'patch', bodyData);
    return this._apiRequest.sendWithFile(`${this.basePath}/${body.idFootTraffic}`, 'patch', bodyData, file);
  }

  /**
   * @method toCardPattern
   * @description mapping foot-traffic model
   * @param r
   * @returns {toFootTraffic}
   */
  public static toFootTraffic(r: any): FootTraffic {
    const footTraffic: FootTraffic = {
      idFootTraffic: r['KhuyenMaiID'],
      idCategory: r['MaDanhMuc'],
      namePromotion: r['TenKhuyenMai'],
      description: r['MoTaChiTiet'],
      timeStartDisplay: r['ThoiDiemBatDauHienThi'],
      timeEndDisplay: r['ThoiDiemKetThucHienThi'],
      timeStartPromotion: r['ThoiDiemBatDauKhuyenMai'],
      timeEndPromotion: r['ThoiDiemKetThucKhuyenMai'],
      avatar: r['AnhDaiDien'],
      imageDescriptions: !r['AnhMoTa'] || r['AnhMoTa'].length === 0 ? []
        : r['AnhMoTa'].map(function (itemLink) {
          return {
            linkImage: itemLink['LinkAnh']
          }
        }),
      tags: !r['tags'] || r['tags'].length === 0 ? []
        : r['tags'].map(function (itemTag) {
          return {
            tag: itemTag['tag']
          }
        }),
      stores: !r['CuaHang'] || !Array.isArray(r['CuaHang']) || r['CuaHang'].length === 0
        ? [] : r['CuaHang'].map(ShopService.toShop),
      state: r['TrangThai'],
      stateOfEffect: r['TrangThaiHieuLuc'],
      limitPointDonation: r['GioiHanTangDiem'],
      totalPointsAwarded: r['TongSoDiemTang'],
      totalNumberVisit: r['TongSoLuotGheTham'],
      pointsAwarded: r['SoDiemTang'],
      maximumAccumulations: r['SoLanTichToiDa'],
      distance: r['KhoangCachGiuaHaiLanTangDiem']
    };
    console.log(footTraffic);
    return footTraffic;
  }
}
