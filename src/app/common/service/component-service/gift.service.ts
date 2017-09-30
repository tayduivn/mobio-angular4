/**
 * @module gift-service
 * @author ManhNV
 * @description config shop service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs';
import {Gift, Gifts, PresentsType} from '../../../customer-care/content/gift/gift.model';
import {Http} from '@angular/http';
import {AuthenticateService} from '../common-service/authenticate.service';
import {UtilService} from '../common-service/util.service';
import {ResponseCustom} from '../../model/response-custom.model';

@Injectable()
export class GiftService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}/presents`;
  }

  /**
   * @method getGifts
   * @description get list gift
   * @returns {Observable<Gift>}
   */
  public getGifts(dataFilter: any): Observable<Gifts> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}${queryString}`);
  }

  /**
   * @method getGiftDetail
   * @description get detail gift
   * @param {string} _idGift
   * @returns {Observable<Gift>}
   */
  public getGiftDetail(_idGift: string): Observable<Gift> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/${_idGift}`)
        .subscribe(data => {
          return observer.next([data['presents']].map(GiftService.toGift)[0]);
        }, err => observer.error(err));
    });
  }

  /**
   * @method getGiftType
   * @description get list type gift (<=> list present)
   * @returns {Observable<PresentsType>}
   */
  public getGiftType(): Observable<PresentsType[]> {
    return Observable.create(observer => {
      this._apiRequest.get(`static/presents.json`)
        .subscribe(data => {
          return observer.next(data['presents'].map(GiftService.toPresentType));
        }, err => observer.error(err));
    });
  }

  public getGiftTotalCount(params: any): Observable<number> {
    let queryString = UtilService.encodeParams(params);
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/warehouse/total${queryString}`)
        .subscribe(data => {
          return observer.next(data['total']);
        }, err => observer.error(err));
    });
  }

  /**
   * @method changeStateShowGift
   * @description visible, inVisible multiple gift
   * @param body
   * @returns {Observable<ResponseCustom>}
   */
  public changeStateShowGift(body: any): Observable<ResponseCustom> {
    return this._apiRequest.patch(`${this.basePath}`, body, 1, {});
  }

  /**
   * @method deleteMultipleGift
   * @param params
   * @returns {Observable<ResponseCustom>}
   */
  public deleteMultipleGift(params): Observable<ResponseCustom> {
    return this._apiRequest.delete(`${this.basePath}?${params}`);
  }

  /**
   * @method createGift
   * @description create new gift
   * @param {Gift} body
   * @param bodyCustom
   * @param file
   * @returns {Observable<ResponseCustom>}
   */
  public createGift(body: Gift, bodyCustom: any, file: any): Observable<ResponseCustom> {
    const bodyMap = {
      MaDanhMuc: bodyCustom['promotionTypesSelect'],
      tags: bodyCustom['tags'],
      TenKhuyenMai: body.nameGiff,
      HinhThucNhanQua: body.giftForm,
      KieuQuaTang: body.typeGift,
      DiemQuyDoi: body.conversionPoint,
      GiaTien: body.price,
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
      MoTaChiTiet: body.description,
      TrangThai: body.state,
      number_max: body.number_max
    };
    return this._apiRequest.sendWithFile(`${this.basePath}`, 'post', bodyMap, file);
  }

  /**
   * @method updateGift
   * @description update gift information
   * @param {Gift} body
   * @param bodyCustom
   * @param file
   * @returns {Observable<ResponseCustom>}
   */
  public updateGift(body: Gift, bodyCustom: any, file: any): Observable<ResponseCustom> {
    const bodyMap = {
      MaDanhMuc: bodyCustom['promotionTypesSelect'],
      tags: bodyCustom['tags'],
      TenKhuyenMai: body.nameGiff,
      HinhThucNhanQua: body.giftForm,
      KieuQuaTang: body.typeGift,
      DiemQuyDoi: body.conversionPoint,
      GiaTien: body.price,
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
      MoTaChiTiet: body.description,
      TrangThai: body.state,
      number_max: body.number_max
    };
    if (file.length === 0)
      return this._apiRequest.sendNotFile(`${this.basePath}/${body.idGift}`, 'patch', bodyMap);
    return this._apiRequest.sendWithFile(`${this.basePath}/${body.idGift}`, 'PATCH', bodyMap, file);
  }

  /**
   * @method toPresentType
   * @description cast to object PresentsType
   * @param r
   * @returns {PresentsType}
   */
  public static toPresentType(r: any): PresentsType {
    const presents: PresentsType = {
      id: r['id'],
      name: r['name'],
      conversionPoint: r['DiemQuyDoi'],
      price: r['GiaTien'],
      type: r['type']
    };
    console.log(presents);
    return presents;
  }

  /**
   * @method toGift
   * @description mapping Gift model
   * @param r
   * @returns {toGift}
   */
  public static toGift(r: any): Gift {
    const gift: Gift = {
      idGift: r['KhuyenMaiID'],           // KhuyenMaiID
      nameGiff: r['TenKhuyenMai'],        // TenKhuyenMai
      idCategory: r['MaDanhMuc'],         // MaDanhMuc
      giftForm: !r['HinhThucNhanQua'] ? '' : r['HinhThucNhanQua'],  // HinhThucNhanQua
      typeGift: r['KieuQuaTang'],         // KieuQuaTang  -- todo Ko hiểu team backend làm cái kiểu gì
      conversionPoint: r['DiemQuyDoi'],   // DiemQuyDoi
      price: r['GiaTien'],                // GiaTien
      timeStartPromotion: r['ThoiDiemBatDauKhuyenMai'],   // ThoiDiemBatDauKhuyenMai
      timeEndPromotion: r['ThoiDiemKetThucKhuyenMai'],    // ThoiDiemKetThucKhuyenMai
      timeStartDisplay: r['ThoiDiemBatDauHienThi'],       // ThoiDiemBatDauHienThi
      timeEndDisplay: r['ThoiDiemKetThucHienThi'],        // ThoiDiemKetThucHienThi
      description: r['MoTaChiTiet'],                      // MoTaChiTiet
      state: r['TrangThai'],                              // TrangThai
      stateOfEffect: r['TrangThaiHieuLuc'],
      avatar: r['AnhDaiDien'] || '',   // AnhDaiDien
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
      number_max: r['number_max'] || 0
    };
    console.log(gift);
    return gift;
  }
}
