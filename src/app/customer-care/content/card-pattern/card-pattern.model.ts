/**
 * @class mixin card model
 * @author ManhNV
 */

import {Paging} from '../../../common/model/paging';

export class CardPattern {
  idCardPattern?: string;     // Id The
  cardName?: string;          // LoaiThe
  selfGenerateCode?: number;  // TuSinhMa <=> Kieu sinh ma the
  /**
   * @field typeCardDisplay
   * @description KieuHienThiMaNhanDanKhachHang
   */
  typeCardDisplay?: number;   // KieuHienThiMaNhanDangKhachHang
  tabbedBrowsing?: number;    // DuyetKhachHangTuDong <=> Kieu Duyet The
  frontPhoto?: string;        // AnhMatTruoc
  backPhoto?: string;         // AnhMatSau
  state?: number;             // TrangThai
}

export class CardPatternConfig {
  setting?: {
    card_condition?: number,
    change_card_level?: number
  };
  cards?: [{
    idCardPattern?: string,
    cardName?: string,
    value?: number
  }]
}

export class CardPatterns {
  cards?: [CardPattern];
  paging?: Paging;
  C?: string;
  D?: string;
}

