/**
 * @module role.service
 * @author ManhNV
 * @description config city service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from './api-request.service';
import {Role} from '../../model/role.model';
import {Observable} from 'rxjs/Observable';
import {AuthenticateService} from './authenticate.service';
import {ResponseCustom} from '../../model/response-custom.model';

@Injectable()
export class RoleService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  /**
   * @method getRoles
   * @description get list role
   * @returns {Observable<[Role]>}
   */
  public getRoles(): Observable<Role[]> {
    return new Observable(observer => {
      this._apiRequest.get(`${this.basePath}/staffs/roles`)
        .subscribe(
          rolesData => observer.next(rolesData['roles'].length === 0
            ? [] : rolesData['roles']),
          err => observer.error(err)
        )
    })
  }

  /**
   * @method toRole
   * @description mapping role model
   * @param r
   * @returns {Role}
   */
  public static toRole(r: any): Role {
    let role: Role = {
      idGroup: r['MaNhom'],
      nameGroup: r['TenNhom']
    };
    return role;
  }
}
