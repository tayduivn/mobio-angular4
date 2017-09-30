/**
 * @author ManhNV
 * @supported DuyBV
 * @description manager promotions
 * @version 1.0.0
 */

import {Component, OnInit, ViewChild, HostListener, ElementRef, Renderer} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {FileUploader} from 'ng2-file-upload';

import {CategoryService} from '../../../common/service/common-service/category.service';
import {Category} from '../../../common/model/category.model';
import {PromotionService} from '../../../common/service/component-service/promotion.service';
import {Promotion, PromotionType} from './promotion.model';
import ckConfig from '../../../common/config/ck.config';
import {ProvincesService} from '../../../common/service/common-service/provinces.service';
import {ProvincesCity, Provinces} from '../../../common/model/provinces.model';
import {MobilePromotionComponent} from './mobile/mobile.component';
import {Paging} from '../../../common/model/paging';
import {Router} from '@angular/router';
import {ShopService} from '../../../common/service/component-service/shop.service';
import {Shop} from '../shop/shop.model';
import {ProductService} from '../../../common/service/component-service/product.service';
import {Product} from '../product/product.model';

@Component({
  selector: 'promotion-component',
  templateUrl: './promotion.component.html',
  styleUrls: ['../product/product-styles/modal.component.scss',
    '../product/product-styles/product.component.scss',
    './promotion.component.scss'
  ]
})

export class PromotionComponent implements OnInit {
  // declare native element
  @ViewChild('fileUrl') fileUrl: ElementRef;
  @ViewChild('outImg') outImg: ElementRef;
  @ViewChild('fileUrlAvatar') fileUrlAvatar: ElementRef;
  @ViewChild('outImgAvatar') outImgAvatar: ElementRef;
  @ViewChild('elModalDescription') elModalDescription: ElementRef;
  @ViewChild('elPromotionName') elPromotionName: ElementRef;
  @ViewChild('elImageDescription') elImageDescription: ElementRef;
  @ViewChild('elModalPromotionBody') elModalPromotionBody: ElementRef;
  @ViewChild('_selectAllPromotion') _selectAllPromotion: ElementRef;
  // filter native element state
  @ViewChild('showStateItem') showStateItem: ElementRef;
  @ViewChild('hideStateItem') hideStateItem: ElementRef;
  // filter native element effect
  @ViewChild('acceptEffect') acceptEffect: ElementRef;
  @ViewChild('rejectEffect') rejectEffect: ElementRef;

  @ViewChild(MobilePromotionComponent) elMobilePromotion: MobilePromotionComponent;
  @ViewChild('promotionModal') public promotionModal: ModalDirective;
  // Hot listener event
  @HostListener('scroll', ['$event'])

  // common variable ------------------------------------------------------------------------------
  public promotions: Promotion[];
  public promotion: Promotion;
  public categories: Category[];
  public tags = [];
  public setTop: number;
  public isLoadingPromotion: boolean = false;
  public promotionTypesModal: PromotionType[];
  public valueDiscount: number = 0; // Phan tram hoac gia tien

  // data filter promotion  -----------------------------------------------------------------------
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
  // --- sort filter
  public filterTypeTimeStart: boolean = true;
  public filterTypeTimeEnd: boolean = true;
  public setIconTimeStart: number = 0;
  public setIconTimeEnd: number = 0;

  // variable support filter shop in modal create promotion ---------------------------------------
  public provincesCities: ProvincesCity[];
  public provinces: Provinces[];
  public promotionTypes: PromotionType[];
  public shops: Shop[];
  public checkAllShop: boolean = false;
  public promotionTypesSelect = [];
  // variable data filter table in modal shop -----------------------------------------------------
  public dataFilterShop = {
    page: -1,
    MaTinhThanh: '',
  };
  public domainsSelect: string[] = [];
  public provincesCityByModal: ProvincesCity[] = [];
  public valueAddressSearch: string = '';
  public lstStore: string[] = [];


  // manager state common--------------------------------------------------------------------------
  public allowButton: boolean = false;
  public setHideSelectCity: boolean = true;
  public setHideSelectArea: boolean = true;
  public setHideSelectOutClick: boolean = true;
  public checkBoxArea: boolean = false;
  public checkBoxCity: boolean = false;
  public checkAllCity: boolean = false;
  public textTitle: string = 'Tạo ưu đãi';
  public keySearch: string = '';
  public setTypeDisCount: boolean = true; // percent or price

