import {Paging} from '../../../common/model/paging';
export class MemberCustomer {
  idMemberCustomer?: string;
  name?: string;
  phone?: string;
  email?: string;
  category?: string;
  keyCard?: string;
  imageFist?: string;
  imageLast?: string;
  dataCreate?: string;
  dateActive?: string;
  dob?: string;
  address?: string;
  gender?: number;
  status?: number;
  TheMauNhaCungCapID?: string
}

export class MemberCustomers {
  cards?: [MemberCustomer];
  paging?: Paging;
  C?: string;
  D?: string;
}
