/**
 * @author ManhNV
 * @description template mobile for promotion
 * @version 1.0.0
 */

import {Component, OnChanges, Input, ViewChild, ElementRef, SimpleChange} from '@angular/core';
import {Voucher} from '../voucher.model';

@Component({
  selector: 'mobileVoucher-component',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileVoucherComponent implements OnChanges {
  // promotion valiable
  @Input() voucher: Voucher;
  @Input() setTop: number;
  @Input() uploaderImageDescriptions: any = [];
  @Input() uploaderAvatar: string = '';
  @Input() dateStartEvenmobi: any;
  @Input() dateStartEvenmobiString: any = '';
  @Input() nameVoucher: string = '';

  // Set element
  @ViewChild('elMobileContent') elMobileContent: ElementRef;
  @ViewChild('elMobileEntry') elMobileEntry: ElementRef;
  @ViewChild('elMobileName') elMobileName: ElementRef;

  // valiable config slider
  public noWrapSlides: boolean = false;

  constructor() {
    this._initPromotionCreateEdit();
  }

  public ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.elMobileContent.nativeElement.scrollTop = 100;
    if (typeof changes.setTop !== 'undefined') {
      this.elMobileContent.nativeElement.scrollTop = (this.setTop - this.elMobileName.nativeElement.offsetTop) + 10;
    }
    if (typeof this.dateStartEvenmobi === 'object' && typeof this.dateStartEvenmobi.format === 'function') {
      this.dateStartEvenmobiString = this.dateStartEvenmobi.format('DD/MM/YYYY HH:mm');
    }
  }

  // ================ Support function =================================
  /**
   * @method _initPromotionCreateEdit
   * @description init promotion to create and edit
   */
  private _initPromotionCreateEdit() {
    this.voucher = {
      idVoucher: '',              // VoucherID
      name: '',                   // TenVoucher
      voucherType: 1,             // KieuVoucher
      discountPercentage: 0,      // PhanTramGiamGia
      priceDecreases: 0,          // GiaTienGiam
      maximumAccumulations: 0,    // SoLanTichToiDa
      maximumOneTime: 0,          // SoLuongTichToiDaMotLan
      expireDate: 0,              // ThoiHanSuDung
      distance: 0,                // KhoangCachGiuaHaiLanTich
      avatar: '',                 // AnhDaiDien
      state: 1,                   // TrangThai
      description: '',            // MoTaChiTiet
      timeStart: new Date(),      // ThoiDiemBatDau
      timeEnd: new Date(),        // ThoiDiemKetThuc
      timeStartView: new Date(),  // ThoiDiemBatDauHienThi
      timeEndView: new Date(),    // ThoiDiemKetThucHienThi
      tags: [{}],                 // tags
      stores: [{}],               // stores => CuaHangID
      voucher_max: -1,
      voucher_user_max: -1,
    };
  }
}
