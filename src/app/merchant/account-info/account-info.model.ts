import {Shop} from '../../customer-care/content/shop/shop.model';

export class AccountInfo {
  idUser: string;
  userName: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  avatar?: string;
  shops?: Shop;
}

export class AccountPassword{
  passwordOld: String;
  passwordNew: String;
  rePasswordNew?: String;
}
