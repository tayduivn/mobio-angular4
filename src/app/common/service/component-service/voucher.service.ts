/**
 * @module shop-service
 * @author ManhNV
 * @description config shop service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs';
import {Voucher, Vouchers} from '../../../customer-care/content/voucher/voucher.model';
import {AuthenticateService} from '../common-service/authenticate.service';
import {UtilService} from '../common-service/util.service';
import {ResponseCustom} from '../../model/response-custom.model';
import {ShopService} from './shop.service';
import * as _ from 'lodash';

@Injectable()
export class VoucherService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}/vouchers`;
  }

  /**
   * @method getVouchers
   * @description get list voucher
   * @returns {Observable<Shop>}
   */
  public getVouchers(dataFilter: any): Observable<Vouchers> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}${queryString}`)
  }

  /**
   * @method changeStateShowVoucher
   * @description visible, inVisible multiple voucher
   * @param body
   * @returns {Observable<ResponseCustom>}
   */
  public changeStateShowVoucher(body: any): Observable<ResponseCustom> {
    return this._apiRequest.patch(`${this.basePath}`, body, 1, {});
  }

  /**
   * @method deleteMultipleVoucher
   * @param params
   * @returns {Observable<ResponseCustom>}
   */
  public deleteMultipleVoucher(params): Observable<ResponseCustom> {
    return this._apiRequest.delete(`${this.basePath}?${params}`);
  }

  /**
   * @method getVoucherDetail
   * @description get detail voucher
   * @param {string} _idVoucher
   * @returns {Observable<Voucher>}
   */
  public getVoucherDetail(_idVoucher: string): Observable<Voucher> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/${_idVoucher}`)
        .subscribe(data => {
          return observer.next([data['voucher']].map(VoucherService.toVoucher)[0]);
        }, err => observer.error(err));
    })
  }

  /**
   * @method createVoucher
   * @description create new voucher
   * @param {Voucher} body
   * @param bodyCustom
   * @param file
   * @returns {Observable<ResponseCustom>}
   */
  public createVoucher(body: Voucher, bodyCustom: any, file: any): Observable<ResponseCustom> {
    let bodyMap = {
      TenVoucher: body.name,
      MaDanhMuc: bodyCustom['promotionTypesSelect'],
      KieuVoucher: body.voucherType,
      SoLanTichToiDa: body.maximumAccumulations,
      KhoangCachGiuaHaiLanTich: body.distance,
      PhanTramGiamGia: body.discountPercentage,
      GiaTienGiam: body.priceDecreases,
      voucher_max: body.voucher_max,
      voucher_user_max: body.voucher_user_max,
      ThoiHanSuDung: body.expireDate,
      ThoiDiemBatDau: typeof body.timeStart === 'string'
        ? (new Date(body.timeStart)).toISOString() : body.timeStart.toISOString(),
      ThoiDiemKetThuc: typeof body.timeEnd === 'string'
        ? (new Date(body.timeEnd)).toISOString()
        : body.timeEnd !== null ? body.timeEnd.toISOString() : null,
      ThoiDiemBatDauHienThi: typeof body.timeStartView === 'string'
        ? (new Date(body.timeStartView)).toISOString() : body.timeStartView.toISOString(),
      ThoiDiemKetThucHienThi: typeof body.timeEndView === 'string'
        ? (new Date(body.timeEndView)).toISOString()
        : body.timeEndView !== null ? body.timeEndView.toISOString() : null,
      MoTaChiTiet: body.description,
      tags: bodyCustom['tags'],
      CuaHangID: bodyCustom['storeIds'],
      TrangThai: body.state
    };
    bodyMap = _.omitBy(bodyMap, _.isNil);
    return this._apiRequest.sendWithFile(`${this.basePath}`, 'post', bodyMap, file);
  }

  /**
   * @method updateVoucher
   * @description update voucher information
   * @param {Voucher} body
   * @param bodyCustom
   * @param file
   * @returns {Observable<ResponseCustom>}
   */
  public updateVoucher(body: Voucher, bodyCustom: any, file: any): Observable<ResponseCustom> {
    let bodyMap = {
      TenVoucher: body.name,
      MaDanhMuc: bodyCustom['promotionTypesSelect'],
      KieuVoucher: body.voucherType,
      SoLanTichToiDa: body.maximumAccumulations,
      KhoangCachGiuaHaiLanTich: body.distance,
      PhanTramGiamGia: body.discountPercentage,
      GiaTienGiam: body.priceDecreases,
      voucher_max: body.voucher_max,
      voucher_user_max: body.voucher_user_max,
      ThoiHanSuDung: body.expireDate,
      ThoiDiemBatDau: typeof body.timeStart === 'string'
        ? (new Date(body.timeStart)).toISOString() : body.timeStart.toISOString(),
      ThoiDiemKetThuc: typeof body.timeEnd === 'string'
        ? (new Date(body.timeEnd)).toISOString()
        : body.timeEnd !== null ? body.timeEnd.toISOString() : null,
      ThoiDiemBatDauHienThi: typeof body.timeStartView === 'string'
        ? (new Date(body.timeStartView)).toISOString() : body.timeStartView.toISOString(),
      ThoiDiemKetThucHienThi: typeof body.timeEndView === 'string'
        ? (new Date(body.timeEndView)).toISOString()
        : body.timeEndView !== null ? body.timeEndView.toISOString() : null,
      MoTaChiTiet: body.description,
      tags: bodyCustom['tags'],
      CuaHangID: bodyCustom['storeIds'],
      TrangThai: body.state
    };
    bodyMap = _.omitBy(bodyMap, _.isNil);
    if (file.length === 0)
      return this._apiRequest.sendNotFile(`${this.basePath}/${body.idVoucher}`, 'patch', bodyMap);
    return this._apiRequest.sendWithFile(`${this.basePath}/${body.idVoucher}`, 'patch', bodyMap, file);
  }

  /**
   * @method toCardPattern
   * @description mapping card-pattern model
   * @param r
   * @returns {toCardPattern}
   */
  public static toVoucher(r: any): Voucher {
    const voucher: Voucher = {
      idVoucher: r['VoucherID'],
      name: r['TenVoucher'],
      voucherType: r['KieuVoucher'],
      discountPercentage: r['PhanTramGiamGia'],
      priceDecreases: r['GiaTienGiam'],
      maximumAccumulations: r['SoLanTichToiDa'],
      maximumOneTime: r['SoLuongTichToiDaMotLan'],
      expireDate: r['ThoiHanSuDung'],
      distance: r['KhoangCachGiuaHaiLanTich'],
      avatar: r['AnhDaiDien'],
      state: r['TrangThai'],
      stateEffect: r['TrangThaiHieuLuc'],
      description: r['MoTaChiTiet'],
      timeStart: r['ThoiDiemBatDau'],
      timeEnd: r['ThoiDiemKetThuc'],
      timeStartView: r['ThoiDiemBatDauHienThi'],
      timeEndView: r['ThoiDiemKetThucHienThi'],
      tags: !r['tags'] || r['tags'].length === 0 ? []
        : r['tags'].map(function (itemTag) {
          return {
            tag: itemTag['tag']
          }
        }),
      imageDescriptions: !r['AnhMoTa'] || r['AnhMoTa'].length === 0 ? []
        : r['AnhMoTa'].map(function (itemLink) {
          return {
            linkImage: itemLink['LinkAnh']
          }
        }),
      stores: !r['stores'] || !Array.isArray(r['stores']) || r['stores'].length === 0
        ? [] : r['stores'].map(ShopService.toShop),
      voucher_max: r['voucher_max'],
      voucher_user_max: r['voucher_user_max'],
      idCategory: r['MaDanhMuc']
    };
    console.log(voucher);
    return voucher;
  }
}
