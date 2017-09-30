/**
 * @author ManhNV, DuyBV
 * @description manager promotions
 * @version 1.0.0
 */

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../../common/service/common-service/category.service';
import { Category } from '../../common/model/category.model';
import { AccountManagement } from './account-management.model';
import ckConfig from '../../common/config/ck.config';
import { AccountManagementService } from '../../common/service/component-service/account-management.service';
import { ShopService } from '../../common/service/component-service/shop.service';
import { ProvincesService } from '../../common/service/common-service/provinces.service';
import { RoleService } from 'app/common/service/common-service/role.service';
import { Provinces, ProvincesCity } from '../../common/model/provinces.model';
import { Role } from '../../common/model/role.model';
import { Paging } from '../../common/model/paging';
import { Shop } from '../../customer-care/content/shop/shop.model';

@Component({
  selector: 'account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss',
    '../../customer-care/content/product/product-styles/modal.component.scss',
    '../../customer-care/content/product/product-styles/product.component.scss'
  ]
})

export class AccountManagementComponent implements OnInit {
  // declare native element
  @ViewChild('fileUrl') fileUrl: ElementRef;
  @ViewChild('outImg') outImg: ElementRef;
  @ViewChild('fileUrlAvatar') fileUrlAvatar: ElementRef;
  @ViewChild('outImgAvatar') outImgAvatar: ElementRef;
  @ViewChild('accountManagementModal') public accountManagementModal: ModalDirective;
  @ViewChild('showTitleAccountModal') public showTitleAccountModal: ElementRef;
  // ---- validate native element
  public validateErrorAll: boolean = true;
  public userNameErrorAlert: boolean = false;
  public emailErrorAlert: boolean = false;
  public phoneErrorAlert: boolean = false;
  public passErrorAlert: boolean = false;

  public emailError: boolean = true;
  public userNameError: boolean = true;
  public phoneError: boolean = true;
  public passError: boolean = true;
  // ---- table native element
  @ViewChild('_selectAllAccount') _selectAllAccount: ElementRef;

  // common variable
  public categories: Category[];
  public accountManagements: AccountManagement[];
  public accountManagement: AccountManagement;
  public roles: Role[];
  public shops: Shop[];
  public merchantName: string = '';

  // variable filter table in modal select store
  public provincesCities: ProvincesCity[];
  public provinces: Provinces[];

  // show and hide with boolean check
  public allowButton: boolean = false;
  public setHideSelectCity: boolean = true;
  public setHideSelectArea: boolean = true;
  public setHideSelectOutClick: boolean = true;
  public checkBoxArea: boolean = false;
  public checkBoxCity: boolean = false;
  public checkAllShop: boolean = false;
  public checkAllCity: boolean = false;
  public isLoadingAccount: boolean = false;
  public disablePassword: boolean = false;

  // variable using popup create-edit account-management ----------------------------------
  public selectedDiscount: boolean = true;
  public images: any = [];
  public imagesAvatar: any = null;
  public item = [{ value: 0, display: 'Mỹ Phẩm' }];
  // data config ckeditor view
  public config = {
    uiColor: '#F0F3F4',
    height: '300',
    toolbar: ckConfig.toolbar,
    toolbarGroups: ckConfig.toolbarGroups,
  };
  public randomstring: string = '';

  // sort filter
  public filterTypeName: boolean = true;
  public filterTypeFullName: boolean = true;
  public filterTypeEmail: boolean = true;
  public setIconName: number = 0;
  public setIconFullName: number = 0;
  public setIconEmail: number = 0;

  // variable data filter table account-management ----------------------------------------
  public dataFilter = {
    page: 1, // default page select is 1
    per_page: 5, // default get 5 item
    ChuoiTimKiem: '',
    sort: '',
    order: ''
  };
  public keySearch: string = '';
  public paging: Paging;

