/**
 * @module promotion.service
 * @author ManhNV
 * @description config promotion service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Promotion, PromotionType, Promotions} from '../../../customer-care/content/promotion/promotion.model';
import {Observable} from 'rxjs/Observable';
import {AuthenticateService} from '../common-service/authenticate.service';
import {UtilService} from '../common-service/util.service';
import {ShopService} from './shop.service';
import {ResponseCustom} from '../../model/response-custom.model';
import * as _ from 'lodash';

@Injectable()
export class PromotionService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}/promotions`;
  }

  /**
   * @method getPromotions
   * @description get list promotion
   * @returns {Observable<Promotion>}
   */
  public getPromotions(dataFilter: any): Observable<Promotions> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}${queryString}`);
  }

  /**
   * @method getPromotionDetail
   * @description get detail promotion
   * @param {string} _idPromtion
   * @returns {Observable<Promotion>}
   */
  public getPromotionDetail(_idPromtion: string): Observable<Promotion> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/${_idPromtion}`)
        .subscribe(data => {
          return observer.next([data['promotion']].map(PromotionService.toPromotion)[0]);
        }, err => observer.error(err));
    })
  }

  /**
   * @method changeStateShowPromotion
   * @description visible, inVisible multiple promotion
   * @param body
   * @returns {Observable<ResponseCustom>}
   */
  public changeStateShowPromotion(body: any): Observable<ResponseCustom> {
    return this._apiRequest.patch(`${this.basePath}`, body, 1, {});
  }

  /**
   * @method deleteMultiplePromotion
   * @param params
   * @returns {Observable<ResponseCustom>}
   */
  public deleteMultiplePromotion(params): Observable<ResponseCustom> {
    return this._apiRequest.delete(`${this.basePath}?${params}`);
  }

  /**
   * @method getPromotionTypes
   * @description get list promotion type
   * @returns {Observable<PromotionType[]>}
   */
  public getPromotionTypes(): Observable<PromotionType[]> {
    return new Observable(observer => {
      this._apiRequest.get(`static/promotion_types.json`)
        .subscribe(data => {
          let promotionTypes: PromotionType[] = data['promotions'];
          return observer.next(promotionTypes);
        }, err => observer.error(err));
    })
  }

  /**
   * @method createPromotion
   * @description create new promotion
   * @param {Voucher} body
   * @param bodyCustom
   * @param file
   * @returns {Observable<ResponseCustom>}
   */
  public createPromotion(body: Promotion, bodyCustom: any, file: any): Observable<ResponseCustom> {
    let bodyMap = {
      MaDanhMuc: bodyCustom['promotionTypesSelect'],
      TenKhuyenMai: body.namePromotion,
      code_active_max: body.code_active_max,
      code_active_max_per_day: body.code_active_max_per_day,
      code_user_active_max: body.code_user_active_max,
      code_user_get_max_per_day: body.code_user_get_max_per_day,
      code_user_get_max: body.code_user_get_max,
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
      number_seconds_code_valid: body.number_seconds_code_valid,
      tags: bodyCustom['tags'],
      SanPhamID: body.idProduct,
      KieuKhuyenMai: body.typePromotion || 1,
      KieuGiamGia: body.typeDiscount || 1,
      TenSanPham: body.nameProduct,
      number_seconds_between_twice_get_code: body.number_seconds_between_twice_get_code,
      GiaTienGiam: body.priceDecrease,
      PhanTramGiamGia: body.discountPercentage,
      CuaHangID: bodyCustom['storeIds'],
      TrangThai: body.state
    };
    bodyMap = _.omitBy(bodyMap, _.isNil);
    return this._apiRequest.sendWithFile(`${this.basePath}`, 'post', bodyMap, file);
  }

  /**
   * @method updatePromotion
   * @description update promotion information
   * @param {Promotion} body
   * @param bodyCustom
   * @param file
   * @returns {Observable<ResponseCustom>}
   */
  public updatePromotion(body: Promotion, bodyCustom: any, file: any): Observable<ResponseCustom> {
    let bodyMap = {
      MaDanhMuc: bodyCustom['promotionTypesSelect'],
      TenKhuyenMai: body.namePromotion,
      code_active_max: body.code_active_max,
      code_active_max_per_day: body.code_active_max_per_day,
      code_user_active_max: body.code_user_active_max,
      code_user_get_max_per_day: body.code_user_get_max_per_day,
      code_user_get_max: body.code_user_get_max,
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
      number_seconds_code_valid: body.number_seconds_code_valid,
      tags: bodyCustom['tags'],
      SanPhamID: body.idProduct,
      KieuKhuyenMai: body.typePromotion || 1,
      KieuGiamGia: body.typeDiscount || 1,
      number_seconds_between_twice_get_code: body.number_seconds_between_twice_get_code,
      GiaTienGiam: body.priceDecrease,
      PhanTramGiamGia: body.discountPercentage,
      CuaHangID: bodyCustom['storeIds'],
      TrangThai: body.state
    };
    bodyMap = _.omitBy(bodyMap, _.isNil);
    if (file.length === 0)
      return this._apiRequest.sendNotFile(`${this.basePath}/${body.idPromotion}`, 'patch', bodyMap);
    return this._apiRequest.sendWithFile(`${this.basePath}/${body.idPromotion}`, 'patch', bodyMap, file);
  }

  /**
   * @method toPromotion
   * @description mapping promotion model
   * @param r
   * @returns {Promotion}
   */
  public static toPromotion(r: any): Promotion {
    const promotion: Promotion = {
      idPromotion: r['KhuyenMaiID'],
      idCategory: r['MaDanhMuc'],
      code_active_max: r['code_active_max'] || 0,
      code_user_get_max_per_day: r['code_user_get_max_per_day'],
      code_user_active_max: r['code_user_active_max'],
      code_active_max_per_day: r['code_active_max_per_day'],
      code_user_get_max: r['code_user_get_max'],
      description: r['MoTaChiTiet'],
      timeStartDisplay: r['ThoiDiemBatDauHienThi'],
      timeEndDisplay: r['ThoiDiemKetThucHienThi'],
      timeStartPromotion: r['ThoiDiemBatDauKhuyenMai'],
      timeEndPromotion: r['ThoiDiemKetThucKhuyenMai'],
      number_seconds_code_valid: r['number_seconds_code_valid'],
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
      avatar: r['AnhDaiDien'],
      idProduct: r['SanPhamID'],
      typePromotion: r['KieuKhuyenMai'],
      typeDiscount: r['KieuGiamGia'],
      namePromotion: r['TenKhuyenMai'] || '',
      nameProduct: r['TenSanPham'],
      number_seconds_between_twice_get_code: r['number_seconds_between_twice_get_code'],
      priceDecrease: r['GiaTienGiam'] || 0,
      discountPercentage: r['PhanTramGiamGia'] || 0,
      stores: !r['stores'] || !Array.isArray(r['stores']) || r['stores'].length === 0
        ? [] : r['stores'].map(ShopService.toShop),
      state: r['TrangThai'],
      stateOfEffect: r['TrangThaiHieuLuc']
    };
    console.log(promotion);
    return promotion;
  }
}
