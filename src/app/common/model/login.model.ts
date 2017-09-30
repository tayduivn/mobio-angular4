/**
 * @class login model
 * @author ManhNV
 * @description mixin model by login
 */

export class DataLogin {
  userName: string;
  password: string;
}

export class ResponseLogin {
  C?: string;
  D?: string;
  jwt?: string;
  merchantName?: string
}
