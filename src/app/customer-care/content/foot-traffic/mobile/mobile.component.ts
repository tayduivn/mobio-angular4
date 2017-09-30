/**
 * @author AnhDuc
 * @description template mobile for promotion
 * @version 1.0.0
 */

import {Component, OnChanges, Input, ViewChild, ElementRef, SimpleChange} from '@angular/core';
import {Http} from '@angular/http';
import {FootTraffic} from '../foot-traffic.model';

@Component({
  selector: 'mobile-foot-traffic-component',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileFootTrafficComponent implements OnChanges {

  // foot valiable
  @Input() footTraffic: FootTraffic;
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
    this._initFootTrafficCreateEdit();
  }

  public ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.elMobileContent.nativeElement.scrollTop = 100;
    if (typeof changes.setTop !== 'undefined') {
      this.elMobileContent.nativeElement.scrollTop = (this.setTop - this.elMobileName.nativeElement.offsetTop) + 10;
    }
  }

  // ================ Support function =================================
  /**
   * @method _initFootTrafficCreateEdit
   * @description init foot-traffic to create and edit
   */
  private _initFootTrafficCreateEdit() {
    this.footTraffic = {
      idFootTraffic: '',
      idCategory: '',
      namePromotion: '',
      description: '',
      timeStartDisplay: new Date(),      // ThoiDiemBatDauHienThi
      timeEndDisplay: new Date(),        // ThoiDiemKetThucHienThi
      timeStartPromotion: new Date(),    // ThoiDiemBatDauKhuyenMai
      timeEndPromotion: new Date(),      // ThoiDiemKetThucKhuyenMai
      avatar: '',
      imageDescriptions: [{}],
      tags: [{}],
      stores: [{}],
      state: 1,
      limitPointDonation: 4, // 4 TongSoDiemTang, 5 TongSoLuotGheTham
      totalPointsAwarded: 0,
      totalNumberVisit: 0,
      pointsAwarded: 0,
      maximumAccumulations: 0,
      distance: 0
    };
  }
}
