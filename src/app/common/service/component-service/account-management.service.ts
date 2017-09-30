/**
 * @module account.service
 * @author ManhNV - DuyBV
 * @description config promotion service
 * @version 1.0.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiRequestService } from '../common-service/api-request.service';
import {
  AccountManagement,
  AccountManagements
} from '../../../merchant/account-management/account-management.model';
import { RoleService } from '../../service/common-service/role.service';
import { AuthenticateService } from '../common-service/authenticate.service';
import { UtilService } from '../common-service/util.service';
import { ResponseCustom } from '../../model/response-custom.model';
import { ShopService } from './shop.service';

@Injectable()
export class AccountManagementService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
    private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  /**
   * @method getAccountManagement
   * @description get list AccountManagement
   * @param [dataFilter]
   * @returns {Observable<AccountManagement>}
   */
  public getAccountManagement(dataFilter: any): Observable<AccountManagements> {
    // return this.http.get('data/accountManagement.json');
    const queryString = UtilService.encodeParams(dataFilter);
    console.log(`${this.basePath}/staffs${queryString}`);
    return this._apiRequest.get(`${this.basePath}/staffs${queryString}`);
  }

  public getMerchantName(): Observable<string> {
    return new Observable(observer => {
      try {
        return observer.next(this._authService.jwtDecode().supplierCode);
      } catch (ex) {
        return observer.error(ex);
      }
    });
  }

  public getAccountManagementDetail(_idAccount: string): Observable<AccountManagement> {
    // return this._apiRequest.get(`${this.basePath}/staffs/${_idAccount}`);
    return new Observable(observer => {
      try {
        this._apiRequest.get(`${this.basePath}/staffs/${_idAccount}`)
          .subscribe(accountData => {
            accountData['staff']['roles'] = accountData['roles'];
            return observer.next([accountData['staff']]
              .map(AccountManagementService.toAccountManagement)[0]);
          });
      } catch (ex) {
        return observer.error(ex);
      }
    })
  }

  public removeAccount(idsRemove: any): Observable<ResponseCustom> {
    const queryString = UtilService.encodeParams(idsRemove);
    return this._apiRequest.delete(`${this.basePath}/staffs${queryString}`)
  }

  public createAccount(accountManage: AccountManagement, body: any): Observable<ResponseCustom> {
    let bodyMap = {
      TenTaiKhoan: accountManage.username,
      HoTen: accountManage.fullName,
      MatKhau: accountManage.password,
      SoDienThoai: accountManage.phone,
      Email: accountManage.email,
      roles: body['roles'],
      stores: body['stores']
    };
    return this._apiRequest.sendNotFile(`${this.basePath}/staffs`, 'post', bodyMap);
  }

  public updateAccount(accountManage: AccountManagement, body: any): Observable<ResponseCustom> {
    let bodyMap = {
      HoTen: accountManage.fullName,
      MatKhau: accountManage.password,
      SoDienThoai: accountManage.phone,
      Email: accountManage.email,
      roles: body['roles'],
      stores: body['stores']
    };
    return this._apiRequest.sendNotFile(`${this.basePath}/staffs/${accountManage.idAccount}`
      , 'patch', bodyMap);
  }

  /**
   * @method toAccountManagement
   * @description mapping account model
   * @param r
   * @returns {Promotion}
   */
  public static toAccountManagement(r: any): AccountManagement {
    const AccountManagement: AccountManagement = {
      idAccount: r['TaiKhoanQuanTriID'],
      username: r['TenTruyCap'],
      phone: r['SoDienThoai'],
      email: r['ThuDienTu'],
      fullName: r['HoTen'],
      roles: !r['roles'] || !Array.isArray(r['roles']) || r['roles'].length === 0
        ? [] : r['roles'].map(RoleService.toRole),
      stores: !r['stores'] || !Array.isArray(r['stores']) || r['stores'].length === 0
        ? [] : r['stores'].map(ShopService.toShop),
      images: r['avatar'],
      status: r['status'],
    };
    console.log(AccountManagement);
    return AccountManagement;
  }
}
