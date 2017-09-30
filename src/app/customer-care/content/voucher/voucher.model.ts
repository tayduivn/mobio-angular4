import { Paging } from '../../../common/model/paging';
import { Shop } from '../shop/shop.model';

export class Voucher {
  idVoucher?: string;              // VoucherID
  name?: string;                   // TenVoucher
  voucherType?: number;            // KieuVoucher
  discountPercentage?: number;     // PhanTramGiamGia
  priceDecreases?: number;         // GiaTienGiam
  maximumAccumulations?: number;   // SoLanTichToiDa
  maximumOneTime?: number;         // SoLuongTichToiDaMotLan
  expireDate?: number;             // ThoiHanSuDung
  distance?: number;               // KhoangCachGiuaHaiLanTich
  avatar?: string;                 // AnhDaiDien
  state?: number;                  // TrangThai
  stateEffect?: number;            // TrangThaiHieuLuc
  description?: string;            // MoTaChiTiet
  timeStart?: any;              // ThoiDiemBatDau
  timeEnd?: any;                // ThoiDiemKetThuc
  timeStartView?: any;          // ThoiDiemBatDauHienThi
  timeEndView?: any;            // ThoiDiemKetThucHienThi
  tags?: [{ tag?: string }];        // tags
  imageDescriptions?: [{ linkImage?: string }];  // AnhMoTa -> LinkAnh
  stores?: [Shop];  // stores => CuaHangID
  voucher_max?: number;
  voucher_user_max?: number;
  idCategory?: string;
}

export class Vouchers {
  vouchers: [Voucher];
  paging: Paging;
  C: string;
}
