import { Paging } from '../../common/model/paging';

export class Point {
  idProduct: String;
  KieuVoucher: Number;
  voucher_max: Number;
  voucher_user_max: Number;
  ThoiHanSuDung: Number;
  ThoiDiemBatDau: String;
  ThoiDiemKetThuc: String;
  ThoiDiemBatDauHienThi: String;
  ThoiDiemKetThucHienThi: String;
  // tags: Array;
  // Voucher: tags;
  // CuaHangID: Array;
  imageDescriptions?: [{ 'linkImage': string }];

}

export class Points {
  products: [Point];
  paging: Paging;
  C: String
}
