/**
 * @class AccountManagement
 * @author ManhNV
 */
import {Paging} from '../../common/model/paging';
import {Role} from '../../common/model/role.model';
import {Shop} from '../../customer-care/content/shop/shop.model';

export class AccountManagement {
  idAccount?: string;
  username?: string; // TenTaiKhoan
  fullName?: string; // Ten Day Du
  email?: string;
  password?: string;
  phone?: string;
  images?: string;
  roles?: [Role];
  stores?: [Shop];
  status?: number;
}

export class AccountManagements {
  staffs?: [AccountManagement];
  paging?: Paging;
  C?: string;
  D?: string;
}
