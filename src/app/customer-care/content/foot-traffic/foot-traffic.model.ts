import {Shop} from '../shop/shop.model';
import {Paging} from '../../../common/model/paging';

export class FootTraffic {
  idFootTraffic?: string;         // KhuyenMaiID
  idCategory?: string;            // MaDanhMuc
  namePromotion?: string;         // TenKhuyenMai
  description?: string;           // MoTaChiTiet
  timeStartDisplay?: any;         // ThoiDiemBatDauHienThi
  timeEndDisplay?: any;           // ThoiDiemKetThucHienThi
  timeStartPromotion?: any;       // ThoiDiemBatDauKhuyenMai
  timeEndPromotion?: any;         // ThoiDiemKetThucKhuyenMai
  avatar?: string;                // AnhDaiDien
  imageDescriptions?: [{ linkImage?: string }];  // AnhMoTa -> Link// Anh
  tags?: [{ tag?: string }];      // tags
  stores?: [Shop];                // stores => CuaHangID
  state?: number;                 // TrangThai
  stateOfEffect?: number;         // TrangThaiHieuLuc
  limitPointDonation?: number;    // GioiHanTangDiem
  totalPointsAwarded?: number;    // TongSoDiemTang
  totalNumberVisit?: number;      // TongSoLuotGheTham
  pointsAwarded?: number;         // SoDiemTang
  maximumAccumulations?: number;  // SoLanTichToiDa
  distance?: number;              // KhoangCachGiuaHaiLanTangDiem
}

export class FootTraffics {
  'foot-traffic'?: [FootTraffic];
  paging?: Paging;
  C?: string;
  D?: string;
}