  // variable data filter table in modal shop ---------------------------------------------
  public dataFilterShop = {
    page: -1,
    MaTinhThanh: '',
  };
  public domainsSelect: string[] = [];
  public provincesCityByModal: ProvincesCity[] = [];
  public valueAddressSearch: string = '';
  public lstStore: string[] = [];
  public lstRole: string[] = [];
  public roleSelect: string = '';

  constructor(private _toasterService: ToasterService,
    private _router: Router,
    private _categoryService: CategoryService,
    private _provincesService: ProvincesService,
    private _roleService: RoleService,
    private _shopService: ShopService,
    private _accountManagementService: AccountManagementService) {
    this.initAccountManage();
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
  }

  ngOnInit() {
    this.filterAccountManage();
    // get merchant name
    this._accountManagementService.getMerchantName()
      .subscribe(data => this.merchantName = data.toLowerCase()
      , this.funcError);
    this._categoryService.getCategories()
      .subscribe(dataCategories => this.categories = dataCategories
      , this.funcError);
    this._roleService.getRoles()
      .subscribe(roleData => this.roles = roleData.map(RoleService.toRole)
      , this.funcError);
    // get city
    this._provincesService.getProvincesCity()
      .subscribe(provincesCityData => {
        this.provincesCities = provincesCityData; // use this.provincesCities assign latter
        _.map(this.provincesCities, provincesCity => provincesCity['select'] = false);
      }, this.funcError);
    this._provincesService.getProvinces()
      .subscribe(provincesData => {
        this.provinces = provincesData;
        for (let i = 0; i < this.provinces.length; i++) {
          this.provinces[i]['select'] = false;
        }
      });
    this.filterShop();
  }

  // ===================== FUNCTION INIT PAGE ================================================================
  /**
   * @function filterAccountManage
   * @description support filter account-management
   */
  public filterAccountManage(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._accountManagementService.getAccountManagement(this.dataFilter)
      .subscribe(data => {
        // set data and add temp field select
        console.log(data);
        this.accountManagements = (!data || !data.staffs) ? []
          : data.staffs.map(AccountManagementService.toAccountManagement);
        _.map(this.accountManagements, accountManagement => accountManagement.select = false);
        // set data filter
        if (data.paging) {
          this.paging = data.paging;
          this.paging.page = _setPage;
        }
      }, this.funcError);
  }

  public searchAccount() {
    this.dataFilter.ChuoiTimKiem = this.keySearch.trim();
    if (!this.keySearch) {
      this.dataFilter.ChuoiTimKiem = '';
    }
    this.filterAccountManage();
  }

  /**
   * @method filterShop
   * @description filter shop
   */
  public filterShop() {
    this._shopService.getShops(this.dataFilterShop) // -1 <=> get all page
      .subscribe(data => {
        this.shops = data.stores.length === 0 ? [] : data.stores.map(ShopService.toShop);
        _.map(this.shops, shop => shop.select = false);
      }, this.funcError);
  }

  // ================== FUNCTION SUPPORT FILTER ===================================================================
  /**
   * @method changePerPage
   * @description change per page view
   * @param {string} _perPage
   */
  public changePerPage(_perPage: number) {
    this.resetState();
    this.dataFilter.per_page = _perPage;
    this.filterAccountManage();
  }

  /**
   * @method getCurrentPage
   * @description get page when click button page
   * @param {string} _pageSelected
   */
  public getCurrentPage(_pageSelected: number) {
    this.resetState();
    this.dataFilter.page = _pageSelected;
    this.filterAccountManage(_pageSelected);
  }

  /**
   * @method sortName
   */
  public sortName() {
    // reset icon not filter
    this.setIconEmail = 0;
    this.setIconFullName = 0;

    this.resetState();  // reset state filter
    this.dataFilter.sort = 'TenTruyCap';

    this.filterTypeName = !this.filterTypeName;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeName ? 'desc' : 'asc';
    this.setIconName = !this.filterTypeName ? 2 : 1;
    this.filterAccountManage(this.dataFilter.page);
  }

