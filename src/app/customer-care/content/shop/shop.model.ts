import {Paging} from '../../../common/model/paging';

export class Shop {
  idShop?: string; // CuaHangID
  city?: string; // MaTinhThanh
  address?: string; // DiaChi
  codeStore?: string; // MaCuaHang
  state?: number; // TrangThai
  email?: string; // ThuDienTu
  hotLine?: string;
  lat?: number; // ViDo
  lng?: number; // KinhDo
  nameShop?: string;
}

export class Shops {
  stores?: [Shop];
  paging?: Paging;
  C?: string;
  D?: string;
}
