/**
 * @class Token
 * @author ManhNV
 * @description use "TokenModel" is an exception name because avoid duplication Token in system
 */

export class TokenModel {
  adminAccountID: string; // TaiKhoanQuanTriID
  xpointJoinState: string;
  supplierCode: string;   // Mã nhà cung cấp
  avatar: string;         // avatar
  accessName: string;     // Ten truy cap
  merchantName: string;   // Ten nha cung cap
  merchantID: string;     // Nhà cung cấp ID
  permissions: string[];  // Danh sach quyen
}
