/**
 * @class PromotionReportModel
 * @author ManhNV
 * @description mixin report promotion
 */

import { Paging } from '../../../common/model/paging';

export class PromotionLineChart {
  C?: string;
  reports?: {
    views?: {
      sumary?: number;
      data?: [{
        value?: number;
        time?: string;
      }];
    };
    purchase?: {
      sumary?: number;
      data?: [{
        value?: number;
        time?: string;
      }];
    };
    received?: {
      sumary?: number;
      data?: [{
        value?: number;
        time?: string;
      }];
    };
  }
}

export class TransactionPromotion {
  idCustomer?: string;          // KhachHangID
  idPhone?: string;             // IDSoDienThoai
  email?: string;               // Email
  codeTrading?: string;         // MaGiaoDich
  state?: number;               // TrangThai
  dateCreate?: string;          // ThoiDiemTao
  dateVerify?: string;          // ThoiDiemXacThuc
  dateUpdate?: string;          // ThoiDiemCapNhat
  nameCustomerReceip?: string;  // TenKhachNhanQua
  address?: string;             // DiaChiNhanQua
  typeReceip?: number;          // HinhThucNhanQua
  fullName?: number;            // HoTen
}

export class TransactionsPromotion {
  C?: string;
  transaction?: TransactionPromotion[];
  paging?: Paging;
}

export class PromotionReport {
  idPromotion?: string;   // KhuyenMaiID
  namePromotion?: string; // TenVoucher
  avatar?: string;        // AnhDaiDien
  total_views?: number;
  total_purchase?: number;
  total_received?: number;
  in_period?: {
    count?: {
      views?: number;
      purchase?: number;
      received?: number;
    };
    user?: {
      views?: number;
      purchase?: number;
      received?: number;
    };
  };
  all?: {
    count?: {
      views?: number;
      purchase?: number;
      received?: number;
    };
    user?: {
      views?: number;
      purchase?: number;
      received?: number;
    };
  };
}

export class VouchersReport {
  C?: string;
  vouchers?: PromotionReport[];
  paging?: Paging;
}
