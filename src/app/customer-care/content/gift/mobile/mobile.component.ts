/**
 * @author AnhDuc
 * @description template mobile for promotion
 * @version 1.0.0
 */

import {Component, OnChanges, Input, ViewChild, ElementRef, SimpleChange} from '@angular/core';
import {Http} from '@angular/http';
import {Gift} from '../gift.model';

@Component({
  selector: 'mobile-gift-component',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileGiftComponent implements OnChanges {

  // promotion valiable
  @Input() gift: Gift;
  @Input() setTop: number;
  @Input() uploaderImageDescriptions: any = [];
  @Input() uploaderAvatar: string = '';

  // Set element
  @ViewChild('elMobileContent') elMobileContent: ElementRef;
  @ViewChild('elMobileEntry') elMobileEntry: ElementRef;
  @ViewChild('elMobileName') elMobileName: ElementRef;

  // variable config slider
  public activeSlideIndex: number;
  public noWrapSlides: boolean = false;

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
    this.gift = {
      idGift: '',           // KhuyenMaiID
      nameGiff: '',         // TenKhuyenMai
      idCategory: '',       // MaDanhMuc
      giftForm: '[1]',          // HinhThucNhanQua
      conversionPoint: 0,   // DiemQuyDoi
      price: 0,             // GiaTien
      typeGift: 0,         // KieuQuaTang
      timeStartPromotion: new Date(),     // ThoiDiemBatDauKhuyenMai
      timeEndPromotion: new Date(),       // ThoiDiemKetThucKhuyenMai
      timeStartDisplay: new Date(),       // ThoiDiemBatDauHienThi
      timeEndDisplay: new Date(),         // ThoiDiemKetThucHienThi
      description: '',                    // MoTaChiTiet
      state: 1,                           // TrangThai
      avatar: '',                         // AnhDaiDien
      imageDescriptions: [{}],
      tags: [{}],
      number_max: 0
    }
  }
}
