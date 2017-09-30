import { Component, ViewChild, ElementRef, OnInit, Renderer, Directive, Input, Output } from '@angular/core';
import * as _ from 'lodash';
import ckConfig from '../../common/config/ck.config';

import { MerchantInfo } from './merchant-info.model';
import { MerchantInfoService } from '../../common/service/component-service/merchant-info.service';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
  selector: 'merchant-info-component',
  templateUrl: './merchant-info.component.html',
  styleUrls: ['./merchant-info.component.scss']
})

export class MerchantInfoComponent implements OnInit {

  @ViewChild('fileUrlLogo') fileUrlLogo: ElementRef;
  // common valiable --------------------------------------
  public merchantInfo: MerchantInfo;
  public registerInfo: any = {
    phone: '',
    email: '',
    address: ''
  };
  public timer: any;
  public fileAvatarUpload: File = null;

  // state valiable
  public _stateEditCommonInfo: boolean = false;
  public _stateAmintionCommonInfo: boolean = false;
  public _stateEditLogo: boolean = false;
  public _stateEditContactInfo: boolean = false;
  public _stateAmintionContactInfo: boolean = false;

  // config valiable
  public configCkeditor = {
    uiColor: '#F0F3F4',
    height: '300',
    toolbar: ckConfig.toolbar,
    toolbarGroups: ckConfig.toolbarGroups,
  };

  constructor(private _merchantInfoService: MerchantInfoService,
    private _router: Router,
    private _toasterService: ToasterService,
    private renderer: Renderer) {
  }

  ngOnInit() {
    this._getMerchantInfo();
  }

  // ================================ COMMON INFO ===========================================

  /**
   * @method onClickEditCommonInfo
   * @description edit common info merchant
   * @param event
   */
  public onClickEditCommonInfo(event: any) {
    this._getMerchantInfo();
    this.resetCommonState();
  }

