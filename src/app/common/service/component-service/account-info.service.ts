/**
 * @module account-info.service
 * @author ManhNV
 * @description config service acount-info
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {AuthenticateService} from '../common-service/authenticate.service';
import {ResponseCustom} from '../../model/response-custom.model';
import {AccountInfo, AccountPassword} from '../../../merchant/account-info/account-info.model';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Injectable()
export class AccountInfoService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService,
              private http: Http) {
    console.log(this._authService.jwtDecode().adminAccountID);
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  /**
   * @method getAccountInfo
   * @description get info user
   * @deprecated instead service http = service apiRequest
   * @returns {Observable<AccountInfo>}
   * @todo
   */
  public getAccountInfo() {
    return this._apiRequest.get(`${this.basePath}/staffs/${this._authService.jwtDecode().adminAccountID}`);
  }

  /**
   * @method updateBasicInfo
   * @description
   * @param {AccountInfo} body
   * @returns {Observable<ResponseCustom>}
   */
  public updateBasicInfo(body: AccountInfo): Observable<ResponseCustom> {
    let bodyData = {
      TenTaiKhoan: body.userName,
      HoTen: body.fullName,
      Email: body.email,
      SoDienThoai: body.phoneNumber
    };
    return this._apiRequest.sendNotFile(`${this.basePath}/staffs/${this._authService.jwtDecode().adminAccountID}`
      , 'patch', bodyData);
  }

  /**
   * @method updatePassword
   * @description
   * @param {any} body
   * @returns {Observable<ResponseCustom>}
   */
  public updatePassword(body: AccountPassword): Observable<ResponseCustom> {
    let bodyData = {
      NhaCungCapID: this._authService.jwtDecode().merchantID,
      TaiKhoanQuanTriID: this._authService.jwtDecode().adminAccountID,
      current_password: body.passwordOld,
      new_password: body.passwordNew,
      new_password_confirm: body.rePasswordNew
    };
    return this._apiRequest.put(`password`, bodyData);
  }

  /**
   * @method updateBasicInfo
   * @description
   * @param {any} file
   * @returns {Observable<ResponseCustom>}
   */
  public updateAvatar(file: any): Observable<ResponseCustom> {
    return this._apiRequest.sendWithFile(`${this.basePath}/staffs/${this._authService.jwtDecode().adminAccountID}/avatar`
      , 'post', {}, file);
  }

  /**
   * @method toAccountInfo
   * @static
   * @description maping object
   * @param r
   * @return AccountInfo
   */
  public static toAccountInfo(r: any): AccountInfo {
    const accountInfo: AccountInfo = {
      idUser: r['TaiKhoanQuanTriID'],
      userName: r['TenTruyCap'],
      fullName: r['HoTen'],
      email: r['ThuDienTu'],
      phoneNumber: r['SoDienThoai'],
      avatar: r['AnhDaiDien'],
    };
    console.log(accountInfo);
    return accountInfo;
  }
}
