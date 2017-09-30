/**
 * @author DuyBV
 * @description template mobile with type: user = 'product'
 * @version 1.0.0
 */

import {Component, OnInit, Input, OnChanges, ElementRef, SimpleChange, ViewChild} from '@angular/core';
import {Product} from '../../product.model';

@Component({
  selector: 'mobileProduct-component',
  templateUrl: './mobile-product.component.html',
  styleUrls: ['../karaoke/mobile-karaoke.component.scss']
})

export class MobileProductComponent implements OnInit, OnChanges {
  @Input() product: Product;
  @Input() uploaderImageDescriptions: any = [];
  @Input() uploaderAvatar: string = '';
  @Input() setTop: number;
  // Set element
  @ViewChild('elMobileContent') elMobileContent: ElementRef;
  @ViewChild('elMobileEntry') elMobileEntry: ElementRef;
  @ViewChild('elMobileName') elMobileName: ElementRef;

  public noWrapSlides: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this._initProductCreateEdit();
  }

  public ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(changes);
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
