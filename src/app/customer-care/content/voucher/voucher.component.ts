/**
 * @author ManhNV
 * @description manager promotions
 * @version 1.0.0
 */

import {Component, OnInit, ViewChild, HostListener, ElementRef, Renderer} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {FileUploader} from 'ng2-file-upload';
import {Shop} from '../shop/shop.model';
import {VoucherService} from '../../../common/service/component-service/voucher.service';
import {Voucher, Vouchers} from './voucher.model';
import ckConfig from '../../../common/config/ck.config';
import {ProvincesService} from '../../../common/service/common-service/provinces.service';
import {Provinces, ProvincesCity} from '../../../common/model/provinces.model';
import {Paging} from '../../../common/model/paging';
import {Router} from '@angular/router';
import {PromotionService} from '../../../common/service/component-service/promotion.service';
import {PromotionType} from '../promotion/promotion.model';
import {ShopService} from '../../../common/service/component-service/shop.service';
import {MobileVoucherComponent} from './mobile/mobile.component';

@Component({
  selector: 'voucher-component',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss',
    '../product/product-styles/product.component.scss',
    '../product/product-styles/modal.component.scss',
    '../promotion/promotion.component.scss',
    '../product/mobile/karaoke/mobile-karaoke.component.scss'
  ]
})

export class VoucherComponent implements OnInit {
  // declare native element
  @ViewChild('fileUrl') fileUrl: ElementRef;
  @ViewChild('outImg') outImg: ElementRef;
  @ViewChild('fileUrlAvatar') fileUrlAvatar: ElementRef;
  @ViewChild('outImgAvatar') outImgAvatar: ElementRef;
  @ViewChild('elModalDescription') elModalDescription: ElementRef;
  @ViewChild('elVoucherName') elVoucherName: ElementRef;
  @ViewChild('elImageDescription') elImageDescription: ElementRef;
  @ViewChild('_selectAllVoucher') _selectAllVoucher: ElementRef;
  // filter native element state
  @ViewChild('showStateItem') showStateItem: ElementRef;
  @ViewChild('hideStateItem') hideStateItem: ElementRef;
  // filter native element effect
  @ViewChild('acceptEffect') acceptEffect: ElementRef;
  @ViewChild('rejectEffect') rejectEffect: ElementRef;
  // native element modal
  @ViewChild('voucherModal') public voucherModal: ModalDirective;
  @ViewChild(MobileVoucherComponent) elMobileVoucher: MobileVoucherComponent;
  // Hot listener event
  @HostListener('scroll', ['$event'])
  // Scroll load
  @ViewChild('elModalVoucherBody') elModalVoucherBody: ElementRef;

  // common variable-----------------------------------------------------------------
  public vouchers: Voucher[];
  public voucher: Voucher;
  public shops: Shop[];
  public shop: Shop;
  public promotionTypes: PromotionType[];
  public promotionTypesModal: PromotionType[];
  public setTop: number; // scroll mobile
  public tags = [];
  public isLoadingVoucher: boolean = false;
  public valueDiscount: number = 0; // Phan tram hoac gia tien

  // variable filter table in modal select store
  public provincesCities: ProvincesCity[];
  public provinces: Provinces[];

  // show and hide with boolean check -----------------------------------------------
  public allowButton: boolean = false;
  // control section table apply in  ---------------------
  public setHideSelectCity: boolean = true;
  public setHideSelectArea: boolean = true;
  public setHideSelectOutClick: boolean = true;
  public checkBoxArea: boolean = false;
  public checkBoxCity: boolean = false;
  public checkAllShop: boolean = false;
  public checkAllCity: boolean = false;
  // variable control state option discount
  public setTypeDisCount: boolean = true;
  public textTitle: string = 'Tạo Voucher';
  public nameVoucher: string = '';
  public timeIsGiven: boolean = false;

  // variable using popup create voucher -----------------------------------------
  public images: any = [];
  public item = [{value: 0, display: 'Mỹ Phẩm'}];
  // data config ckeditor view
  public config = {
    uiColor: '#F0F3F4',
    height: '300',
    toolbar: ckConfig.toolbar,
    toolbarGroups: ckConfig.toolbarGroups,
  };

  // variable using popup create voucher ------------------------------------------
  // ---- sub variable control upload image
  public fileUploadAvatar: File = null;
  public uploaderAvatar: FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOverAvatar: boolean = false;
  @ViewChild('elInputFileAvatar') elInputFileAvatar: ElementRef;