  /**
   * @method sortFullName
   */
  public sortFullName() {
    // reset icon not filter
    this.setIconEmail = 0;
    this.setIconName = 0;

    this.resetState();  // reset state filter
    this.dataFilter.sort = 'HoTen';

    this.filterTypeFullName = !this.filterTypeFullName;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeFullName ? 'desc' : 'asc';
    this.setIconFullName = !this.filterTypeFullName ? 2 : 1;
    this.filterAccountManage(this.dataFilter.page);
  }

  /**
   * @method sortEmail
   */
  public sortEmail() {
    // reset icon not filter
    this.setIconFullName = 0;
    this.setIconName = 0;

    this.resetState();  // reset state filter
    this.dataFilter.sort = 'ThuDienTu';

    this.filterTypeEmail = !this.filterTypeEmail;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeEmail ? 'desc' : 'asc';
    this.setIconEmail = !this.filterTypeEmail ? 2 : 1;
    this.filterAccountManage(this.dataFilter.page);
  }

  // ================== FUNCTION SUPPORT TABLE ===================================================================
  public selectAllAccount(event: any) {
    if (event.currentTarget.checked === true) {
      this.allowButton = true;
      _.map(this.accountManagements, accountManage => accountManage['select'] = true);
    } else {
      this.allowButton = false;
      _.map(this.accountManagements, accountManage => accountManage['select'] = false);
    }
  }

  public selectAccountManage(event: any, _accountManageId: string) {
    if (event.currentTarget.checked === true) {
      this.allowButton = true;
    } else {
      this._selectAllAccount.nativeElement.checked = false;
    }
    let accountSelect = _.find(this.accountManagements
      , accountManage => accountManage.idAccount === _accountManageId);
    accountSelect.select = event.currentTarget.checked;
    const findSelect = _.findIndex(this.accountManagements
      , accountManage => accountManage.select === true);
    this.allowButton = findSelect !== -1;
  }

  // =========================== FUNCTION BAR TOP ===========================================================
  public removeAccountSelect() {
    let ids = '';
    this.accountManagements.forEach(accountManage => {
      if (accountManage['select']) {
        ids += `${accountManage.idAccount},`
      }
    });
    this._accountManagementService.removeAccount({ ids: ids })
      .subscribe(data => {
        this.resetState();
        this._toasterService.clear();
        this._toasterService.pop('success', null
          , `Xoá thành công ${data['total_staff']} tài khoản khỏi hệ thống!`);
        this.filterAccountManage();
      }, this.funcError);
  }

  /**
   * @method setViewCity
   * @description Function select city
   */
  public setViewCity() {
    this.setHideSelectCity = false;
    this.setHideSelectOutClick = false;
    this.setHideSelectArea = true;
  }

  /**
   * @method setViewArea
   * @description set view area
   */
  public setViewArea() {
    this.setHideSelectCity = true;
    this.setHideSelectOutClick = false;
    this.setHideSelectArea = false;
  }

  /**
   * @method dismisDopdown
   */
  public dismisDopdown() {
    this.setHideSelectOutClick = true;
    this.setHideSelectCity = true;
    this.setHideSelectArea = true;
  }

  /**
   * @method setCheckBoxArea
   */
  public setCheckBoxArea() {
    this.checkBoxArea = !this.checkBoxArea;
  }

  /**
   * @method setCheckBoxCity
   */
  public setCheckBoxCity() {
    this.checkBoxCity = !this.checkBoxCity;
  }

  // =========================== FUNCTION MENU LEFT ===================================================================
  public showStateFilter(event) {

  }

  public hideStateFilter(event) {

  }

  public acceptEffect(event) {

  }

  public rejectEffect(event) {

  }

  public allowChange(event) {

  }

  public doNotAllowChange(event) {

  }

  // =========================== FUNCTION ACTION CLICK IN TABLE =====================================================
  /**
   * @method removeAccount
   * @description remove single account by btn from table
   * @param {string} _idAccount
   */
  public removeAccount(_idAccount: string) {
    if (!confirm('Bạn có muốn xóa tài khoản đã chọn'))
      return;
    let params = {
      ids: _idAccount
    };
    this._accountManagementService.removeAccount(params)
      .subscribe(data => {
        this.resetState();
        this._toasterService.clear();
        this._toasterService.pop('success', null, data.D);
        this.filterAccountManage();
      }, this.funcError)
  }

