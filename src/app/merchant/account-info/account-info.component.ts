import { Component, ViewChild, Renderer, ElementRef, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { Observable } from 'rxjs';

import { AccountInfo, AccountPassword } from './account-info.model';
import { AccountInfoService } from '../../common/service/component-service/account-info.service';
import { ShopService } from 'app/common/service/component-service/shop.service';
import { Shop } from 'app/customer-care/content/shop/shop.model';

@Component({
  selector: 'account-info-component',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})

export class AccountInfoComponent implements OnInit {
  @ViewChild('fileUrlAvatar') fileUrlAvatar: ElementRef;
  // ====================== DECLARE VALIRABLE ==============================================
  // Valiable common
  public accountInfo: AccountInfo;
  public accountPassword: AccountPassword;
  public shops: Shop[];
  public fileAvatar: any = null;
  // valiable state edit
  public _stateEditAvatar: boolean = false;
  public _stateEditBasicInfo: boolean = false;
  public _stateEditPassword: boolean = false;
  public _stateSeeMore: boolean = false;
  public _stateAmintionBasicInfo: boolean = false;
  // valiable for shop
  public numberSeeMoreShop: number = 5;
  public defaultAvatar: string = '../../../assets/img/noimage.png';

  constructor(private _accountInfoService: AccountInfoService,
    private _shopService: ShopService,
    private renderer: Renderer,
    private _toasterService: ToasterService,
    private _router: Router) {
    this._getUserInfo();
  }

  ngOnInit() {
    this._initNonePassword();
  }

  // =================================== ACCOUNT BASIC INFORMATION ================================
  /**
   * @method _getUserInfo
   * @description get user info
   */
  private _getUserInfo() {
    this._accountInfoService.getAccountInfo().subscribe(data => {
      if (data.C === '999') {
        this._toasterService.pop('error', null, data.D);
        return;
      }
      this.accountInfo = [data.staff].map(AccountInfoService.toAccountInfo)[0];
      this.shops = data.staff.stores.map(ShopService.toShop);
    }, err => {
      console.log(err);
    });
  }

  /**
   *
   * @param event
   */
  public onClickEditBasicInfo(event: any) {
    this._stateEditBasicInfo = !this._stateEditBasicInfo;
  }


  /**
  * @method validateAll
  * @description validate data: username, email, gmail
  */
  public validateAll() {
    //validate username
    let reg = /[^A-Z,!@#$%^&*()-+=]$/g;
    if (!this.accountInfo.fullName) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Họ và tên không được phép bỏ trống');
      return false;
    }
    let checkUsername = reg.test(this.accountInfo.fullName);
    if (!checkUsername) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Họ và tên chỉ sử dụng chữ cái từ a-z, số, dấu (_), dấu (.)');
      return false;
    }

    //validate email
    reg = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.accountInfo.email) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Email không được trống');
      return false;
    }
    let checkEmail = reg.test(this.accountInfo.email);
    if (!checkEmail) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Email không hợp lệ');
      return false;

    }

    //validate phone
    reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!this.accountInfo.phoneNumber) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Số điện thoại không được phép bỏ trống');
      return false;
    }
    let checkPhone = reg.test(this.accountInfo.phoneNumber);
    if (!checkPhone) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Số điện thoại không hợp lệ');
      return false;
    }

    return true
  }
  /**
   * @method onClickSubmitEditBasicInfo
   * @description submit data to edit user basic info
   * @param event
   * @todo no api to edit
   */
  public onClickSubmitEditBasicInfo(event: any) {
    // call to service edit basic info.
    if (!this.validateAll()) {
      return;
    }
    this._accountInfoService.updateBasicInfo(this.accountInfo)
      .subscribe((data) => {
        if (data.C === '999') {
          this._toasterService.pop('error', null, data.D);
          return;
        }
        this._stateAmintionBasicInfo = false;
        this._toasterService.pop('success', null, data.D);
        this._getUserInfo();
      }, err => {
        this._stateAmintionBasicInfo = false;
        this.funcError(err);
      });
    this._stateEditBasicInfo = !this._stateEditBasicInfo;
  }

  /**
   * @method onClickCancelEditBasicInfo
   * @description cancel edit basic info
   * @param event
   */
  public onClickCancelEditBasicInfo(event: any) {
    this._getUserInfo();
    this._stateEditBasicInfo = !this._stateEditBasicInfo;
  }

  // =================================== ACCOUNT AVATAR ==========================================

  /**
   * @method onClickEditAvatar
   * @description click buton then change sate edit avatar
   * @param event
   */
  public onClickEditAvatar(event: any) {
    this._stateEditAvatar = !this._stateEditAvatar;
  }

  /**
   * @method onClickSubmitEditAvatar
   * @description submit to service update data avatar
   * @param event
   * @todo
   */
  public onClickSubmitEditAvatar(event: any) {
    // call to service edit avatar.
    let _fileAvatar = [];
    if (this.fileAvatar) {
      _fileAvatar.push({
        name: 'AnhDaiDien',
        files: [this.fileAvatar]
      });
      this._accountInfoService.updateAvatar(_fileAvatar);
    }
    this._accountInfoService.updateAvatar(_fileAvatar)
      .subscribe(data => {
        this._toasterService.clear();
        this._toasterService.pop('success', null, data.D);
        this._stateEditAvatar = false;
      }, this.funcError);
  }

  /**
   * @method onClickCancelEditAvatar
   * @description cancel edit avatar
   * @param event
   */
  public onClickCancelEditAvatar(event: any) {
    this._getUserInfo();
    this._stateEditAvatar = !this._stateEditAvatar;
  }

  /**
   * @method uploadAvatar
   * @description parse url avatar on change upload to view
   */
  public uploadAvatar() {
    let fileUpload = this.fileUrlAvatar.nativeElement.files;
    console.log(fileUpload);
    if (fileUpload[0].size > 100000) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Dữ liệu ảnh quá lớn');
    }
    let fileAccep = ['image/jpeg', 'image/jpg', 'image/png']
    if (fileAccep.indexOf(fileUpload[0].type) === -1) {
      this._toasterService.clear();
      this._toasterService.pop('error', 'Nhập sai định dạng ảnh');
      return;
    }

    this.fileAvatar = fileUpload[0];
    if (!fileUpload || typeof fileUpload !== 'object') {
      return false;
    }
    let self = this;
    let reader = new FileReader();
    let iAvatar = fileUpload.length - 1;
    reader['onload'] = function (e: any) {
      self.accountInfo.avatar = e.target.result;
    };
    reader.readAsDataURL(fileUpload[iAvatar]);
  }

  /**
   * @method clickUploadAvatar
   * @description onclick image then show popup upload
   * @param event
   */
  public clickUploadAvatar(event) {
    if (!this._stateEditAvatar) {
      return;
    }
    let eventClick = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.fileUrlAvatar.nativeElement, 'dispatchEvent', [eventClick]);
  }

  // =================================== ACCOUNT PASSWORD MANGAER ================================

  /**
   * @method onClickSubmitEditPassword
   * @description submit to service update password
   */
  public onClickSubmitEditPassword() {
    if (!this.accountPassword.passwordOld) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Bạn cần nhập mật khẩu hiện tại!');
      return;
    }
    if (this.accountPassword.passwordOld !== this.accountInfo.password) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Mật khẩu cũ không hợp lệ!');
      console.log(this.accountInfo.password);
      return;
    }
    if (!this.accountPassword.passwordNew) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Bạn cần nhập mật mới!');
      return;
    }
    if (this.accountPassword.passwordNew.trim().length < 6||this.accountPassword.passwordNew.trim().length>16) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Mật khẩu phải có độ dài từ 6 đến 12 ký tự!');
      return;
    }
    if (this.accountPassword.passwordNew !== this.accountPassword.rePasswordNew) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Mật khẩu nhập nhập lại không khớp!');
      return;
    }
    this._accountInfoService.updatePassword(this.accountPassword)
      .subscribe((data) => {
        this._stateEditPassword = false;
        if (data.C === '999') {
          this._toasterService.pop('error', null, data.D);
          return;
        }
        this._toasterService.pop('success', null, data.D);
      }, this.funcError);
  }

  /**
   * @method onClickEditPassword
   * @description show form edit password
   * @param event
   */
  public onClickEditPassword(event: any) {
    this._initNonePassword();
    this._stateEditPassword = !this._stateEditPassword;
  }

  // =================================== SHOP VIEW ===============================================

  /**
   * @method seeMoreShops
   * @description see more list shop by user
   * @param event
   */
  public seeMoreShops(stateSeeMore: boolean) {
    this._stateSeeMore = stateSeeMore;
  }

  // =================================== SUPPORT FUNCTION ========================================
  /**
   * @method _initNonePassword
   * @description init field password to none
   */
  private _initNonePassword() {
    this.accountPassword = {
      passwordOld: '',
      passwordNew: '',
      rePasswordNew: ''
    };
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