  // variable using popup create promotions -------------------------------------------------------
  public paymentPoint: number = 0;
  public images: any = [];
  public item = [{value: 0, display: 'Mỹ Phẩm'}];
  public config = { // ckeditor config
    uiColor: '#F0F3F4',
    height: '300',
    toolbar: ckConfig.toolbar,
    toolbarGroups: ckConfig.toolbarGroups,
    resize_enabled: false,
    removePlugins: "elementspath"
  };

  // variable using popup create promotions -------------------------------------------------------
  // ---- sub variable control upload image
  public fileUploadAvatar: File = null;
  public uploaderAvatar: FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOverAvatar: boolean = false;
  @ViewChild('elInputFileAvatar') elInputFileAvatar: ElementRef;

  public fileUploadDescription: File[] = [];
  public uploaderImageDescriptions: FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOverImageDescriptions: boolean = false;
  @ViewChild('elInputFileImageDescriptions') elInputFileImageDescriptions: ElementRef;

  // ------- config ranger-date picker ------------------------------------------------------------
  // config datetime  StartDisplay
  public optionsStartEventDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY'
  };
  public optionsEndEventDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY'
  };
  public optionsStartDisplayDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY'
  };
  public optionsEndDisplayDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY'
  };

  // ------ config module angular- multiple select -----------------------------
  public dropDownListProduct = [];
  public selectedProduct = [];
  public dropDownSettings = {};

  constructor(private _toasterService: ToasterService,
              private _categoryService: CategoryService,
              private _promotionService: PromotionService,
              private _provincesService: ProvincesService,
              private _productService: ProductService,
              private _router: Router,
              private _shopService: ShopService,
              private renderer: Renderer) {
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
    this.dropDownSettings = {
      singleSelection: true,
      text: 'Chọn sản phẩm ưu đãi',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }

  ngOnInit() {
    this.commonInit();
    this.filterShop();
    this.filterPromotion();
  }

  // =========================== FUNCTION INIT PAGE ================================================================
  /**
   * @method commonInit
   * @description init common get data
   */
  private commonInit() {
    this._initPromotionCreateEdit();
    this._categoryService.getCategories()
      .subscribe(dataCategories => {
        this.categories = dataCategories;
      }, err => {
        console.log(err);
      });
    this._provincesService.getProvincesCity()
      .subscribe(cities => {
        this.provincesCities = cities;
        _.map(this.provincesCities, provincesCity => provincesCity['select'] = false);
      }, err => {
        console.log(err);
      });
    this._provincesService.getProvinces()
      .subscribe(provincesData => {
        this.provinces = provincesData;
        _.map(this.provinces, province => province['select'] = false);
      });
    this._promotionService.getPromotionTypes()
      .subscribe(dataPromotionType => {
        this.promotionTypes = dataPromotionType;
      });
    this._productService.getProducts({page: -1, TrangThai: 1})
      .subscribe(dataProducts => {
        let products: Product[] = dataProducts.products.length === 0 ? [] : dataProducts.products.map(ProductService.toProduct);
        this.dropDownListProduct = products.map(product => {
          return {
            id: product.idProduct,
            price: product.price,
            itemName: product.name
          }
        });
      });
  }

  /**
   * @function filterVoucher
   * @description support filter voucher
   * @private
   */
  private filterPromotion(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._promotionService.getPromotions(this.dataFilter)
      .subscribe(data => {
        // set data and add temp field select
        this.promotions = data.promotions.length === 0 ? [] : data.promotions.map(PromotionService.toPromotion);
        _.map(this.promotions, promotion => promotion.select = false);
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
    this.filterPromotion(_pageSelected);
  }

  public changePerPage(_perPage: number) {
    this.resetState();
    this.dataFilter.per_page = _perPage;
    this.filterPromotion();
  }

  // =========================== FUNCTION FILTER PAGE =================================================================
  // ----- sub filter state --------------------------------------------
  public filterStateShow() {
    // set disable allowButton + select all promotion
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
    this.filterPromotion();
  }

  /**
   * @method filterStateHide
   * @description filter by state product equal hide (2)
   */
  public filterStateHide() {
    // set disable allowButton + select all promotion
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
    this.filterPromotion();
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
    this.filterPromotion();
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
    this.filterPromotion();
  }

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
    this.filterPromotion();
  }

  // ------- sub filter sorting timeStart and timeEnd
  public sortTimeStart() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconTimeEnd = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'ThoiDiemBatDauKhuyenMai';
    this.filterTypeTimeStart = !this.filterTypeTimeStart;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeTimeStart ? 'desc' : 'asc';
    this.setIconTimeStart = !this.filterTypeTimeStart ? 2 : 1;
    this.filterPromotion(this.dataFilter.page);
  }

  public sortTimeEnd() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconTimeStart = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'ThoiDiemKetThucKhuyenMai';
    this.filterTypeTimeEnd = !this.filterTypeTimeEnd;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeTimeEnd ? 'desc' : 'asc';
    this.setIconTimeEnd = !this.filterTypeTimeEnd ? 2 : 1;
    this.filterPromotion(this.dataFilter.page);
  }

  // =========================== FUNCTION BAR MANAGER ===============================================================
  public searchPromotion() {
    this.dataFilter.ChuoiTimKiem = this.keySearch.trim();
    if (!this.keySearch) {
      this.dataFilter.ChuoiTimKiem = '';
    }
    this.filterPromotion();
  }

  // =========================== FUNCTION SHOW - HIDE MODAL PROMOTION ===============================================
  /**
   * @method removePromotionSelect
   * @description delete selected promotion
   */
  public removePromotionSelect() {
    if (!confirm('Bạn có muốn xóa các ưu đãi đã chọn!'))
      return;
    let idPromotion: string = 'ids=';
    this.promotions.forEach(promotion => {
      if (promotion['select'] === true) {
        idPromotion += `${promotion.idPromotion},`;
      }
    });
    idPromotion = idPromotion.slice(0, idPromotion.length - 1);
    this._promotionService.deleteMultiplePromotion(idPromotion)
      .subscribe(data => {
        this.resetState();
        this.filterPromotion();
        this._toasterService.pop('success', null, data.D);
      }, this.funcError);
  }

  /**
   * @method switchStatePromotion
   * @description toggles the display state of selected promotion to hide
   */
  public switchStatePromotion(state: number) {
    let idPromotions = [];
    this.promotions.forEach(promotion => {
      if (promotion['select'] === true) {
        idPromotions.push(promotion.idPromotion);
      }
    });
    const body = {
      promotions: idPromotions,
      TrangThai: state
    };
    this._promotionService.changeStateShowPromotion(body)
      .subscribe(data => {
        this.resetState();
        this.filterPromotion(this.dataFilter.page);
        this._toasterService.pop('success', null, `${data.D}`);
      }, this.funcError);
  }

  /**
   * @method showModalPromotion
   * @description on click show modal create or edit createVoucher
   * @param event
   */
  public showModalPromotion(event) {
    this.promotionModal.show();
    if (event === 1) {
      this.textTitle = 'Tạo Ưu Đãi';
    } else {
      this.textTitle = 'Sửa Ưu Đãi';
    }
  }

  public showCreatePromotion() {
    this._initPromotionCreateEdit();
    this.promotion.imageDescriptions = null;
    // reset selected promotionType (<=> category)
    this.promotionTypesModal = _.cloneDeep(this.promotionTypes);
    // reset selected category by promotion
    _.map(this.promotionTypesModal, promotionType => promotionType['select'] = false);
    // reset shop selected
    _.map(this.shops, shop => shop['select'] = false);
    this.showModalPromotion(1);
  }

  /**
   * @method showEditPromotion
   * @description edit promotion detail
   * @param _idPromotion
   * @param _state
   * @deprecated change state param is state get from back-end
   */
  public showEditPromotion(_idPromotion: string, _state: number) {
    this._initPromotionCreateEdit();
    // reset selected shop -------
    for (let i = 0; i < this.shops.length; i++) {
      this.shops[i]['select'] = false;
    }
    // get detail voucher
    this._promotionService.getPromotionDetail(_idPromotion)
      .subscribe(dataPromotion => {
        this.promotion = dataPromotion;
        // set selected promotionType (<=> category) and push promotionType value is choice
        this.promotionTypesModal = _.cloneDeep(this.promotionTypes);
        if (!_.isNil(this.promotion.idCategory)) {
          for (let i = 0; i < this.promotionTypesModal.length; i++) {
            this.promotionTypesModal[i]['select'] = this.promotion.idCategory
              .indexOf(this.promotionTypesModal[i].code) !== -1;
            if (this.promotion.idCategory.indexOf(this.promotionTypesModal[i].code) !== -1) {
              this.promotionTypesSelect.push(this.promotionTypesModal[i].code);
            }
          }
        }
        // set selected shop edit + push shop select in lstShop (lstStore) ---------------------
        let lstStoreTemp = dataPromotion.stores || [];
        for (let i = 0; i < lstStoreTemp.length; i++) {
          this.lstStore.push(lstStoreTemp[i].idShop);
          const shopItemSelect = _.find(this.shops, shop => shop.idShop === lstStoreTemp[i].idShop);
          if (shopItemSelect) shopItemSelect.select = true;
        }
        // set list tag input
        for (let i = 0; i < this.promotion.tags.length; i++) {
          this.tags.push({value: i, display: this.promotion.tags[i].tag});
        }
        // set state from server
        this.promotion.state = _state;
        // set value PhanTramGiam || GiaTienGiam
        this.valueDiscount = this.promotion.discountPercentage > 0
          ? this.promotion.discountPercentage : this.promotion.priceDecrease;
        // show product select, set value discount + trigger 'Số điềm thanh toán'
        const productSelected = _.find(this.dropDownListProduct, product => product.id === dataPromotion.idProduct);
        if (!_.isNil(productSelected)) {
          this.selectedProduct.push(productSelected);
          this.discountTemp = productSelected['price'];
          if (this.promotion.typeDiscount === 1) { // typeDisCount is percent
            this.paymentPoint = Math.round((this.discountTemp * (this.valueDiscount / 100)) / 1000);
          } else {
            this.paymentPoint = Math.round(this.valueDiscount / 1000);
          }
        }
        this.showModalPromotion(2); // show modal
      });
  }

  // =========================== FUNCTION ACTION CLICK IN TABLE =============================================
  /**
   * @method selectPromotions
   * @description select all promotions
   * @param event
   */
  public selectPromotions(event: any) {
    if (event.currentTarget.checked) {
      this.allowButton = true;
      this.promotions.map(promotion => promotion['select'] = true);
    } else {
      this.allowButton = false;
      this.promotions.map(promotion => promotion['select'] = false);
    }
  }

  /**
   * @method selectPromotion
   * @description select single promotion
   * @param event
   * @param _idPromotion
   */
  public selectPromotion(event, _idPromotion) {
    if (event.currentTarget.checked === true) {
      this.allowButton = true;
    } else {
      this._selectAllPromotion.nativeElement.checked = false;
    }
    let promotionSelect = _.find(this.promotions, promotion => promotion.idPromotion === _idPromotion);
    promotionSelect.select = event.currentTarget.checked;
    const findSelect = _.findIndex(this.promotions, promotion => promotion.select === true);
    this.allowButton = findSelect !== -1;
  }

  /**
   * @method hideState
   * @description change state show in promotion
   * @param _idPromotion
   * @param _state
   */
  public switchSingleState(_idPromotion: string, _state: number) {
    let idPromotion = [_idPromotion];
    _state = _state === 1 ? 2 : 1;
    const body = {
      promotions: idPromotion,
      TrangThai: _state
    };

    this._promotionService.changeStateShowPromotion(body)
      .subscribe(data => {
        this.resetState();
        this.filterPromotion(this.dataFilter.page);
        this._toasterService.pop('success', null, `${data.D}`);
      }, this.funcError)
  }

  /**
   * @method removePromotion
   * @description removePromotion
   * @param _namePromotion
   * @param _idPromotion
   */
  public removePromotion(_namePromotion: string, _idPromotion: string) {
    if (!confirm(`Bạn có muốn xóa ưu đãi: "${_namePromotion.toUpperCase()}" ?`))
      return;
    let idPromotion: string = `ids=${_idPromotion}`;
    this._promotionService.deleteMultiplePromotion(idPromotion)
      .subscribe(data => {
        this.filterPromotion();
        this._toasterService.pop('success', null, data.D);
      }, this.funcError);
  }

  // ======================= FUNCTION POPUP MODEL CREATE PROMOTION =====================================
  // ------------- view and hide select adn filter city- shop
  /**
   * @method setViewCity
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

  // ----------------- function discount money ---------------------------------------------------------
  // ----- function type promotion -------------------------------
  public changeTypePromotion(_typePromotion: string) {
    this.promotion.typePromotion = parseInt(_typePromotion, 10);
    if (this.promotion.typePromotion === 1) { // if type = UuDaiChung (<=> value = 1)  ==> reset id Product
      this.promotion.idProduct = '';
      // reset value GiamGia and SoDiemThanhToan
      this.valueDiscount = 0;
      this.paymentPoint = 0
    }
  }

  public discountTemp: number = 0;

  public onProductSelect(_product: any) {
    // console.log(this.selectedProduct);
    this.discountTemp = _product['price'];
    console.log(this.discountTemp);
    if (this.setTypeDisCount) { // typeDisCount is percent
      this.paymentPoint = Math.round((this.discountTemp / 1000) - ((this.discountTemp * (this.valueDiscount / 100)) / 1000));
    } else {
      this.paymentPoint = Math.round(this.valueDiscount / 1000);
    }
  }

  public onProductDeSelect() {
    this.discountTemp = 0;  // set default discountTemp is zero
    this.valueDiscount = 0; // if not select product <=> discount = 0
    this.paymentPoint = 0;
  }

  public changeValueDiscount() {
    if (this.selectedProduct.length === 0 && this.promotion.typePromotion === 2) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'chọn sản phậm tạo ưu đãi trước khi thực thi tác vụ này!');
      this.valueDiscount = 0;
      return;
    }
    if (this.setTypeDisCount) { // typeDisCount is percent
      this.paymentPoint = Math.round((this.discountTemp * (this.valueDiscount / 100)) / 1000);
    } else {
      this.paymentPoint = Math.round(this.valueDiscount / 1000);
    }
  }

  /**
   * @method selectDiscount
   * @description config type discount when select is '%' or 'price'
   * @param _typeDiscount
   */
  public selectDiscount(_typeDiscount: string) {
    this.setTypeDisCount = _typeDiscount === '1'; // percent, 1 is price
    // reset value discount = 0 and reset paymentPoint
    this.valueDiscount = 0;
    this.paymentPoint = 0;
    // set typeDiscount
    this.promotion.typeDiscount = parseInt(_typeDiscount, 10);
  }

  // ----------------- function execute upload file -----------------------------------------------------
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
      this._toasterService.pop('error', null, 'Kích thước ảnh không hợp lệ');
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
        this._toasterService.pop('error', null, 'Kích thước ảnh không hợp lệ');
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
   */
  public chooseFileUpdateImageDescriptions() {
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
    if (!this.promotion.imageDescriptions || !this.promotion.imageDescriptions[iImage]) {
      return;
    }
    this.promotion.imageDescriptions.splice(iImage, 1);
  }

  // ------ function execute datetime --------------------------------------------------------------------

  /**
   * @method onScrollPromotionModal
   * @description Listener event scroll promotion modal
   */
  public onScrollPromotionModal() {
    let descriptionTop = this.elModalDescription.nativeElement.offsetTop;
    let promotionNameTop = this.elPromotionName.nativeElement.offsetTop;
    let promotionImageDescription = this.elImageDescription.nativeElement.offsetTop;
    let modalBodyTop = this.elModalPromotionBody.nativeElement.scrollTop;
    if (descriptionTop > modalBodyTop - 50 && descriptionTop < modalBodyTop + 50) {
      this.setTop = this.elMobilePromotion.elMobileEntry.nativeElement.offsetTop;
    }
    if (promotionNameTop > modalBodyTop - 20 && promotionNameTop < modalBodyTop + 20) {
      this.setTop = this.elMobilePromotion.elMobileName.nativeElement.offsetTop;
    }
    if (promotionImageDescription > modalBodyTop - 30 && promotionImageDescription < modalBodyTop + 30) {
      this.setTop = this.elMobilePromotion.elMobileName.nativeElement.offsetTop;
    }
  }

  // ------- function option control filter- city, domain shop in modal ----------------------------------
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

  // ----- function modify state -----------------------------------------------
  public switchState(event: any) {
    this.promotion.state = event.currentTarget.checked ? 1 : 2;
  }

  // ------- function interage api create and update promotion -----------------
  public savePromotion() {
    if (this.textTitle === 'Tạo Ưu Đãi') {
      this.createPromotion();
    } else {
      this.updatePromotion();
    }
  }

  /**
   * @method createPromotion
   * @description create new promotion
   */
  public createPromotion() {
    this.isLoadingPromotion = true;
    // common validate
    if (!this.validateInputCommon()) return;
    // validate file upload
    if (!this.fileUploadAvatar) {
      this.isLoadingPromotion = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ảnh đại diện!');
      return;
    }
    if (!this.fileUploadDescription) {
      this.isLoadingPromotion = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ảnh mô tả!');
      return;
    }
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
    // set tag value
    let tagsParam = [];
    this.tags.forEach(tag => {
      tagsParam.push(tag.display);
    });
    // set discount value
    if (this.setTypeDisCount === true) { // Giam theo phan tram
      if (this.valueDiscount <= 0 || this.valueDiscount > 100) {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Phần trăm giảm giá không hợp lệ');
        this.isLoadingPromotion = false;
        return;
      }
      this.promotion.discountPercentage = this.valueDiscount;
    } else { // Giam theo gia tien
      if (this.valueDiscount <= 0 || this.valueDiscount > this.discountTemp) {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Số tiền giảm giá phải lớn hơn 0 và nhỏ hơn giá sản phẩm!');
        this.isLoadingPromotion = false;
        return;
      }
      this.promotion.priceDecrease = this.valueDiscount;
    }
    const bodyCustom = {
      promotionTypesSelect: this.promotionTypesSelect,
      tags: tagsParam,
      storeIds: this.lstStore
    };
    if (this.promotion.typePromotion === 2)
      this.promotion.idProduct = this.selectedProduct[0]['id'];
    this._promotionService.createPromotion(this.promotion, bodyCustom, file)
      .subscribe((data) => {
        this.isLoadingPromotion = false;
        this._toasterService.pop('success', null, data.D);
        this.filterPromotion();
        this.promotionModal.hide();
      }, err => {
        this.isLoadingPromotion = false;
        this.funcError(err);
      });
  }

  /**
   * @method updatePromotion
   * @description update promotion information
   */
  public updatePromotion() {
    this.isLoadingPromotion = true;
    // common validate
    if (!this.validateInputCommon()) return;
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
    // set tag value
    let tagsParam = [];
    this.tags.forEach(tag => {
      tagsParam.push(tag.display);
    });
    // set discount value
    // set discount value
    if (this.setTypeDisCount === true) { // Giam theo phan tram
      if (this.valueDiscount <= 0 || this.valueDiscount > 100) {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Phần trăm giảm giá không hợp lệ');
        this.isLoadingPromotion = false;
        return;
      }
      this.promotion.discountPercentage = this.valueDiscount;
    } else { // Giam theo gia tien
      if (this.valueDiscount <= 0) {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Số tiền giảm giá phải lớn hơn 0');
        this.isLoadingPromotion = false;
        return;
      }
      this.promotion.priceDecrease = this.valueDiscount;
    }
    const bodyCustom = {
      promotionTypesSelect: this.promotionTypesSelect,
      tags: tagsParam,
      storeIds: this.lstStore
    };
    if (this.promotion.typePromotion === 2)
      this.promotion.idProduct = this.selectedProduct[0]['id'];
    this._promotionService.updatePromotion(this.promotion, bodyCustom, file)
      .subscribe((data) => {
        this.isLoadingPromotion = false;
        this._toasterService.pop('success', null, data.D);
        this.filterPromotion(this.dataFilter.page);
        this.promotionModal.hide();
      }, err => {
        this.isLoadingPromotion = false;
        this.funcError(err);
      });
  }

  /**
   * @method validateInputCommon
   * @description validate input date common
   * @returns {boolean}
   */
  public validateInputCommon(): boolean {
    // Neu chon thoi gian het han =>
    if (this.promotion.namePromotion.trim().length === 0) {
      this.isLoadingPromotion = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Tên khuyến mãi không được phép để chống!');
      return;
    }
    if (this.promotion.description.trim().length === 0) {
      this.isLoadingPromotion = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Mô tả không được phép để chống!');
      return;
    }
    if (this.lstStore.length === 0) {
      this.isLoadingPromotion = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ít nhất 1 địa điểm áp dụng!');
      return false;
    }
    // validate category
    if (this.promotionTypesSelect.length === 0) {
      this.isLoadingPromotion = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ít nhất một danh mục');
      return false;
    }
    // validate product selected (validate when typePromotion is 2)
    if (this.promotion.typePromotion === 2 && this.selectedProduct.length === 0) {
      this.isLoadingPromotion = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn một sản phẩm ưu đãi!');
      return false;
    }
    if (!this.promotion.timeStartPromotion || !this.promotion.timeStartDisplay) {
      this.isLoadingPromotion = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng không để trống các ô nhập thời gian!');
      return false;
    }
    if (this.promotion.number_seconds_code_valid <= 0 || this.promotion.number_seconds_between_twice_get_code <= 0) {
      this.isLoadingPromotion = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Thời gian hiệu lực mã giao dịch và thời gian giữa các lần lẫy mã phải > 0');
      return false;
    }
    return true;
  }

  // ================ Support function ====================================================================
  /**
   * @method _initPromotionCreateEdit
   * @description init promotion to create and edit
   */
  private _initPromotionCreateEdit() {
    this.promotion = {
      idPromotion: '',              // KhuyenMaiID
      idCategory: '',               // MaDanhMuc
      code_active_max: 0,           // Số mã giao dich được xác thực trong toàn chương trình
      code_active_max_per_day: 0,   // Số mã giao dịch được xác thực trong ngày
      code_user_active_max: 0,      // Số mã giao dich tối đa 1KH được xác thực trong toàn trương trình
      code_user_get_max_per_day: 0, // Số mã giao dịch tối đa 1 khách được lấy trong ngày
      code_user_get_max: 0,         // Số mã giao dich tôi đa 1 KH được lấy trong toàn chương trình
      description: '',              // MoTaChiTiet
      timeStartDisplay: '',      // ThoiDiemBatDauHienThi
      timeEndDisplay: new Date(),        // ThoiDiemKetThucHienThi
      timeStartPromotion: new Date(),    // ThoiDiemBatDauKhuyenMai
      timeEndPromotion: '',      // ThoiDiemKetThucKhuyenMai
      number_seconds_code_valid: 0,
      imageDescriptions: [{}],      // AnhMoTa -> LinkAnh
      tags: [{}],                   // tags
      avatar: '',                   // AnhDaiDien
      idProduct: '',                // SanPhamID
      typePromotion: 1,             // KieuKhuyenMai
      typeDiscount: 1,              // KieuGiamGia
      namePromotion: '',            // TenKhuyenMai
      nameProduct: '',              // TenSanPham
      number_seconds_between_twice_get_code: 0,
      priceDecrease: 0,             // GiaTienGiam
      discountPercentage: 0,        // PhanTramGiamGia
      stores: [{}],                 // stores => CuaHangID
      state: 1
    };
    this.tags = [];
    this.lstStore = [];
    this.promotionTypesSelect = [];
    // reset image is null
    this.fileUploadAvatar = null;
    this.fileUploadDescription = null;
    this.uploaderImageDescriptions = new FileUploader({url: ''});
    this.uploaderAvatar = new FileUploader({url: ''});
    // reset discount
    this.discountTemp = 0;
    this.paymentPoint = 0;
    this.valueDiscount = 0;
    // reset product select
    this.selectedProduct = [];
    // reset loading
    this.isLoadingPromotion = false;
    // reset type discount
    this.setTypeDisCount = true;
    // reset search shop address
    this.valueAddressSearch = '';
  }

  private resetState() {
    this.allowButton = false;
    this._selectAllPromotion.nativeElement.checked = false;
  }

  funcError = (err) => {
    this._toasterService.clear();
    this._toasterService.pop('error', null, err.D);
    if (err.status === 401) {
      Observable.timer(2000)
        .subscribe(() => {
          return this._router['navigate'](['login']);
        });
    }
  };
}
