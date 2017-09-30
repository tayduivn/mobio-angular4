/**
 * @module api-request.service
 * @author ManhNV
 * @description custom http method
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {JwtHelper} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';
import {AppConfig} from '../../config/app.config';
import {TokenModel} from '../../model/token.model';
import {Register} from '../../../page/register/register.model'
import {DataLogin, ResponseLogin} from '../../model/login.model';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ResponseCustom} from '../../model/response-custom.model';

@Injectable()
export class AuthenticateService {
  private jwtHelper: JwtHelper = new JwtHelper();
  private tokenAuth: string;

  constructor(private http: Http,
              private router: Router,
              private _appConfig: AppConfig) {
    /**
     * @deprecated instead token authenticate from login in system (not used tokenFake)
     * @type {string}
     * @todo [service] modify tokenFake by login
     */
    this.tokenAuth = localStorage.getItem('__token');
    // this.tokenAuth = initConfig.tokenFake;
  }

  public setToken(_tokenParam: string) {
    this.tokenAuth = localStorage.getItem('__token');
  }

  public getToken() {
    return localStorage.getItem('__token');
  }

  /**
   * @method jwtDecode
   * @description decode token
   * @returns {any}
   */
  public jwtDecode(): TokenModel {
    try {
      let tokenTemp = this.jwtHelper.decodeToken(localStorage.getItem('__token'));
      return [tokenTemp].map(this.toToken)[0];
    } catch (e) {
      localStorage.removeItem('__token');
      this.router.navigate(['/login']);
    }
  }

  public verifyToken(): Boolean {
    // todo request api verify token
    if (!localStorage.getItem('__token')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  /**
   * @description mapping TokenModel
   * @param r
   * @returns {TokenModel}
   */
  public toToken(r: any): TokenModel {
    let token: TokenModel = {
      adminAccountID: r['TaiKhoanQuanTriID'],
      xpointJoinState: r['TrangThaiThamGiaxPoint'],
      supplierCode: r['MaNhaCungCap'],
      avatar: r['AnhDaiDien'],
      accessName: r['TenTruyCap'],
      merchantName: r['TenNhaCungCap'],
      merchantID: r['NhaCungCapID'],
      permissions: r['Quyen']
    };
    return token;
  }

  public authenticate(body: DataLogin): Observable<ResponseLogin> {
    const bodyMap = {
      TenTruyCap: body.userName.trim(),
      MatKhau: body.password.trim()
    };
    return this.http.post(`${this._appConfig.getHostBase()}login`, bodyMap)
      .map((res: Response): any | null => {
        let data: ResponseLogin = res.json();
        this.setToken(data.jwt);
        localStorage.setItem('__token', data.jwt);
        data.D = 'Đăng nhập hệ thống thành công!';
        data.merchantName = this.jwtDecode().merchantName;
        return data;
      })
      .catch(this.catchErrorAuth);
  }

  public registerAccount(registerData: Register): Observable<ResponseCustom> {
    let dataMap = {
      'TenNhaCungCap': registerData.nameBrands,
      'TenTruyCap': registerData.userName,
      'MatKhau': registerData.password,
      'MatKhauNhacLai': registerData.retryPass,
      'ThuDienTu': registerData.email,
      'KieuNhaCungCap': registerData.displayType
    };
    return this.http.post(`${this._appConfig.getHostBase()}register`, dataMap)
      .map((res: Response): any | null => {
        let response: ResponseCustom = res.json();
        return response;
      })
      .catch(this.catchErrorAuth);
  }

  /**
   * @deprecated public is deprecated, Please change method to Private
   * @param {Response} res
   * @returns {any}
   */
  public mapResponseAuth(res: Response): any | null {
    let out = null;
    try {
      out = res.json();
    } catch (e) {
    }
    return out;
  };

  private catchErrorAuth(err: Response) {
    let out = null;
    try {
      out = err.json();
    } catch (e) {
    }
    return Observable.throw(out);
  }
}

@Injectable()
export class UserCanActive implements CanActivate {
  constructor(private auth: AuthenticateService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return (!!this.auth.verifyToken());
  }
}
