/**
 * @description filter pipe role
 * @version 1.0.0
 */

import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {RoleService} from '../service/common-service/role.service';
import {Role} from '../model/role.model';
import * as _ from 'lodash';

@Pipe({
  name: 'dataRolePipe'
})
@Injectable()
export class RolePipe implements PipeTransform {
  public roles: Role[];

  constructor(private _roleService: RoleService) {
    this._roleService.getRoles()
      .subscribe(roleData => this.roles = roleData.map(RoleService.toRole));
  }

  transform(array: Role[], queryIdGroup: string): any {
    array = this.roles;
    if (queryIdGroup && queryIdGroup !== '') {
      const resultRole = _.find(array, provincesCity => provincesCity.idGroup === queryIdGroup.toString());
      return !resultRole ? '' : resultRole.nameGroup;
    }
    return array;
  }
}
