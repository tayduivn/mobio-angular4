/**
 * @author ManhNV, Duy
 * @description manager FootTraffic
 * @version 1.0.0
 * @todo datepicker
 */

import {Component, ElementRef, HostListener, OnInit, ViewChild, Renderer} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {FootTrafficService} from '../../../common/service/component-service/foot-traffic.service';
import {FootTraffic} from './foot-traffic.model';
import ckConfig from '../../../common/config/ck.config';
import {ProvincesService} from '../../../common/service/common-service/provinces.service';
import {Provinces, ProvincesCity} from '../../../common/model/provinces.model';
import {Paging} from '../../../common/model/paging';
import {Router} from '@angular/router';
import {ShopService} from '../../../common/service/component-service/shop.service';
import {Shop} from '../shop/shop.model';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {PromotionType} from '../promotion/promotion.model';
import {Category} from '../../../common/model/category.model';
import {Product} from '../product/product.model';
import {ProductService} from '../../../common/service/component-service/product.service';
import {CategoryService} from '../../../common/service/common-service/category.service';
import {PromotionService} from '../../../common/service/component-service/promotion.service';
import {MobileFootTrafficComponent} from './mobile/mobile.component';

@Component({
  selector: 'foot-traffic-component',
  templateUrl: './foot-traffic.component.html',
  styleUrls: ['./foot-traffic.component.scss',
    '../product/product-styles/product.component.scss',
    '../product/product-styles/modal.component.scss',
    '../promotion/promotion.component.scss',
    '../product/mobile/karaoke/mobile-karaoke.component.scss'
  ]
})

export class FootTrafficComponent implements OnInit {
  // declare native element
  @ViewChild('fileUrl') fileUrl: ElementRef;
  @ViewChild('outImg') outImg: ElementRef;
  @ViewChild('fileUrlAvatar') fileUrlAvatar: ElementRef;
  @ViewChild('outImgAvatar') outImgAvatar: ElementRef;
  @ViewChild('elModalDescription') elModalDescription: ElementRef;
  @ViewChild('elFootTrafficName') elFootTrafficName: ElementRef;
  @ViewChild('elImageDescription') elImageDescription: ElementRef;
  @ViewChild('elModalFootTrafficBody') elModalFootTrafficBody: ElementRef;
  @ViewChild('_selectAllFootTraffic') _selectAllFootTraffic: ElementRef;
  // filter native element state
  @ViewChild('showStateItem') showStateItem: ElementRef;
  @ViewChild('hideStateItem') hideStateItem: ElementRef;
  // filter native element effect
  @ViewChild('acceptEffect') acceptEffect: ElementRef;
  @ViewChild('rejectEffect') rejectEffect: ElementRef;

  @ViewChild(MobileFootTrafficComponent) elMobileFootTraffic: MobileFootTrafficComponent;
  @ViewChild('footTrafficModal') public footTrafficModal: ModalDirective;
  // Hot listener event
  @HostListener('scroll', ['$event'])

  // common variable ------------------------------------------------------------------------------
  public footTraffics: FootTraffic[];
  public footTraffic: FootTraffic;
  public categories: Category[];
  public tags = [];
  public setTop: number;
  public isLoadingFootTraffic: boolean = false;
  public promotionTypesModal: PromotionType[];
  public valuePointOrView: number = 0; // Phan tram hoac gia tien (totalPointsAwarded || totalNumberVisit)

  // data filter promotion  -----------------------------------------------------------------------
  public dataFilter = {
    TrangThai: '',        // 1:Visible, 2:Invisible
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
  public filterNameProgram: boolean = true;
  public setIconTimeStart: number = 0;
  public setIconTimeEnd: number = 0;
  public setIconNameProgram: number = 0;

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

  // variable using popup create foot-traffic -----------------------------------------------------
  public paymentPoint: number = 0;
  public images: any = [];
  public item = [{value: 0, display: 'Mỹ Phẩm'}];
  public config = { // ckeditor config
    uiColor: '#F0F3F4',
    height: '300',
    toolbar: ckConfig.toolbar,
    toolbarGroups: ckConfig.toolbarGroups,
  };

  // variable using popup create foot-traffics -------------------------------------------------------
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
  public dateTimeEventStart: any = new Date();
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
              private _footTrafficService: FootTrafficService,
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
    this.filterFootTraffic();
  }

