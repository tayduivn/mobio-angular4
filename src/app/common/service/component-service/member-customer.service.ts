/**
 * @module member-customer.service
 * @author ManhNV
 * @description config member service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {MemberCustomer, MemberCustomers} from '../../../customer-care/content/member-customer/member-customer.model';
import {AuthenticateService} from '../common-service/authenticate.service';
import {Observable} from 'rxjs/Observable';
import {UtilService} from '../common-service/util.service';
import {CodeTypes} from '../../model/code-type.model';
import {ResponseCustom} from '../../model/response-custom.model';
import {Http} from '@angular/http';

@Injectable()
export class MemberCustomerService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  /**
   * @method getMemberCustomers
   * @description get list member customer
   * @returns {Observable<[City]>}
   * @todo [component-service] instead call api
   */
  public getMemberCustomers(dataFilter: any): Observable<MemberCustomers> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/cards${queryString}`);
  }

  public getTheMauNhaCungCapID(): Observable<MemberCustomers> {
    return this._apiRequest.get(`${this.basePath}/templates/cards`);
  }
  /**
   * @method getMemberCustomer
   * @description get Detail Member Customer
   * @returns {Observable<[City]>}
   * @todo [component-service] instead call api
   */
  public getDetailMemberCustomer(_idMemberCustomer): Observable<MemberCustomer>  {
   return this._apiRequest.get(`${this.basePath}/cards/${_idMemberCustomer}`);
  }
  /**
   * @type get
   * @method getCodeTypes
   * @description get list code-type
   * @returns {Observable<CodeTypes>}
   * @todo confirm switch codeType in new service
   */
  public getCodeTypes(): Observable<CodeTypes> {
    return this._apiRequest.get(`static/code_types.json`);
  }
  /**
   * @method toMemberCustomer
   * @description mapping member customer
   * @param r
   * @returns {MemberCustomer}
   */
  public static toMemberCustomer(r: any): MemberCustomer {
    let memberCustomer: MemberCustomer = {
      idMemberCustomer: r['KhachHangTheNhaCungCapID'],
      name: r['HoTen'],
      phone: r['IDSoDienThoai'],
      email: r['Email'],
      category: r['LoaiThe'],
      keyCard: r['MaNhanDangThe'],
      imageFist: r['LinkAnhMatTruoc'],
      imageLast: r['LinkAnhMatSau'],
      dataCreate: r['ThoiDiemTao'],
      dateActive: r['ThoiDiemCapNhat'],
      dob: r['dob'],
      address: r['DiaChi'],
      gender: r['GioiTinh'],
      status: r['TrangThaiDuyet'],
      TheMauNhaCungCapID: r['TheMauNhaCungCapID'],
    };
    console.log(memberCustomer);
    return memberCustomer;
  }


  /**
   * @method createMemberCustomer
   * @description create new MemberCustomer
   * @param body
   * @returns {Observable<Response>}
   */
  public createMemberCustomer(bodyData) {

    return this._apiRequest.post(`${this.basePath}/cards`, bodyData);
  }
  /**
   * @method createMemberCustomer
   * @description create new MemberCustomer
   * @param body
   * @returns {Observable<Response>}
   */
  public editMemberCustomer(bodyData, idMberCustomer) {
    return this._apiRequest.patch(`${this.basePath}/cards/${idMberCustomer}`, bodyData);
  }
  public approvalCancelMemberCustomer(data) {
    return this._apiRequest.patch(`${this.basePath}/cards`, data);
  }

}
