/**
 * @class Gift
 * @description mixin model gift
 * @alias Present
 */

import {Paging} from '../../../common/model/paging';

export class Gift {
  idGift?: string;           // KhuyenMaiID
  nameGiff?: string;         // TenKhuyenMai
  idCategory?: string;       // MaDanhMuc
  giftForm?: string;         // HinhThucNhanQua number - [1]:Received-immediately-after-pay, [2]:Received-by-post
  typeGift?: number;         // KieuQuaTang - get list new api static
  conversionPoint?: number;  // DiemQuyDoi
  price?: number;            // GiaTien
  timeStartPromotion?: any;  // ThoiDiemBatDauKhuyenMai
  timeEndPromotion?: any;    // ThoiDiemKetThucKhuyenMai
  timeStartDisplay?: any;    // ThoiDiemBatDauHienThi
  timeEndDisplay?: any;      // ThoiDiemKetThucHienThi
  description?: string;      // MoTaChiTiet
  state?: number;            // TrangThai
  stateOfEffect?: number;    // TrangThaiHieuLuc
  avatar?: string;           // AnhDaiDien
  imageDescriptions?: [{ linkImage?: string }];  // AnhMoTa -> LinkAnh
  tags?: [{ tag?: string }]; // tags
  number_max?: number;
}

export class Gifts {
  gift?: [Gift];
  paging?: Paging;
  C?: string;
  D?: string;
}

export class PresentsType {
  id: string;
  name: string;
  conversionPoint: number;
  price: number;
  type: number;
}