  public validatePhone(phone: string) {
    let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phone) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Hotline không được phép bỏ trống');
      return false;
    }
    var checkPhone = reg.test(this.merchantInfo.phone);
    if (!checkPhone) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Hotline không hợp lệ');
      return false;
    }
    return true;
  }

  public validateEmail(email: string) {
    let reg = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Email không được trống');
      return false;
    }
    var checkEmail = reg.test(email);
    if (!checkEmail) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Email không hợp lệ');
      return false;

    }
    return true;
  }

  public updateMerchantCommon(event: any) {
    this._getMerchantInfo();
    if (!this.merchantInfo.nameMerchant) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Tên nhãn hàng không được phép bỏ trống');
      return;
    }
    if (!this.validatePhone(this.merchantInfo.phone)) {
      return;
    }
    if (!this.validateEmail(this.merchantInfo.email)) {
      return;
    }

    this._merchantInfoService.updateMerchantInfo(this.merchantInfo)
      .subscribe(data => {
        this._toasterService.clear();
        this._toasterService.pop('success', null, data.D);
        this.resetCommonState();
        this._getMerchantInfo();
      }, this.funcError);

  }

  public resetCommonState() {
    this._stateAmintionCommonInfo = true;
    this.timer = setTimeout(() => {
      this._stateAmintionCommonInfo = false;
    }, 100);
    this._stateEditCommonInfo = !this._stateEditCommonInfo;
  }

  // ================================ LOGO ==================================================

  /**
   * @method onClickEditLogo
   * @description Event click edit logo
   * @param event
   */
  public onClickEditLogo(event: any) {
    this._stateEditLogo = true;
    this.fileAvatarUpload = null;
  }

  /**
   * @method onClickSubmitEditLogo
   * @description Event submit data to update logo
   * @param event
   */
  public onClickSubmitEditLogo(event: any) {
    let file = [];
    if (!this.fileAvatarUpload) {
      return;
    }
    if (this.fileAvatarUpload) {
      file.push({
        name: 'AnhDaiDien',
        files: [this.fileAvatarUpload]
      });
    }
    this._merchantInfoService.uploadMerchantLogo(file)
      .subscribe(data => {
        this._toasterService.clear();
        this._toasterService.pop('success', null, data.D);
        this._stateEditLogo = false;
      }, this.funcError);
  }

  /**
   * @method onClickCancelEditLogo
   * @description Event submit data to update logo
   * @param event
   */
  public onClickCancelEditLogo(event: any) {
    this._getMerchantInfo();
    this._stateEditLogo = false;
    this.fileAvatarUpload = null;
  }


  /**
   * @method clickUploadLogo
   * @description click image chose file to upload logo
   * @param event
   */
  public clickUploadLogo(event: any) {
    if (!this._stateEditLogo) {
      return;
    }
    let eventClick = new MouseEvent('click', { bubbles: true });
    console.log('sdfadsdffasd');
    this.renderer.invokeElementMethod(this.fileUrlLogo.nativeElement, 'dispatchEvent', [eventClick]);
    if (this.fileUrlLogo.nativeElement.files[0].size > 100000) {
      this._toasterService.clear();
      this._toasterService.pop('warning', 'File ảnh không được vượt quá 100kB');
    }
    console.log(this.fileUrlLogo.nativeElement);
    console.log(this.fileUrlLogo.nativeElement.files);
    console.log('sdfadsdffasd');

  }

  /**
   * @method uploadLogo
   * @description parse url avatar on change upload to view
   */
  public uploadLogo() {
    let fileUpload = this.fileUrlLogo.nativeElement.files;
    this.fileAvatarUpload = fileUpload[0];
    if (!fileUpload || typeof fileUpload !== 'object') {
      return false;
    }
    let self = this;
    let reader = new FileReader();
    let iLogo = fileUpload.length - 1;
    reader['onload'] = function (e: any) {
      self.merchantInfo.avatar = e.target.result;
    };
    reader.readAsDataURL(fileUpload[iLogo]);
  }

  // ================================ CONTACT ===============================================
  /**
   * @method onClickEditContactInfo
   * @description edit contact info merchant
   */
  public onClickEditContactInfo() {
    this._getMerchantInfo();
    this.resetStateContact();
  }

  /**
   * @method updateContactInfo
   * @description update contact information
   */
  public updateContactInfo() {
    this._getMerchantInfo();
    this._merchantInfoService.updatePointContact(this.registerInfo)
      .subscribe(data => {
        this._toasterService.clear();
        this._toasterService.pop('success', null, data.D);
        this.resetStateContact();
        this._getMerchantInfo();
      }, this.funcError);
  }

  public resetStateContact() {
    this._stateAmintionContactInfo = true;
    this.timer = setTimeout(() => {
      this._stateAmintionContactInfo = false;
    }, 100);
    this._stateEditContactInfo = !this._stateEditContactInfo;
  }

  // ================================ SUPPORT FUNCTION =======================================

  /**
   * @method _getMerchantInfo
   * @description get marchant info
   */
  private _getMerchantInfo() {
    this._merchantInfoService.getMerchantInfo()
      .subscribe(merchantData => {
        this.merchantInfo = [merchantData['merchant']].map(MerchantInfoService.toMerchantInfo)[0];
        this.registerInfo = merchantData['register_info'] === {} ? null : {
          phone: merchantData['register_info']['SoDienThoai'],
          email: merchantData['register_info']['ThuDienTu'],
          address: merchantData['register_info']['DiaChi']
        }
      }, err => {
        console.log(err);
      });
  }

  /**
   * @method funcError
   * @description execute error function
   * @param err
   */
  funcError = (err) => {
    this._toasterService.clear();
    this._toasterService.pop('error', null, err.D);
    if (err.status === 401) {
      Observable.timer(2000)
        .subscribe(() => {
          this._router.navigate(['login']);
        });
    }
  }
}