  // =========================== FUNCTION INIT PAGE ================================================================
  /**
   * @method commonInit
   * @description init common get data
   */
  private commonInit() {
    this._initFootTrafficCreateEdit();
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
    this._productService.getProducts({page: -1})
      .subscribe(dataProducts => {
        let products: Product[] = dataProducts.products.length === 0
          ? [] : dataProducts.products.map(ProductService.toProduct);
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
   * @function filterFootTraffic
   * @description support filter foot-traffic
   * @private
   */
  private filterFootTraffic(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._footTrafficService.getFootTraffics(this.dataFilter)
      .subscribe(data => {
        // set data and add temp field select
        this.footTraffics = data['foot-traffic'].length === 0
          ? [] : data['foot-traffic'].map(FootTrafficService.toFootTraffic);
        _.map(this.footTraffics, footTraffic => footTraffic.select = false);
        this.paging = data['paging'];
        this.paging.page = _setPage;
        if (data['paging']) {
          this.paging = data['paging'];
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
    this.filterFootTraffic(_pageSelected);
  }

  public changePerPage(_perPage: number) {
    this.resetState();
    this.dataFilter.per_page = _perPage;
    this.filterFootTraffic();
  }

  // =========================== FUNCTION FILTER PAGE =======================================
  // ----- sub filter state --------------------------------------------
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
    this.filterFootTraffic();
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
    this.filterFootTraffic();
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
    this.filterFootTraffic();
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
    this.filterFootTraffic();
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
    this.filterFootTraffic();
  }

  // ------- sub filter sorting timeStart and timeEnd
  public sortNameProgram() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconTimeStart = 0;
    this.setIconTimeEnd = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'TenChuongTrinh';
    this.filterNameProgram = !this.filterNameProgram;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterNameProgram ? 'desc' : 'asc';
    this.setIconNameProgram = !this.filterNameProgram ? 2 : 1;
    this.filterFootTraffic(this.dataFilter.page);
  }

  public sortTimeStart() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconTimeStart = 0;
    this.setIconTimeEnd = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'ThoiGianBatDau';
    this.filterTypeTimeStart = !this.filterTypeTimeStart;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeTimeStart ? 'desc' : 'asc';
    this.setIconTimeStart = !this.filterTypeTimeStart ? 2 : 1;
    this.filterFootTraffic(this.dataFilter.page);
  }

  public sortTimeEnd() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconTimeStart = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'ThoiGianKetThuc';
    this.filterTypeTimeEnd = !this.filterTypeTimeEnd;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeTimeEnd ? 'desc' : 'asc';
    this.setIconTimeEnd = !this.filterTypeTimeEnd ? 2 : 1;
    this.filterFootTraffic(this.dataFilter.page);
  }

  // =========================== FUNCTION BAR MANAGER ================================
  public searchFootTraffic() {
    this.dataFilter.ChuoiTimKiem = this.keySearch;
    if (!this.keySearch) {
      this.dataFilter.ChuoiTimKiem = '';
    }
    this.filterFootTraffic();
  }

  // =========================== FUNCTION SHOW - HIDE MODAL FOOT-TRAFFIC =============
  /**
   * @method removeFootTrafficSelect
   * @description delete selected foot-traffic
   */
  public removeFootTrafficSelect() {
    if (!confirm('Bạn có muốn xóa các foot-traffic đã chọn!'))
      return;
    let idFootTraffic: string = 'ids=';
    this.footTraffics.forEach(footTraffic => {
      if (footTraffic['select'] === true) {
        idFootTraffic += `${footTraffic.idFootTraffic},`;
      }
    });
    idFootTraffic = idFootTraffic.slice(0, idFootTraffic.length - 1);
    this._footTrafficService.deleteMultipleFootTraffic(idFootTraffic)
      .subscribe(data => {
        this.resetState();
        this.filterFootTraffic();
        this._toasterService.pop('success', null, data.D);
      }, this.funcError);
  }

  /**
   * @method switchStateFootTraffic
   * @description toggles the display state of selected foot-traffic to hide
   */
  public switchStateFootTraffic(state: number) {
    let idFootTraffic = [];
    this.footTraffics.forEach(footTraffic => {
      if (footTraffic['select'] === true) {
        idFootTraffic.push(footTraffic.idFootTraffic);
      }
    });
    const body = {
      'foot-traffic': idFootTraffic,
      TrangThai: state
    };
    this._footTrafficService.changeStateShowFootTraffic(body)
      .subscribe(data => {
        this.resetState();
        this.filterFootTraffic(this.dataFilter.page);
        this._toasterService.pop('success', null, `${data.D}`);
      }, this.funcError);
  }

  /**
   * @method showModalFootTraffic
   * @description on click show modal create or edit createVoucher
   * @param event
   */
  public showModalFootTraffic(event) {
    this.footTrafficModal.show();
    if (event === 1) {
      this.textTitle = 'Tạo Foot-Traffic';
    } else {
      this.textTitle = 'Sửa Foot-Traffic';
    }
  }

  public showCreateFootTraffic() {
    this._initFootTrafficCreateEdit();
    this.footTraffic.imageDescriptions = null;
    // reset selected promotionType (<=> category)
    this.promotionTypesModal = _.cloneDeep(this.promotionTypes);
    // reset selected category by promotion
    _.map(this.promotionTypesModal, promotionType => promotionType['select'] = false);
    // reset shop selected
    _.map(this.shops, shop => shop['select'] = false);
    this.showModalFootTraffic(1);
  }

  /**
   * @method showEditFootTraffic
   * @description edit foot-traffic detail
   * @param _idFootTraffic
   * @param _state
   * @todo change state param is state get from back-end
   */
  public showEditFootTraffic(_idFootTraffic: string, _state: number) {
    this._initFootTrafficCreateEdit();
    // reset selected shop -------
    for (let i = 0; i < this.shops.length; i++) {
      this.shops[i]['select'] = false;
    }
    // get detail voucher
    this._footTrafficService.getFootTrafficDetail(_idFootTraffic)
      .subscribe(dataFootTraffic => {
        this.footTraffic = _.merge(this.footTraffic, dataFootTraffic);
        // set selected promotionType (<=> category) and push promotionType value is choice
        this.promotionTypesModal = _.cloneDeep(this.promotionTypes);
        if (!_.isNil(this.footTraffic.idCategory)) {
          for (let i = 0; i < this.promotionTypesModal.length; i++) {
            this.promotionTypesModal[i]['select'] = this.footTraffic.idCategory
              .indexOf(this.promotionTypesModal[i].code) !== -1;
            if (this.footTraffic.idCategory.indexOf(this.promotionTypesModal[i].code) !== -1) {
              this.promotionTypesSelect.push(this.promotionTypesModal[i].code);
            }
          }
        }
        // set selected shop edit + push shop select in lstShop (lstStore) ---------------------
        let lstStoreTemp = dataFootTraffic.stores || [];
        for (let i = 0; i < lstStoreTemp.length; i++) {
          this.lstStore.push(lstStoreTemp[i].idShop);
          const shopItemSelect = _.find(this.shops, shop => shop.idShop === lstStoreTemp[i].idShop);
          if (shopItemSelect) shopItemSelect.select = true;
        }
        // set list tag input
        for (let i = 0; i < this.footTraffic.tags.length; i++) {
          this.tags.push({value: i, display: this.footTraffic.tags[i].tag});
        }
        // set value TongSoDiemTang or TongSoLuotGheTham (condition GioiHanTangDiem)
        this.valuePointOrView = this.footTraffic.limitPointDonation === 4
          ? this.footTraffic.totalPointsAwarded : this.footTraffic.totalNumberVisit;
        // set state from server
        this.footTraffic.state = _state;
        this.showModalFootTraffic(2); // show modal
      });
  }

  // =========================== FUNCTION ACTION CLICK IN TABLE ==================================
  /**
   * @method selectFootTraffics
   * @description select all foot-traffic
   * @param event
   */
  public selectFootTraffics(event: any) {
    if (event.currentTarget.checked) {
      this.allowButton = true;
      this.footTraffics.map(footTraffic => footTraffic['select'] = true);
    } else {
      this.allowButton = false;
      this.footTraffics.map(footTraffic => footTraffic['select'] = false);
    }
  }

  /**
   * @method selectFootTraffic
   * @description select single foot-traffic
   * @param event
   * @param _idFootTraffic
   */
  public selectFootTraffic(event, _idFootTraffic) {
    if (event.currentTarget.checked === true) {
      this.allowButton = true;
    } else {
      this._selectAllFootTraffic.nativeElement.checked = false;
    }
    let footTrafficSelect = _.find(this.footTraffics,
      footTraffic => footTraffic.idFootTraffic === _idFootTraffic);
    footTrafficSelect.select = event.currentTarget.checked;
    const findSelect = _.findIndex(this.footTraffics, footTraffic => footTraffic.select === true);
    this.allowButton = findSelect !== -1;
  }

  /**
   * @method hideState
   * @description change state show in foot-traffic
   * @param _idFootTraffic
   * @param _state
   */
  public switchSingleState(_idFootTraffic: string, _state: number) {
    let idFootTraffic = [_idFootTraffic];
    _state = _state === 1 ? 2 : 1;
    const body = {
      'foot-traffic': idFootTraffic,
      TrangThai: _state
    };

    this._footTrafficService.changeStateShowFootTraffic(body)
      .subscribe(data => {
        this.resetState();
        this.filterFootTraffic(this.dataFilter.page);
        this._toasterService.pop('success', null, `${data.D}`);
      }, this.funcError)
  }

  /**
   * @method removeFootTraffic
   * @description remove item foot-traffic
   * @param _namePromotion
   * @param _idFootTraffic
   */
  public removeFootTraffic(_namePromotion: string, _idFootTraffic: string) {
    if (!confirm(`Bạn có muốn xóa foot-traffic: "${_namePromotion.toUpperCase()}" ?`))
      return;
    let idFootTraffic: string = `ids=${_idFootTraffic}`;
    this._footTrafficService.deleteMultipleFootTraffic(idFootTraffic)
      .subscribe(data => {
        this.filterFootTraffic();
        this._toasterService.pop('success', null, data.D);
      }, this.funcError);
  }

  // ======================= FUNCTION POPUP MODEL CREATE FOOT-TRAFFIC ===========================
  // ----- function type limit point donation -------------------------------
  public changeLimitPointDonation(_typePromotion: string) {
    this.footTraffic.limitPointDonation = parseInt(_typePromotion, 10);
  }

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

  // ----------------- function execute upload file ---------------------------------------
  public validateTypeImage(files: Array<FileItem>) {
    let fileType = ['image/x-png', 'image/gif', 'image/jpeg', 'image/png'];
    for (let i = 0; i < files.length; i++) {
      if (fileType.indexOf(files[i].file.type) === -1) {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Ảnh phải có đuôi .jpg, .jpeg, .png!');
        return false;
      }
      if (files[i].file.size > 102400) {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Kích thước ảnh không hợp lệ');
        return false;
      }
    }
    return true;
  }

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
    if (this.validateTypeImage(this.uploaderAvatar.queue) === false) {
      this.uploaderAvatar.queue = [];
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
    if (this.validateTypeImage(this.uploaderImageDescriptions.queue) === false) {
      this.uploaderImageDescriptions.queue = [];
      return;
    }
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
    if (!this.footTraffic.imageDescriptions || !this.footTraffic.imageDescriptions[iImage]) {
      return;
    }
    this.footTraffic.imageDescriptions.splice(iImage, 1);
  }

  // ------ function execute datetime --------------------------------------------------------------------
  /**
   * @method updateOptionsEndEvent
   * @description set min date chose end event datetime
   */
  public updateOptionsEndEvent() {
    this.optionsEndEventDatetimePicker = {
      format: 'DD/MM/YYYY HH:mm',
      dayViewHeaderFormat: 'MM YYYY',
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
    };
  }

  /**
   * @method onScrollFootTrafficModal
   * @description Listener event scroll promotion modal
   */
  public onScrollFootTrafficModal() {
    let descriptionTop = this.elModalDescription.nativeElement.offsetTop;
    let promotionNameTop = this.elFootTrafficName.nativeElement.offsetTop;
    let promotionImageDescription = this.elImageDescription.nativeElement.offsetTop;
    let modalBodyTop = this.elModalFootTrafficBody.nativeElement.scrollTop;
    if (descriptionTop > modalBodyTop - 50 && descriptionTop < modalBodyTop + 50) {
      this.setTop = this.elMobileFootTraffic.elMobileEntry.nativeElement.offsetTop;
    }
    if (promotionNameTop > modalBodyTop - 20 && promotionNameTop < modalBodyTop + 20) {
      this.setTop = this.elMobileFootTraffic.elMobileName.nativeElement.offsetTop;
    }
    if (promotionImageDescription > modalBodyTop - 30 && promotionImageDescription < modalBodyTop + 30) {
      this.setTop = this.elMobileFootTraffic.elMobileName.nativeElement.offsetTop;
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
    this.footTraffic.state = event.currentTarget.checked ? 1 : 2;
  }

  // ------- function interage api create and update foot-traffic -----------------
  public saveFootTraffic() {
    if (this.textTitle === 'Tạo Foot-Traffic') {
      this.createFootTraffic();
    } else {
      this.updateFootTraffic();
    }
  }

  /**
   * @method createFootTraffic
   * @description create new foot-traffic
   */
  public createFootTraffic() {
    this.isLoadingFootTraffic = true;
    // common validate
    if (!this.validateInputCommon()) {
      this.isLoadingFootTraffic = false;
      return;
    }
    // validate file upload
    if (!this.fileUploadAvatar) {
      this.isLoadingFootTraffic = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ảnh đại diện!');
      return;
    }
    if (!this.fileUploadDescription) {
      this.isLoadingFootTraffic = false;
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
    // set TongSoDiemTang or TongSoLuongGheTham
    if (this.footTraffic.limitPointDonation === 4)
      this.footTraffic.totalPointsAwarded = this.valuePointOrView;
    else this.footTraffic.totalNumberVisit = this.valuePointOrView;
    const bodyCustom = {
      promotionTypesSelect: this.promotionTypesSelect,
      tags: tagsParam,
      storeIds: this.lstStore
    };
    this._footTrafficService.createFootTraffic(this.footTraffic, bodyCustom, file)
      .subscribe((data) => {
        this.isLoadingFootTraffic = false;
        this._toasterService.pop('success', null, data.D);
        this.filterFootTraffic();
        this.footTrafficModal.hide();
      }, err => {
        this.isLoadingFootTraffic = false;
        this.funcError(err);
      });
  }

  /**
   * @method updateFootTraffic
   * @description update foot-traffic information
   */
  public updateFootTraffic() {
    this.isLoadingFootTraffic = true;
    // common validate
    if (!this.validateInputCommon()) {
      this.isLoadingFootTraffic = false;
      return;
    }
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
    // set TongSoDiemTang or TongSoLuongGheTham
    if (this.footTraffic.limitPointDonation === 4)
      this.footTraffic.totalPointsAwarded = this.valuePointOrView;
    else this.footTraffic.totalNumberVisit = this.valuePointOrView;
    const bodyCustom = {
      promotionTypesSelect: this.promotionTypesSelect,
      tags: tagsParam,
      storeIds: this.lstStore
    };
    this._footTrafficService.updateFootTraffic(this.footTraffic, bodyCustom, file)
      .subscribe((data) => {
        this.isLoadingFootTraffic = false;
        this._toasterService.pop('success', null, data.D);
        this.filterFootTraffic(this.dataFilter.page);
        this.footTrafficModal.hide();
      }, err => {
        this.isLoadingFootTraffic = false;
        this.funcError(err);
      });
  }

  /**
   * @method validateInputCommon
   * @description validate input date common
   * @returns {boolean}
   */
  public validateInputCommon(): boolean {
    if (this.footTraffic.namePromotion.trim().length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Tên chương trình Foot-traffic không được phép để trống');
      return false;
    }
    if (this.footTraffic.description.trim().length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Mô tả không được phép để trống');
      return false;
    }
    // validate category
    if (this.promotionTypesSelect.length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Vui lòng chọn ít nhất một danh mục');
      return false;
    }
    if (this.lstStore.length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Vui lòng chọn ít nhất 1 địa điểm áp dụng!');
      return false;
    }
    // validate section point
    if (this.valuePointOrView <= 0) {
      if (this.footTraffic.limitPointDonation === 4) {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Tổng số điểm tặng phải lớn hơn 0!');
        return false;
      } else {
        this._toasterService.clear();
        this._toasterService.pop('error', null, 'Số lượt khách hàng ghé thăm phải lớn hơn 0!');
        return false;
      }
    }
    if (this.footTraffic.pointsAwarded <= 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Số điểm tặng cho một lượt ghé thăm phải lớn hơn 0!');
      return false;
    }
    if (this.footTraffic.maximumAccumulations <= 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Số lần tặng điểm tối đa cho 01 khách hàng trong toàn chương trình phải lớn hơn 0');
      return false;
    }
    if (this.footTraffic.distance <= 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Khoảng cách giữa hai lần tặng điểm cho 01 khách hàng phải lớn hơn 0!');
      return false;
    }
    if (this.footTraffic.limitPointDonation === 4 && this.valuePointOrView < this.footTraffic.pointsAwarded) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        `*Số điểm tặng cho 01 lượt ghé thăm* không được phép lớn hơn *Tổng số điểm tặng*`);
      return false;
    }

    if (!this.footTraffic.timeStartPromotion) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Thời gian bắt đầu không được phép để trống!');
      return false;
    }
    if (!this.footTraffic.timeStartDisplay) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Thời gian bắt đầu hiện thị không được phép để trống!');
      return false;
    }
    return true;
  }

  /**
   * @method _initVoucherCreateEdit
   * @description init footTraffic to create and edit
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
    this.tags = [];
    this.lstStore = [];
    this.promotionTypesSelect = [];

    // reset image is null
    this.fileUploadAvatar = null;
    this.fileUploadDescription = null;
    this.uploaderImageDescriptions = new FileUploader({url: ''});
    this.uploaderAvatar = new FileUploader({url: ''});

    // reset loading
    this.isLoadingFootTraffic = false;

    // reset valuePointOrView (TongSoDiemTang |TongSoLuotGheTham)
    this.valuePointOrView = 0;
  }

  private resetState() {
    this.allowButton = false;
    this._selectAllFootTraffic.nativeElement.checked = false;
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