  public selectDiscount(value: string) {
    this.selectedDiscount = value === '0';
    console.log(value);
  }

  // =========================== FUNCTION MODAL CREATE ACCOUNT ===================================================
  public showCreateAccountManagement() {
    // reset textbox
    this.initAccountManage();
    // reset select shop
    for (let i = 0; i < this.shops.length; i++) {
      this.shops[i]['select'] = false;
    }

    this.showTitleAccountModal.nativeElement.innerText = 'TẠO TÀI KHOẢN';
    this.provincesCityByModal = this.provincesCities;
    this.lstStore = [];
    this.roleSelect = '';
    this.createPassword();
    this.accountManagementModal.show();
  }

  /**
   * @method showEditAccountManagement
   * @description show and edit account management
   * @param {string} _idAccount
   */
  public showEditAccountManagement(_idAccount: string) {
    // reset textbox
    this.initAccountManage();
    this.disablePassword = true; // disable password input
    this.validateErrorAll = true; // default edit account <=> data fill input, select ... is valid
    this.passError = true;
    // reset select shop -------
    for (let i = 0; i < this.shops.length; i++) {
      this.shops[i]['select'] = false;
    }
    // change title edit
    this.showTitleAccountModal.nativeElement.innerText = 'SỬA TÀI KHOẢN';
    this.provincesCityByModal = this.provincesCities;
    // Select list role + list shop
    this._accountManagementService.getAccountManagementDetail(_idAccount)
      .subscribe(accountManageData => {
        this.accountManagement = accountManageData;
        this.accountManagement.username = this.accountManagement.username
          .replace(`@${this.merchantName}`, '');
        // set selected shop edit + push shop select in lstShop (lstStore) ---------------------
        let lstStore = accountManageData.stores || [];
        for (let i = 0; i < lstStore.length; i++) {
          this.lstStore.push(lstStore[i].idShop);
          const shopItemSelect = _.find(this.shops, shop => shop.idShop === lstStore[i].idShop);
          if (shopItemSelect) shopItemSelect.select = true;
        }
        // todo => Hien tai chi load duy nhat 1 role
        // set selected shop edit + push shop select in lstShop (lstStore) ---------------------
        this.roleSelect = accountManageData.roles.length === 0 ? '' : accountManageData.roles[0].idGroup;
        this.accountManagementModal.show();
      }, this.funcError);
  }

  public hideModalAccountManaganent() {
    this.accountManagementModal.hide();
  }

  public createPassword(): void {
    if (this.disablePassword) return;
    let chars = '012!3456789@&ABCD$E&FGHIJKLM#NOPQRS&TUVWXTZ$abc&defg%hikl!mnWop&qr*stuvwxyz!@%$*&#';
    let string_length = 12;
    this.accountManagement.password = '';
    for (let i = 0; i < string_length; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      this.accountManagement.password += chars.substring(rnum, rnum + 1);
    }
    console.log(this.accountManagement.password);
    this.passErrorAlert = false;
    this.passError = false;    
    this.validateAll();
  }

  public validateUserName(userName: string): void {
    let userTemp = `${userName}@${this.merchantName}`;
    let reg = /^\w+.?\w+@\w+.?\w+.?\w+\w$/g;
    this.userNameError = reg.test(userTemp) ? false : true;
    this.userNameErrorAlert = (this.userNameError === false) ? false : true;

    this.validateAll();
  }

