/**
 * @class VoucherReportModel
 * @author ManhNV
 * @description mixin report voucher
 */

import {Paging} from '../../../common/model/paging';

export class VoucherLineChart {
  C?: string;
  reports?: {
    released?: {
      sumary?: number;
      data?: [{
        value?: number;
        time?: string;
      }];
    };
    used?: {
      sumary?: number;
      data?: [{
        value?: number;
        time?: string;
      }];
    }
  }
}

export class TransactionVoucher {
  idCustomer?: string;    // KhachHangID
  idPhone?: string;       // IDSoDienThoai
  email?: string;         // Email
  codeTrading?: string;   // MaGiaoDich
  state?: number;         // TrangThai
  history?: [{
    state?: number;       // TrangThai
    description?: string; // MoTa
    time?: string;
  }];
  fullName?: string;
}

export class TransactionsVoucher {
  C?: string;
  transaction?: TransactionVoucher[];
  paging?: Paging;
}

export class VoucherReport {
  VoucherID?: string;
  nameVoucher?: string; // TenVoucher
  stateEffect?: number; // TrangThaiHieuLuc
  avatar?: string;
  total_released?: number;
  total_used?: number;
  in_period?: {
    released?: number;
    used?: number;
  };
  all?: {
    released?: number;
    used?: number;
  }
}

export class VouchersReport {
  C?: string;
  vouchers?: VoucherReport[];
  paging?: Paging;
}
