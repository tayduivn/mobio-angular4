/**
 * @module shop-service
 * @author ManhNV
 * @description config shop service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {AuthenticateService} from '../common-service/authenticate.service';
import {ResponseCustom} from '../../model/response-custom.model';
import {Shop, Shops} from '../../../customer-care/content/shop/shop.model';
import {Observable} from 'rxjs/Observable';
import {UtilService} from '../common-service/util.service';
import {AppConfig} from "../../config/app.config";

@Injectable()
export class ShopService {
  public basePath: string;
  public apiUrl: string;

  constructor(private _apiRequest: ApiRequestService,
              private _appConfig: AppConfig,
              private _authService: AuthenticateService) {
    this.apiUrl = `${this._appConfig.getHostBase()}`;
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  /**
   * @method getShops
   * @description get list shop
   * @returns {Observable<Shop>}
   */
  public getShops(dataFilter: any): Observable<Shops> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/stores${queryString}`);
  }

  /**
   * @method getShopDetail
   * @description get detail shop
   * @param _idStore
   * @returns {Observable<Shop>}
   * @todo [component-service] confirm model item ảnh mô tả
   */
  public getShopDetail(_idStore: string): Observable<Shop> {
    return this._apiRequest.get(`${this.basePath}/stores/${_idStore}`);
  }

  /**
   * @method getQRCodeInfo
   * @description get qr-code by id
   * @param {string} _idStore
   * @returns {Observable<ResponseCustom>}
   */
  public getQRCodeInfo(_idStore: string): Observable<ResponseCustom> {
    return this._apiRequest.get(`${this.basePath}/store/qrcode/${_idStore}`);
  }

  public genBarCode(_idStore: string): Observable<ResponseCustom> {
    return this._apiRequest.post(`${this.basePath}/stores/qrcode/${_idStore}`, {});
  }

  /**
   * @method createShop
   * @description create new shop
   * @param body
   * @returns {Observable<Response>}
   */
  public createShop(body: Shop): Observable<ResponseCustom> {
    let bodyData = {
      IDDoiTuong: this._authService.jwtDecode().merchantID, // todo confirm replace merchantID
      KieuDoiTuong: 1, // todo used value 1-NhanHang; 2-Group
      TenCuaHang: body.nameShop,
      DiaChi: body.address,
      HotLine: body.hotLine,
      ThuDienTu: body.email,
      KinhDo: body.lng,
      ViDo: body.lat,
      TrangThai: body.state,
      MaTinhThanh: body.city
    };
    return this._apiRequest.post(`${this.basePath}/stores`, bodyData);
  }

  /**
   * @method updateShop
   * @description update shop detail
   * @param {Shop} body
   * @returns {Observable<ResponseCustom>}
   */
  public updateShop(body: Shop): Observable<ResponseCustom> {
    let bodyData = {
      IDDoiTuong: this._authService.jwtDecode().merchantID, // todo confirm replace merchantID
      KieuDoiTuong: 1, // todo used value 1-NhanHang; 2-Group
      TenCuaHang: body.nameShop,
      DiaChi: body.address,
      HotLine: body.hotLine,
      ThuDienTu: body.email,
      KinhDo: body.lng,
      ViDo: body.lat,
      TrangThai: body.state,
      MaTinhThanh: body.city
    };
    return this._apiRequest.patch(`${this.basePath}/stores/${body.idShop}`, bodyData);
  }

  /**
   * @method createShopFromFile
   * @description update shop detail
   * @returns {Observable<ResponseCustom>}
   */
  public createShopFromFile(file: any): Observable<ResponseCustom> {
    return this._apiRequest.sendWithFile(`${this.basePath}/stores/upload`, 'post', {}, file);
  }

  /**
   * @method fileExample
   * @description get file example of product
   * @returns {file}
   */
  public fileExample() {
    // let a = `${this.basePath};
    // console.log(a);
    // return this._apiRequest.get(`${this.basePath}/products${queryString}`);
    return `${this.apiUrl}${this.basePath}`;
  }

  /**
   * @method changeStateShowShop
   * @description enable, disable multiple shop
   * @param body
   * @returns {Observable<ResponseCustom>}
   */
  public changeStateShowShop(body: any): Observable<ResponseCustom> {
    return this._apiRequest.patch(`${this.basePath}/stores`, body, 1, {});
  }

  /**
   * @method toShop
   * @description mapping shop model
   * @param r
   * @returns {toShop}
   */
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
    console.log(shop);
    return shop;
  }
}