  public validatePass(password: string) {
    let regNumber = /\d/g;
    let regSpecial = /[!@#$&*]/g;
    let regLower = /[a-b]/g;
    let regUpper = /[A-B]/g;
    let reg = [regNumber, regSpecial, regLower, regUpper];
    for (let i = 0; i < reg.length; i++) {
      if (!reg[i].test(password)) {
        this.passError = true;
        this.passErrorAlert = true;
        return;
      }
    }
    if (password.length < 4 || password.length > 12) {
      this.passError = true;
      this.passErrorAlert = true;
      return;
    }

    this.passError = false;
    this.passErrorAlert = false;
    this.validateAll();
  }

  public validateEmail(email: string) {
    let reg = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailError = !reg.test(email);
    this.emailErrorAlert = (this.emailError) ? true : false;

    this.validateAll();
  }

  public validatePhone(phone: string) {
    let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    this.phoneError = !reg.test(phone);
    this.phoneErrorAlert = (this.phoneError) ? true : false;
    this.validateAll();
  }

  /**
   * @method selectAllDomain
   * @description select all domain
   */
  public selectAllDomain(event: any) {
    // reset select all City + filter all
    this.resetWhenChangeDomain();
    this.checkBoxArea = !this.checkBoxArea;
    _.map(this.provinces, province => province['select'] = event.currentTarget.checked);
    // todo
    this.domainsSelect = event.currentTarget.checked ? [''] : [];
    this.provincesCityByModal = this.provincesCities;
  }

  /**
   * @method selectDomain
   * @param event
   * @param {string} _codeDomain
   */
  public selectDomain(event: any, _codeDomain: string) {
    // reset select all City + filter all
    this.resetWhenChangeDomain();

    // get list domain selected
    if (event.currentTarget.checked === true) {
      this.domainsSelect.push(_codeDomain);
    } else {
      this.checkAllShop = false;
      // remove domain in list domain select
      this.domainsSelect = _.filter(this.domainsSelect, domainSelect => {
        if (domainSelect !== _codeDomain) return domainSelect;
      })
    }
    // if not select another item in domain => reset provinces-city
    if (this.domainsSelect.length === 0) {
      this.provincesCityByModal = this.provincesCities; // provincesCities ís default when init page
      return;
    }
    // select city in list domain
    let provincesCity: ProvincesCity[] = [];
    this.provinces.forEach(provinceItem => {
      if (this.domainsSelect.indexOf(provinceItem.code) !== -1)
        provincesCity = _.concat(provincesCity, provinceItem.provinces);
    });
    this.provincesCityByModal = provincesCity;
    this.checkBoxCity = false;
  }

  public resetWhenChangeDomain() {
    this.dataFilterShop.MaTinhThanh = '';
    this.checkAllCity = false;
    this.filterShop();
  }

  /**
   * @method selectAllProvincesCity
   * @param event
   */
  public selectAllProvincesCity(event: any) {
    this.checkBoxCity = !this.checkBoxCity;
    this.checkAllCity = event.currentTarget.checked;
    _.map(this.provincesCityByModal
      , provincesCity => provincesCity['select'] = event.currentTarget.checked);
    if (event.currentTarget.checked) {
      this.provincesCityByModal.forEach(provincesCity => {
        this.dataFilterShop.MaTinhThanh += `${provincesCity.code},`;
      });
    } else {
      this.dataFilterShop.MaTinhThanh = '';
    }
    this.filterShop();
  }

  /**
   * @method selectProvincesCity
   * @description select item provinces city
   * @param event
   * @param {string} _code
   */
  public selectProvincesCity(event: any, _code: string) {
    // reset any more click filter provinces - city
    if (event.currentTarget.checked) {
      this.dataFilterShop.MaTinhThanh += `${_code},`;
    } else {
      this.dataFilterShop.MaTinhThanh = _.replace(this.dataFilterShop.MaTinhThanh, _code + ',', '');
    }
    this.filterShop();
  }

  /**
   * @method selectAllShop
   * @description select all checkbox in table and set all item shop select = true
   * @param event
   */
  public selectAllShop(event: any) {
    this.lstStore = [];
    this.checkAllShop = event.currentTarget.checked;
    if (event.currentTarget.checked === true) {
      _.map(this.shops, item => item['select'] = true);
      this.shops.forEach(shop => {
        this.lstStore.push(shop.idShop);
      })
    } else {
      _.map(this.shops, item => item['select'] = false);
    }
  }

  /**
   * @method selectShop
   * @description set item shop select is true
   * @param event -event checkbox
   * @param _idShop -id shop select
   */
  public selectShop(event: any, _idShop: string) {
    if (!event.currentTarget.checked) {
      this.checkAllShop = false;
      _.map(this.lstStore, store => {
        if (store !== _idShop)
          return store;
      });
    }
    this.lstStore.push(_idShop);
    let shopSelect = _.find(this.shops, shop => shop.idShop === _idShop);
    shopSelect.select = event.currentTarget.checked;
    const findSelect = _.findIndex(this.shops, shop => shop.select === true);
    this.allowButton = findSelect !== -1;
  }

  public saveAccount() {
    this.isLoadingAccount = true;
    console.log(this.roleSelect);
    if (this.showTitleAccountModal.nativeElement.innerText === 'SỬA TÀI KHOẢN') {
      this.updateAccount();
      return;
    } else {
      this.createAccount();
    }
  }

  /**
   * @method createAccount
   * @description create new account
   */
  public createAccount() {
    if (this.roleSelect === '') {
      this.isLoadingAccount = false;
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Vui lòng chọn quyền cấp cho tài khoản!');
      return;
    }
    if (this.lstStore.length === 0) {
      this.isLoadingAccount = false;
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Vui lòng chọn ít nhất 1 cửa hàng quản lý!');
      return;
    }
    let self = _.cloneDeep(this.accountManagement);
    self.username = `${this.accountManagement.username}@${this.merchantName}`;
    let bodyTemp = {
      roles: [this.roleSelect],
      stores: this.lstStore
    };
    this._accountManagementService.createAccount(self, bodyTemp)
      .subscribe(data => {
        this.isLoadingAccount = false;
        this.accountManagementModal.hide();
        this._toasterService.clear();
        this._toasterService.pop('success', null, data.D);
        this.filterAccountManage();
      }, err => {
        this.isLoadingAccount = false;
        this.funcError(err);
      });
  }

  /**
   * @method updateAccount
   * @description update account
   */
  public updateAccount() {
    if (this.roleSelect === '') {
      this.isLoadingAccount = false;
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Vui lòng chọn quyền cấp cho tài khoản!');
      return;
    }
    if (this.lstStore.length === 0) {
      this.isLoadingAccount = false;
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Vui lòng chọn ít nhất 1 cửa hàng quản lý!');
      return;
    }
    let bodyTemp = {
      roles: this.roleSelect === '' ? [] : [this.roleSelect],
      stores: this.lstStore
    };
    let self = _.cloneDeep(this.accountManagement);
    self.username = `${this.accountManagement.username}@${this.merchantName}`;
    this._accountManagementService.updateAccount(self, bodyTemp)
      .subscribe(data => {
        this.isLoadingAccount = false;
        this.accountManagementModal.hide();
        this._toasterService.clear();
        this._toasterService.pop('success', null, data.D);
        this.filterAccountManage(this.dataFilter.page);
      }, err => {
        this.isLoadingAccount = false;
        this.funcError(err);
      });
  }

  // ================ FUNCTION COMMON SUPPORT  ===================================================================
  public initAccountManage() {
    this.accountManagement = {
      idAccount: '',
      username: '', // TenTaiKhoan
      fullName: '', // Ten Day Du
      email: '',
      password: '',
      phone: '',
      images: '',
      roles: [{}],
      stores: [{}],
      status: 1
    };
    this.lstStore = [];
    this.disablePassword = false;
  }

  /**
   * @method resetState
   * @description reset check all and button bar- execute multiple [delete]
   */
  private resetState() {
    this.allowButton = false;
    this._selectAllAccount.nativeElement.checked = false;
  }

  private validateAll() {
    let value = [this.userNameError, this.emailError, this.phoneError, this.passError];
    console.log(this.accountManagement);
    if (value.indexOf(true) === -1)
      this.validateErrorAll = false;
    else {
      this.validateErrorAll = true;
    }
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