  public fileUploadDescription: File[] = [];
  public uploaderImageDescriptions: FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOverImageDescriptions: boolean = false;
  @ViewChild('elInputFileImageDescriptions') elInputFileImageDescriptions: ElementRef;
  // ---- sub variable selectbox

  // -- Variable data filter
  // data filter shop ----------------------------------------------------------------
  public dataFilter = {
    TrangThai: '', // 1:Visible, 2:Invisible
    TrangThaiHieuLuc: '', // 1:Valid, 2:Expire
    MaDanhMuc: '',
    ChuoiTimKiem: '',
    sort: '',
    order: '',
    page: 1, // default page select is 1
    per_page: 5 // default get 5 item
  };
  public paging: Paging;
  // sort filter
  public filterTypeNameVoucher: boolean = true;
  public filterTypeTimeStart: boolean = true;
  public filterTypeTimeEnd: boolean = true;
  public setIconNameVoucher: number = 0;
  public setIconTimeStart: number = 0;
  public setIconTimeEnd: number = 0;

  // ------- config ranger-date picker ----------------------------------------------
  // config datetime  StartDisplay
  public dateTimeEventStart: any = new Date();
  public optionsStartEventDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY'
  };
  public optionsEndEventDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY',
    minDate: this.dateTimeEventStart
  };
  public optionsStartDisplayDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY'
  };
  public optionsEndDisplayDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY',
    minDate: this.dateTimeEventStart
  };

  // variable data filter table in modal shop ---------------------------------------------
  public dataFilterShop = {
    page: -1,
    MaTinhThanh: '',
  };
  public domainsSelect: string[] = [];
  public provincesCityByModal: ProvincesCity[] = [];
  public valueAddressSearch: string = '';
  public lstStore: string[] = [];

  constructor(private _toasterService: ToasterService,
              private renderer: Renderer,
              private _voucherService: VoucherService,
              private _router: Router,
              public _shopService: ShopService,
              private _promotionService: PromotionService,
              private _provincesService: ProvincesService) {
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
    this._initVoucherCreateEdit();
  }

  ngOnInit() {
    this._initVoucherCreateEdit();
    // filter voucher
    this.filterVoucher();
    // get all promotion type <=> category----------------------------------
    this._promotionService.getPromotionTypes()
      .subscribe(dataPromotionType => {
        this.promotionTypes = dataPromotionType;
      });
    // get city -----------------------------------------
    this._provincesService.getProvincesCity()
      .subscribe(provincesCityData => {
        this.provincesCities = provincesCityData; // use this.provincesCities assign latter
        _.map(this.provincesCities, provincesCity => provincesCity['select'] = false);
        console.log(this.provincesCities);
      }, this.funcError);
    this._provincesService.getProvinces()
      .subscribe(provincesData => {
        this.provinces = provincesData;
        _.map(this.provinces, province => province['select'] = false);
      });
    // filter all shop
    this.filterShop();
  }

  // =========================== FUNCTION INIT PAGE ===================================================
  /**
   * @function filterVoucher
   * @description support filter voucher
   * @private
   */
  private filterVoucher(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._voucherService.getVouchers(this.dataFilter)
      .subscribe(data => {
        // set data and add temp field select
        this.vouchers = data.vouchers.map(VoucherService.toVoucher);
        _.map(this.vouchers, voucher => voucher.select = false);
        if (data.paging) {
          this.paging = data.paging;
          this.paging.page = _setPage;
        }
      }, this.funcError);
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

  public getCurrentPage(_pageSelected: number) {
    this.resetState();
    this.dataFilter.page = _pageSelected;
    this.filterVoucher(_pageSelected);
  }

  public changePerPage(_perPage: number) {
    this.resetState();
    this.dataFilter.per_page = _perPage;
    this.filterVoucher();
  }

  // =========================== FUNCTION FILTER PAGE ==============================================
  // ----- sub filter state --------------------------------------------
  /**
   * @method filterStateShow
   * @description filter by state product equal show (1)
   */
  public filterStateShow() {
    // set disable allowButton + selectAllVoucher
    this.resetState();
    if (this.showStateItem.nativeElement.checked) {
      if (this.hideStateItem.nativeElement.checked)
        this.dataFilter.TrangThai = '';
      else this.dataFilter.TrangThai = '1';
    } else if (this.hideStateItem.nativeElement.checked) {
      this.dataFilter.TrangThai = '2';
    } else {
      this.dataFilter.TrangThai = '';
    }
    this.filterVoucher();
  }

  /**
   * @method filterStateHide
   * @description filter by state product equal hide (2)
   */
  public filterStateHide() {
    // set disable allowButton + selectAllVoucher
    this.resetState();

    if (this.hideStateItem.nativeElement.checked) {
      if (this.showStateItem.nativeElement.checked)
        this.dataFilter.TrangThai = '';
      else this.dataFilter.TrangThai = '2';
    } else if (this.showStateItem.nativeElement.checked) {
      this.dataFilter.TrangThai = '1';
    } else {
      this.dataFilter.TrangThai = '';
    }
    this.filterVoucher();
  }

  // ----- sub filter effect -------------------------------
  /**
   * @method filterAcceptEffect
   * @description filter by state accept effect <-> value = 1
   */
  public filterAcceptEffect() {
    // set disable allowButton + selectAllVoucher
    this.resetState();
    if (this.acceptEffect.nativeElement.checked) {
      if (this.rejectEffect.nativeElement.checked)
        this.dataFilter.TrangThaiHieuLuc = '';
      else this.dataFilter.TrangThaiHieuLuc = '1';
    } else if (this.rejectEffect.nativeElement.checked) {
      this.dataFilter.TrangThaiHieuLuc = '2';
    } else {
      this.dataFilter.TrangThaiHieuLuc = '';
    }
    this.filterVoucher();
  }

  /**
   * @method filterRejectEffect
   * @description filter by state reject effect <-> value = 2
   */
  public filterRejectEffect() {
    // set disable allowButton + selectAllVoucher
    this.resetState();

    if (this.rejectEffect.nativeElement.checked) {
      if (this.acceptEffect.nativeElement.checked)
        this.dataFilter.TrangThaiHieuLuc = '';
      else this.dataFilter.TrangThaiHieuLuc = '2';
    } else if (this.acceptEffect.nativeElement.checked) {
      this.dataFilter.TrangThaiHieuLuc = '1';
    } else {
      this.dataFilter.TrangThaiHieuLuc = '';
    }
    this.filterVoucher();
  }

  // -------- filter category -----
  /**
   * @method filterCate
   * @description filter category
   * @param event
   * @param {string} _codePromotionType
   */
  public filterCate(event: any, _codePromotionType: string) {
    this.resetState();
    // reset any more click filter category
    if (event.currentTarget.checked) {
      this.dataFilter.MaDanhMuc += `${_codePromotionType},`;
    } else {
      this.dataFilter.MaDanhMuc = _.replace(this.dataFilter.MaDanhMuc, _codePromotionType + ',', '');
    }
    this.filterVoucher();
  }

  public sortNameVoucher() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconTimeStart = 0;
    this.setIconTimeEnd = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'TenVoucher';
    this.filterTypeNameVoucher = !this.filterTypeNameVoucher;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeNameVoucher ? 'desc' : 'asc';
    this.setIconNameVoucher = !this.filterTypeNameVoucher ? 2 : 1;
    this.filterVoucher(this.dataFilter.page);
  }

  // ------- sub filter sorting timeStart and timeEnd
  public sortTimeStart() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconNameVoucher = 0;
    this.setIconTimeEnd = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'ThoiDiemBatDau';
    this.filterTypeTimeStart = !this.filterTypeTimeStart;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeTimeStart ? 'desc' : 'asc';
    this.setIconTimeStart = !this.filterTypeTimeStart ? 2 : 1;
    this.filterVoucher(this.dataFilter.page);
  }

  public sortTimeEnd() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconNameVoucher = 0;
    this.setIconTimeStart = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'ThoiDiemKetThuc';
    this.filterTypeTimeEnd = !this.filterTypeTimeEnd;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeTimeEnd ? 'desc' : 'asc';
    this.setIconTimeEnd = !this.filterTypeTimeEnd ? 2 : 1;
    this.filterVoucher(this.dataFilter.page);
  }

  public keySearch: string = '';

  // =========================== FUNCTION BAR MANAGER ==================================================
  public searchVoucher() {
    this.dataFilter.ChuoiTimKiem = this.keySearch;
    if (!this.keySearch) {
      this.dataFilter.ChuoiTimKiem = '';
    }
    this.filterVoucher();
  }

  /**
   * @method removeVoucherSelect
   * @description delete selected voucher
   */
  public removeVoucherSelect() {
    if (!confirm('Bạn có muốn xóa các sản phẩm đã chọn!')) return;
    let idVouchers: string = 'ids=';
    this.vouchers.forEach(voucher => {
      if (voucher['select'] === true) {
        idVouchers += voucher.idVoucher;
        idVouchers += ',';
      }
    });
    idVouchers = idVouchers.slice(0, idVouchers.length - 1);
    this._voucherService.deleteMultipleVoucher(idVouchers)
      .subscribe(data => {
        this.resetState();
        this.filterVoucher();
        this._toasterService.pop('success', null, data.D);
      }, err => {
        this.funcError(err);
      });
  }

  /**
   * @method switchStateVoucher
   * @description toggles the display state of selected voucher to hide
   */
  public switchStateVoucher(state: number) {
    let idVouchers = [];
    this.vouchers.forEach(voucher => {
      if (voucher['select'] === true) {
        idVouchers.push(voucher.idVoucher);
      }
    });
    const body = {
      vouchers: idVouchers,
      TrangThai: state
    };
    this._voucherService.changeStateShowVoucher(body)
      .subscribe(data => {
        this.resetState();
        this.filterVoucher(this.dataFilter.page);
        this._toasterService.pop('success', null, `${data.D}`);
      }, err => {
        this.funcError(err);
      });
  }

  // =========================== FUNCTION SHOW - HIDE MODAL VOUCHER ===============================================
  /**
   * @method hideModalVoucher
   * @description on click hide modal create or edit createVoucher
   */
  public hideModalVoucher() {
    // this._initVoucherCreateEdit();
    this.voucherModal.hide();
  }

  public onScrollVoucherModal() {
    let descriptionTop = this.elModalDescription.nativeElement.offsetTop;
    let promotionNameTop = this.elVoucherName.nativeElement.offsetTop;
    let promotionImageDescription = this.elImageDescription.nativeElement.offsetTop;
    let modalBodyTop = this.elModalVoucherBody.nativeElement.scrollTop;
    if (descriptionTop > modalBodyTop - 50 && descriptionTop < modalBodyTop + 50) {
      this.setTop = this.elMobileVoucher.elMobileEntry.nativeElement.offsetTop;
    }
    if (promotionNameTop > modalBodyTop - 20 && promotionNameTop < modalBodyTop + 20) {
      this.setTop = this.elMobileVoucher.elMobileName.nativeElement.offsetTop;
    }
    if (promotionImageDescription > modalBodyTop - 30 && promotionImageDescription < modalBodyTop + 30) {
      this.setTop = this.elMobileVoucher.elMobileName.nativeElement.offsetTop;
    }
  }

  /**
   * @method showModalVoucher
   * @description set state modal show is create or edit
   * @param event
   */
  public showModalVoucher(event) {
    this.voucherModal.show();
    if (event === 1) {
      this.textTitle = 'Tạo Voucher';
    } else {
      this.textTitle = 'Sửa Voucher';
    }
  }

  /**
   * @method showEditVoucher
   * @description edit voucher detail
   */
  public showEditVoucher(_idVoucher: string) {
    this._initVoucherCreateEdit();
    // reset selected shop -------
    for (let i = 0; i < this.shops.length; i++) {
      this.shops[i]['select'] = false;
    }
    // get detail voucher
    this._voucherService.getVoucherDetail(_idVoucher)
      .subscribe(dataVoucher => {
        this.voucher = dataVoucher;
        // set selected promotionType (<=> category) and push promotionType value is choice
        this.promotionTypesModal = _.cloneDeep(this.promotionTypes);
        if (!_.isNil(this.voucher.idCategory)) {
          for (let i = 0; i < this.promotionTypesModal.length; i++) {
            this.promotionTypesModal[i]['select'] = this.voucher.idCategory
              .indexOf(this.promotionTypesModal[i].code) !== -1;
            if (this.voucher.idCategory.indexOf(this.promotionTypesModal[i].code) !== -1) {
              this.promotionTypesSelect.push(this.promotionTypesModal[i].code);
            }
          }
        }
        // set selected shop edit + push shop select in lstShop (lstStore) ---------------------
        let lstStoreTemp = dataVoucher.stores || [];
        for (let i = 0; i < lstStoreTemp.length; i++) {
          this.lstStore.push(lstStoreTemp[i].idShop);
          const shopItemSelect = _.find(this.shops, shop => shop.idShop === lstStoreTemp[i].idShop);
          if (shopItemSelect) shopItemSelect.select = true;
        }
        // set list tag input
        for (let i = 0; i < this.voucher.tags.length; i++) {
          this.tags.push({value: i, display: this.voucher.tags[i].tag});
        }
        // set visible Khoang tg voucher co gia tri sd
        if (this.voucher.expireDate > 0) this.timeIsGiven = true;
        // set value PhanTramGiam || GiaTienGiam
        this.valueDiscount = this.voucher.discountPercentage > 0
          ? this.voucher.discountPercentage : this.voucher.priceDecreases;
        this.showModalVoucher(2); // show modal
      });
  }

  public showCreateVoucher() {
    this._initVoucherCreateEdit();
    this.voucher.imageDescriptions = null;
    // reset selected promotionType (<=> category)
    this.promotionTypesModal = _.cloneDeep(this.promotionTypes);
    // reset selected category by promotion
    _.map(this.promotionTypesModal, promotionType => promotionType['select'] = false);
    // reset shop selected
    _.map(this.shops, shop => shop['select'] = false);
    this.showModalVoucher(1);
  }

  // =========================== FUNCTION ACTION CLICK IN TABLE ===============================================
  /**
   * @method selectVouchers
   * @description select all vouchers
   * @param event
   */
  public selectVouchers(event) {
    if (event.currentTarget.checked) {
      this.allowButton = true;
      this.vouchers.map(voucher => voucher['select'] = true);
    } else {
      this.allowButton = false;
      this.vouchers.map(voucher => voucher['select'] = false);
    }
  }

  /**
   * @method selectPromotion
   * @description select single promotion
   * @param event
   * @param _idVoucher
   */
  public selectVoucher(event: any, _idVoucher: string) {
    // reset select
    if (event.currentTarget.checked === true) this.allowButton = true;
    else this._selectAllVoucher.nativeElement.checked = false;
    let promotionSelect = _.find(this.vouchers, voucher => voucher.idVoucher === _idVoucher);
    promotionSelect.select = event.currentTarget.checked;
    const findSelect = _.findIndex(this.vouchers, voucher => voucher.select === true);
    this.allowButton = findSelect !== -1;
  }

  /**
   * @method hideState
   * @description switch state show in promotion
   * @param _idVoucher
   * @param _state
   */
  public switchSingleState(_idVoucher: string, _state: number) {
    let idVoucher = [_idVoucher];
    _state = _state === 1 ? 2 : 1;
    const body = {
      vouchers: idVoucher,
      TrangThai: _state
    };

    this._voucherService.changeStateShowVoucher(body)
      .subscribe(data => {
        this.resetState();
        this.filterVoucher(this.dataFilter.page);
        this._toasterService.pop('success', null, `${data.D}`);
      }, this.funcError)
  }

  public switchState(event: any) {
    this.voucher.state = event.currentTarget.checked ? 1 : 2;
  }

  /**
   * @method removeVoucher
   * @description removeVouchor
   * @param _nameVoucher
   * @param _idVoucher
   */
  public removeVoucher(_nameVoucher: string, _idVoucher: string) {
    if (!confirm(`Bạn có muốn xóa voucher "${_nameVoucher.toUpperCase()}" ?`))
      return;
    let idVoucher: string = `ids=${_idVoucher}`;
    this._voucherService.deleteMultipleVoucher(idVoucher)
      .subscribe(data => {
        this.filterVoucher();
        this._toasterService.pop('success', null, data.D);
      }, this.funcError);
  }

  // ======================= FUNCTION POPUP MODEL CREATE  ====================================================
  // ------------------ function control show- hide province-city -----------
  /**
   * @description Function select city
   */
  public setViewCity() {
    this.setHideSelectCity = false;
    this.setHideSelectOutClick = false;
    this.setHideSelectArea = true;
  }

  public setViewArea() {
    this.setHideSelectCity = true;
    this.setHideSelectOutClick = false;
    this.setHideSelectArea = false;
  }

  public dismisDopdown() {
    this.setHideSelectOutClick = true;
    this.setHideSelectCity = true;
    this.setHideSelectArea = true;
  }

  public setCheckBoxArea() {
    this.checkBoxArea = !this.checkBoxArea;
  }

  public setCheckBoxCity() {
    this.checkBoxCity = !this.checkBoxCity;
  }

  // -------- select and choice promotionType <=> category by promotion
  public promotionTypesSelect = [];

  /**
   * @method selectPromotionInModal
   * @description add or remove promotionTypes in modal create| edit voucher
   */
  public selectPromotionInModal(event, _code) {
    // set selected checkbox
    if (event.currentTarget.checked) {
      this.promotionTypesSelect.push(_code);
    } else {
      // pull item promotionTypeSelect
      this.promotionTypesSelect = _.filter(this.promotionTypesSelect, promotionTypeSelect => {
        if (promotionTypeSelect !== _code)
          return promotionTypeSelect;
      });
    }
  }

  // ------------------ function control datetime execute -------------------
  /**
   * @method updateOptionsEndEvent
   * @description set min date chose end event datetime
   */
  public updateOptionsEndEvent() {
    this.optionsEndEventDatetimePicker = {
      format: 'DD/MM/YYYY HH:mm',
      dayViewHeaderFormat: 'MM YYYY',
      minDate: this.voucher.timeStart,
    };
  }

  /**
   * @method updateOptionsEndDisplay
   * @description set min date chose end event datetime
   */
  public updateOptionsEndDisplay() {
    this.optionsEndDisplayDatetimePicker = {
      format: 'DD/MM/YYYY HH:mm',
      dayViewHeaderFormat: 'MM YYYY',
      minDate: this.voucher.timeStartView
    };
  }

  // -------- function option discount --------------------
  /**
   * @method setShowVoucherCheck
   * @description switch state show in setShowVoucherCheck
   * @param value
   */
  public setShowVoucherCheck(value: string) {
    this.voucher.voucherType = parseInt(value, 10);
  }

  public selectDiscount(_value: string) {
    this.setTypeDisCount = _value === '0';
    console.log(this.setTypeDisCount);
  }

  // ------- function option control table shop in modal -------
  /**
   * @method selectAllDomain
   * @description select all domain
   */
  public selectAllDomain(event: any) {
    // reset select all City + filter all
    this.resetWhenChangeDomain();
    this.checkBoxArea = !this.checkBoxArea;
    _.map(this.provinces, province => province['select'] = event.currentTarget.checked);
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
      this.provincesCityByModal = this.provincesCities;
      return;
    }
    // select city in list domain
    let provincesCity: ProvincesCity[] = [];
    this.provinces.forEach(provinceItem => {
      if (this.domainsSelect.indexOf(provinceItem.code) !== -1)
        provincesCity = _.concat(provincesCity, provinceItem.provinces);
    });
    // reset provincesCity select
    this.provincesCityByModal = provincesCity;
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

  // ======== FUNCTION CONTROL SETTING UPLOAD IMAGE ==============================================================
  /**
   * @method fileOverBaseUploadAvatar
   * @description file over in border upload avatar.
   * @param e
   */
  public fileOverBaseUploadAvatar(e: any): void {
    this.hasBaseDropZoneOverAvatar = e;
  }

  /**
   * @method changeUrlFileUploadAvatar
   * @description change url file upload for avatar
   * @returns {boolean}
   */
  public changeUrlFileUploadAvatar() {
    if (this.uploaderAvatar.queue[0].file.size > 102400) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Dung lượng ảnh <=100KB');
      this.uploaderAvatar.queue[0].remove();
      return;
    }
    let fileQueue = this.uploaderAvatar.queue;
    if (fileQueue.length > 1) {
      this.uploaderAvatar.queue[0].remove();
    }
    let self = this;
    let reader = new FileReader();
    reader['onload'] = function (e: any) {
      self.uploaderAvatar.queue[0].url = e.target.result;
      self.fileUploadAvatar = self.uploaderAvatar.queue[0]._file;
    };
    reader.readAsDataURL(fileQueue[0]._file);
  }

  /**
   * @method chooseFileUpdateAvatar
   * @description click to choose file to upload avatar
   */
  public chooseFileUpdateAvatar() {
    let eventClick = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(
      this.elInputFileAvatar.nativeElement, 'dispatchEvent', [eventClick]);
  }


  /**
   * @method fileOverBaseUploadImageDescriptions
   * @description file over in border upload image description.
   * @param e
   */
  public fileOverBaseUploadImageDescriptions(e: any): void {
    this.hasBaseDropZoneOverImageDescriptions = e;
  }

  /**
   * @method changeUrlFileUploadImageDescriptions
   * @description get url file upload list image description
   * @returns {boolean}
   */
  public changeUrlFileUploadImageDescriptions() {
    // validate image description
    for (let i = 0; i < this.uploaderImageDescriptions.queue.length; i++) {
      if (this.uploaderImageDescriptions.queue[i].file.size > 102400) {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Dung lượng ảnh <=100KB');
        this.uploaderImageDescriptions.queue = [];
        return;
      }
    }

    let fileQueueDescription = this.uploaderImageDescriptions.queue;
    this.fileUploadDescription = [];
    let self = this;
    for (let i = 0; i < fileQueueDescription.length; i++) {
      let reader = new FileReader();
      reader['onload'] = function (e: any) {
        self.uploaderImageDescriptions.queue[i].url = e.target.result;
        self.fileUploadDescription.push(self.uploaderImageDescriptions.queue[i]._file);
      };
      reader.readAsDataURL(fileQueueDescription[i]._file);
    }
  }

  /**
   * @method chooseFileUpdateImageDescriptions
   * @description click to choose file to upload image Description
   * @param event
   */
  public chooseFileUpdateImageDescriptions(event: any) {
    let eventClick = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(
      this.elInputFileImageDescriptions.nativeElement, 'dispatchEvent', [eventClick]);
  }

  /**
   * @method removeImg
   * @description remove item image
   * @param iImage
   * @todo thieu api
   */
  public removeImgDescription(iImage) {
    if (!this.voucher.imageDescriptions || !this.voucher.imageDescriptions[iImage]) {
      return;
    }
    this.voucher.imageDescriptions.splice(iImage, 1);
  }

  public saveVoucher() {
    if (this.textTitle === 'Tạo Voucher') {
      this.createVoucher();
    } else {
      this.updateVoucher();
    }
  }

  public changeDistantDiscount(_distantValue: string) {
    this.timeIsGiven = _distantValue === '2';
  }

  public validateInputCommon(): boolean {
    if (this.voucher.name.trim().length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Tên voucher không được phép để trống!');
      return;
    }
    if (this.voucher.description.trim().length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Mô tả không được phép để trống!');
      return;
    }
    // Neu chon thoi gian het han =>
    if (this.timeIsGiven === true) {
      if (this.voucher.expireDate === null || this.voucher.expireDate <= 0) {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Thời gian hết hạn không hợp lệ!');
        return false;
      }
    }
    if (this.lstStore.length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ít nhất 1 địa điểm áp dụng!');
      return false;
    }
    // validate kieu voucher
    if (this.voucher.voucherType === 1) { // voucher Tich
      if (this.voucher.maximumAccumulations <= 0) {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Số ô tích phải là số nguyên không âm');
        return false;
      }
      if (this.voucher.distance <= 0) {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Khoảng cách giữa 2 lần tích phải là số nguyên không âm');
        return false;
      }
    } else if (this.valueDiscount <= 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Giá trị giảm giá phải là số và lớn > 0');
      return false;
    }
    // validate category
    if (this.promotionTypesSelect.length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ít nhất một danh mục');
      return false;
    }
    // validate numberVoucher >= numberVoucherCustomer
    if (this.voucher.voucher_user_max > this.voucher.voucher_max) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Số voucher tối đa không được phép lớn hơn số voucher được tặng trong chương trình!');
      return false;
    }
    const patternNumber = /^\d*\d$/g;
    if (this.voucher.voucher_max < 0 || !patternNumber.test(this.voucher.voucher_max.toString())) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Số voucher tặng trong toàn chương trình phải là số nguyên không âm!');
      return false;
    }
    const patternNumber2 = /^\d*\d$/g;
    if (this.voucher.voucher_user_max < 0 || !patternNumber2.test(this.voucher.voucher_user_max.toString())) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Số Voucher tối đa 1 KH được tặng trong toàn chương trình phải là số nguyên không âm!');
      return false;
    }
    if (!this.voucher.timeStart || !this.voucher.timeStartView) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng không để trống các ô nhập thời gian!');
      return false;
    }
    return true;
  }

  /**
   * @method createVoucher
   * @description create new voucher
   */
  public createVoucher() {
    this.isLoadingVoucher = true;
    // common validate
    if (!this.validateInputCommon()) {
      this.isLoadingVoucher = false;
      return;
    }
    // validate file upload
    if (!this.fileUploadAvatar) {
      this.isLoadingVoucher = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ảnh đại diện!');
      return;
    }
    if (!this.fileUploadDescription) {
      this.isLoadingVoucher = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ảnh mô tả!');
      return;
    }
    // if (Trong thoi gian dien ra => expireData = 0) => expireDate = 0
    if (this.timeIsGiven === false)
      this.voucher.expireDate = 0;
    // push file upload
    let file = [];
    file.push({
      name: 'AnhDaiDien',
      files: [this.fileUploadAvatar]
    });
    file.push({
      name: 'AnhMoTa',
      files: this.fileUploadDescription
    });
    // value Hạn sử dụng voucher
    this.voucher.expireDate = this.timeIsGiven === true ? this.voucher.expireDate : 0;
    // set tag value
    let tagsParam = [];
    this.tags.forEach(tag => {
      tagsParam.push(tag.display);
    });
    // set discount value
    if (this.setTypeDisCount === true) { // Giam theo phan tram
      this.voucher.discountPercentage = this.valueDiscount;
    } else { // Giam theo gia tien
      this.voucher.priceDecreases = this.valueDiscount;
    }
    const bodyCustom = {
      promotionTypesSelect: this.promotionTypesSelect,
      tags: tagsParam,
      storeIds: this.lstStore
    };
    this._voucherService.createVoucher(this.voucher, bodyCustom, file)
      .subscribe((data) => {
        this.isLoadingVoucher = false;
        this._toasterService.pop('success', null, data.D);
        this.filterVoucher();
        this.voucherModal.hide();
      }, err => {
        this.isLoadingVoucher = false;
        this.funcError(err);
      });
  }

  /**
   * @method updateVoucher
   * @description update voucher information
   */
  public updateVoucher() {
    this.isLoadingVoucher = true;
    // common validate
    if (!this.validateInputCommon()) {
      this.isLoadingVoucher = false;
      return;
    }
    // if (Trong thoi gian dien ra => expireData = 0) => expireDate = 0
    if (this.timeIsGiven === false)
      this.voucher.expireDate = 0;
    // push file upload
    let file = [];
    if (this.fileUploadAvatar) {
      file.push({
        name: 'AnhDaiDien',
        files: [this.fileUploadAvatar]
      });
    }
    if (this.fileUploadDescription) {
      file.push({
        name: 'AnhMoTa',
        files: this.fileUploadDescription
      });
    }
    // value Hạn sử dụng voucher
    this.voucher.expireDate = this.timeIsGiven === true ? this.voucher.expireDate : 0;
    // set tag value
    let tagsParam = [];
    this.tags.forEach(tag => {
      tagsParam.push(tag.display);
    });
    // set discount value
    if (this.setTypeDisCount === true) { // Giam theo phan tram
      this.voucher.discountPercentage = this.valueDiscount;
    } else { // Giam theo gia tien
      this.voucher.priceDecreases = this.valueDiscount;
    }
    const bodyCustom = {
      promotionTypesSelect: this.promotionTypesSelect,
      tags: tagsParam,
      storeIds: this.lstStore
    };
    this._voucherService.updateVoucher(this.voucher, bodyCustom, file)
      .subscribe((data) => {
        this.isLoadingVoucher = false;
        this._toasterService.pop('success', null, data.D);
        this.filterVoucher(this.dataFilter.page);
        this.voucherModal.hide();
      }, err => {
        this.isLoadingVoucher = false;
        this.funcError(err);
      });
  }

  // ================ FUNCTION COMMON SUPPORT  ===================================================================
  /**
   * @method _initVoucherCreateEdit
   * @description init promotion to create and edit
   */
  private _initVoucherCreateEdit() {
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
      imageDescriptions: [{}],    // AnhMoTa -> LinkAnh
      stores: [{}],               // stores => CuaHangID
      voucher_max: 0,
      voucher_user_max: 0,
    };
    this.tags = [];
    this.lstStore = [];
    this.promotionTypesSelect = [];
    this.timeIsGiven = false;
    this.valueDiscount = 0;
    // reset image is null
    this.fileUploadAvatar = null;
    this.fileUploadDescription = null;
    this.uploaderImageDescriptions = new FileUploader({url: ''});
    this.uploaderAvatar = new FileUploader({url: ''});
  }

  private resetState() {
    this.allowButton = false;
    this._selectAllVoucher.nativeElement.checked = false;
  }

  /**
   * @method funcError
   * @description execute error function
   * @param err
   */
  funcError = (err) => {
    this._toasterService.clear();
    this._toasterService.pop('error', null, err.D || 'Lỗi không xác định!');
    if (err.status === 401) {
      Observable.timer(2000)
        .subscribe(() => {
          this._router.navigate(['login']);
        });
    }
  }
}
