/**
 * @author DuyBV
 * @description template mobile with type: user = 'karaoke'
 * @version 1.0.0
 */

import {Component, OnChanges, Input, ViewChild, ElementRef, SimpleChange} from '@angular/core';
import {Http} from '@angular/http';
import {Product} from '../../product.model';

@Component({
  selector: 'mobileKaraoke-component',
  templateUrl: './mobile-karaoke.component.html',
  styleUrls: ['./mobile-karaoke.component.scss']
})

export class MobileKaraokeComponent implements OnChanges {
  public data;
  // product valiable
  public noWrapSlides: boolean = false;
  @Input() product: Product;
  @Input() uploaderImageDescriptions: any = [];
  @Input() uploaderAvatar: string = '';
  @Input() setTop: number;
  // Set element
  @ViewChild('elMobileContent') elMobileContent: ElementRef;
  @ViewChild('elMobileEntry') elMobileEntry: ElementRef;
  @ViewChild('elMobileName') elMobileName: ElementRef;

  constructor(private http: Http) {
    this._initProductCreateEdit();
  }

  public ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (typeof changes.setTop !== 'undefined') {
      this.elMobileContent.nativeElement.scrollTop = (this.setTop
        - this.elMobileName.nativeElement.offsetTop) + 10;
    }
  }

  // ================ Support function =================================
  /**
   * @method _initProductCreateEdit
   * @description init product to create and edit
   */
  private _initProductCreateEdit() {
    this.product = {
      idProduct: '',
      name: '',
      price: 0,
      idCategory: '',
      codeProduct: '',
      avatar: '',
      productPoint: 0,
      statusChangePoint: 1,
      state: 0,
      description: '',
      textSearch: ''
    }
  }
}
