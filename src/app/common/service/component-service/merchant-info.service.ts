/**
 * @module merchant-info.service
 * @author ManhNV,Ducdz
 * @description config service  merchant-info
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {AuthenticateService} from '../common-service/authenticate.service';
import {ResponseCustom} from '../../model/response-custom.model';
import {MerchantInfo} from '../../../merchant/merchant-info/merchant-info.model';
import {Observable} from 'rxjs/Observable';
import {UtilService} from '../common-service/util.service';
import {Http} from '@angular/http';

@Injectable()
export class MerchantInfoService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService,
              private http: Http) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  /**
   * @method getMerchantInfo
   * @description get info Merchant
   * @returns {Observable<AccountInfo>}
   * @todo
   */
  public getMerchantInfo(): Observable<any> {
    return this._apiRequest.get(`${this.basePath}`);
  }

  public updateMerchantInfo(body: MerchantInfo): Observable<ResponseCustom> {
    const bodyData = {
      'TenNhaCungCap': body.nameMerchant,
      'MoTaChiTiet': body.description,
      'SoDienThoai': body.phone,
      'ThuDienTu': body.email,
      'DiaChi': body.address,
      'MaDanhMuc': body.idCategory
    };
    return this._apiRequest.patch(`${this.basePath}`, bodyData);
  }

  public uploadMerchantLogo(file: any): Observable<ResponseCustom> {
    return this._apiRequest.sendWithFile(`${this.basePath}/avatar`, 'post', {}, file);
  }

  /**
   * @method updatePointContact
   * @description update point contact information
   * @param body
   * @returns {Observable<ResponseCustom>}
   */
  public updatePointContact(body: any): Observable<ResponseCustom> {
    const bodyData = {
      ThuDienTu: body['email'],
      SoDienThoai: body['phone'],
      DiaChi: body['address']
    };
    return this._apiRequest.patch(`${this.basePath}/contact`, bodyData);
  }

  /**
   * @method toMerchantInfo
   * @static
   * @description maping object
   * @param r
   * @return MerchantInfo
   */
  public static toMerchantInfo(r: any): MerchantInfo {
    const merchantInfo: MerchantInfo = {
      idMerchant: r['NhaCungCapID'],   // NhaCungCapID
      address: r['DiaChi'],      // DiaChi
      nameMerchant: r['TenNhaCungCap'], // TenNhaCungCap
      expiryDate: r['HanSuDung'],   // HanSuDung
      xpointJoinState: r['TrangThaiThamGiaXpoint'],  // TrangThaiThamGiaXpoint
      typeOfSupplier: r['KieuNhaCungCap'],   // KieuNhaCungCap
      avatar: r['AnhDaiDien'],           // AnhDaiDien
      description: r['MoTaChiTiet'],      // MoTaChiTiet
      timeUpdate: r['ThoiDiemCapNhat'],     // ThoiDiemCapNhat
      phone: r['SoDienThoai'],          // SoDienThoai
      timeCreate: r['ThoiDiemTao'],     // ThoiDiemTao
      email: r['ThuDienTu'],          // ThuDienTu
      idCategory: r['MaDanhMuc'],     /// MaDanhMuc
      identificationCode: r['MaNhanDien'], // MaNhanDien
    };
    return merchantInfo;
  }
}
