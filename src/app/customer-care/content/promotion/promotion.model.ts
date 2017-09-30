/**
 * @author ManhNV
 * @description mixin promotion model
 */

import {Paging} from '../../../common/model/paging';
import {Shop} from '../shop/shop.model';

export class PromotionType {
  code: string;
  title: {
    vi: string,
    en: string
  };
}

export class Promotion {
  idPromotion?: string;           // KhuyenMaiID
  idCategory?: string;            // MaDanhMuc
  code_active_max?: number;
  code_active_max_per_day?: number;
  code_user_active_max?: number;
  code_user_get_max_per_day?: number;
  code_user_get_max?: number;
  description?: string;           // MoTaChiTiet
  timeStartDisplay?: any;      // ThoiDiemBatDauHienThi
  timeEndDisplay?: any;        // ThoiDiemKetThucHienThi
  timeStartPromotion?: any;    // ThoiDiemBatDauKhuyenMai
  timeEndPromotion?: any;      // ThoiDiemKetThucKhuyenMai
  number_seconds_code_valid?: number;             // Thoi gian hieu luc cua ma giao dich
  number_seconds_between_twice_get_code?: number; // Thời gian giữa các lần lẫy mã
  imageDescriptions?: [{ linkImage?: string }];  // AnhMoTa -> LinkAnh
  tags?: [{ tag?: string }];      // tags
  avatar?: string;                // AnhDaiDien
  idProduct?: string;             // SanPhamID
  typePromotion?: number;         // KieuKhuyenMai
  typeDiscount?: number;          // KieuGiamGia
  namePromotion?: string;         // TenKhuyenMai
  nameProduct?: string;           // TenSanPham
  priceDecrease?: number;          // GiaTienGiam
  discountPercentage?: number;    // PhanTramGiamGia
  stores?: [Shop];                // stores => CuaHangID
  state?: number;                 // TrangThai
  stateOfEffect?: number;         // TrangThaiHieuLuc
}

export class Promotions {
  promotions?: [Promotion];
  paging?: Paging;
  C?: string;
  D?: string;
}
