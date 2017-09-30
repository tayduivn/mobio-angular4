/**
 * @author AnhDuc
 * @description template mobile for promotion
 * @version 1.0.0
 */

import {Component, OnChanges, Input, ViewChild, ElementRef, SimpleChange} from '@angular/core';
import {Http} from '@angular/http';
import {Promotion} from '../promotion.model';

@Component({
  selector: 'mobilePromotion-component',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobilePromotionComponent implements OnChanges {

  // promotion valiable
  @Input() promotion: Promotion;
  @Input() setTop: number;
  @Input() uploaderImageDescriptions: any = [];
  @Input() uploaderAvatar: string = '';

  // Set element
  @ViewChild('elMobileContent') elMobileContent: ElementRef;
  @ViewChild('elMobileEntry') elMobileEntry: ElementRef;
  @ViewChild('elMobileName') elMobileName: ElementRef;

  // valiable config slider
  public activeSlideIndex: number;
  public noWrapSlides: boolean = false;
  public imageDefault: string = '../../../../assets/img/slide/slider_default.jpg';

  constructor(private http: Http) {
    this._initPromotionCreateEdit();
  }

  public ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.elMobileContent.nativeElement.scrollTop = 100;
    if (typeof changes.setTop !== 'undefined') {
      this.elMobileContent.nativeElement.scrollTop = (this.setTop - this.elMobileName.nativeElement.offsetTop) + 10;
    }
  }

  // ================ Support function =================================
  /**
   * @method _initPromotionCreateEdit
   * @description init promotion to create and edit
   */
  private _initPromotionCreateEdit() {
    this.promotion = {
      idPromotion: '',           // KhuyenMaiID
      idCategory: '',            // MaDanhMuc
      code_user_get_max: 0,
      code_active_max: 0,
      description: '',           // MoTaChiTiet
      timeStartDisplay: new Date(),      // ThoiDiemBatDauHienThi
      timeEndDisplay: new Date(),        // ThoiDiemKetThucHienThi
      timeStartPromotion: new Date(),    // ThoiDiemBatDauKhuyenMai
      timeEndPromotion: new Date(),      // ThoiDiemKetThucKhuyenMai
      number_seconds_code_valid: 0,
      imageDescriptions: [{}],  // AnhMoTa -> LinkAnh
      tags: [{}],      // tags
      avatar: '',                // AnhDaiDien
      idProduct: '',             // SanPhamID
      typePromotion: 0,         // KieuKhuyenMai
      typeDiscount: 0,          // KieuGiamGia
      namePromotion: '',         // TenKhuyenMai
      nameProduct: '',           // TenSanPham
      number_seconds_between_twice_get_code: 0,
      code_active_max_per_day: 0,
      priceDecrease: 0,          // GiaTienGiam
      code_user_active_max: 0,
      discountPercentage: 0,    // PhanTramGiamGia
      stores: [{}],                // stores => CuaHangID
      code_user_get_max_per_day: 0
    };
  }
}
