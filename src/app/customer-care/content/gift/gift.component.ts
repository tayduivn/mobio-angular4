/**
 * @author ManhNV, Duy
 * @description manager gift
 * @version 1.0.0
 */

import {Component, OnInit, ViewChild, HostListener, ElementRef, Renderer} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {GiftService} from '../../../common/service/component-service/gift.service';
import {Gift, PresentsType} from './gift.model';
import ckConfig from '../../../common/config/ck.config';
import {Paging} from '../../../common/model/paging';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {Router} from '@angular/router';
import {PromotionService} from '../../../common/service/component-service/promotion.service';
import {PromotionType} from '../promotion/promotion.model';
import {MobileGiftComponent} from './mobile/mobile.component';

@Component({
  selector: 'git-component',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss',
    '../product/product-styles/product.component.scss',
    '../product/product-styles/modal.component.scss',
    '../promotion/promotion.component.scss',
    '../product/mobile/karaoke/mobile-karaoke.component.scss'
  ]
})

export class GiftComponent implements OnInit {
  // declare native element
  @ViewChild('fileUrl') fileUrl: ElementRef;
  @ViewChild('outImg') outImg: ElementRef;
  @ViewChild('fileUrlAvatar') fileUrlAvatar: ElementRef;
  @ViewChild('outImgAvatar') outImgAvatar: ElementRef;
  @ViewChild('elModalDescription') elModalDescription: ElementRef;
  @ViewChild('elPromotionName') elPromotionName: ElementRef;
  @ViewChild('elImageDescription') elImageDescription: ElementRef;
  @ViewChild('_selectAllGift') _selectAllGift: ElementRef;
  // filter native element state
  @ViewChild('showStateItem') showStateItem: ElementRef;
  @ViewChild('hideStateItem') hideStateItem: ElementRef;
  // filter native element effect
  @ViewChild('acceptEffect') acceptEffect: ElementRef;
  @ViewChild('rejectEffect') rejectEffect: ElementRef;
  // directive component
  @ViewChild(MobileGiftComponent) elMobileGift: MobileGiftComponent;
  @ViewChild('giftModal') public giftModal: ModalDirective;
  @ViewChild('formDeletePromotion') public formDeletePromotion: ModalDirective;

  // Hot listener event
  @HostListener('scroll', ['$event'])

  // common variable
  public gifts: Gift[];
  public gift: Gift;
  public giftTypes: PresentsType[];
  public setTop: number;
  public tags = [];
  public isLoadingGift: boolean = false;
  public promotionTypesModal: PromotionType[];
  public totalGifAvailable: number = 0;

  // show and hide with boolean check
  public allowButton: boolean = false;
  public setHideTypeGift: boolean = true;
  public setErrorQuantity: boolean = true;
  public disabledValueGift: boolean = true;
  public textTitle: string = 'Tạo quà tặng';
  public valueGift: number = 50;
  public Quantity: number = 0;
  // variable using popup create gifts
  public selectedDiscount: boolean = true;
  public images: any = [];
  public imagesAvatar: any = null;
  public item = [{value: 0, display: 'Mỹ Phẩm'}];

  // data filter gift  -----------------------------------------------------------------------
  public keySearch: string = '';
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
  public filterTypeName: boolean = true;
  public filterTypePoint: boolean = true;
  public filterTypeTimeStart: boolean = true;
  public filterTypeTimeEnd: boolean = true;
  public setIconName: number = 0;
  public setIconPoint: number = 0;
  public setIconTimeStart: number = 0;
  public setIconTimeEnd: number = 0;
  public promotionTypes: PromotionType[];

  // variable using popup create gift =============================================================
  // variable common popup modal
  public promotionTypesSelect = [];
  // ---- sub variable control upload image -------
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

  // data config ckeditor view ---------------------------
  public config = {
    uiColor: '#F0F3F4',
    height: '300',
    toolbar: ckConfig.toolbar,
    toolbarGroups: ckConfig.toolbarGroups,
  };

  constructor(private _promotionService: PromotionService,
              private _router: Router,
              private renderer: Renderer,
              private _toasterService: ToasterService,
              private _giftService: GiftService) {
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
  }

  ngOnInit() {
    this.commonInit();
    this.filterGift();
  }

  // =========================== FUNCTION INIT PAGE ================================================================
  /**
   * @method commonInit
   * @description init common get data
   */
  private commonInit() {
    this._initGiftCreateEdit();
    this._promotionService.getPromotionTypes()
      .subscribe(dataPromotionType => {
        this.promotionTypes = dataPromotionType;
      }, this.funcError);
    this._giftService.getGiftType()
      .subscribe(dataGiftType => {
        this.giftTypes = dataGiftType;
        console.log(this.giftTypes);
      }, this.funcError);
  }

  /**
   * @function filterGift
   * @description support filter gift
   * @private
   */
  private filterGift(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._giftService.getGifts(this.dataFilter)
      .subscribe(data => {
        // set data and add temp field select
        this.gifts = data['presents'].length === 0 ? [] : data['presents'].map(GiftService.toGift);
        _.map(this.gifts, gift => gift.select = false);
        if (data.paging) {
          this.paging = data.paging;
          this.paging.page = _setPage;
        }
      }, this.funcError);
  }

  public getCurrentPage(_pageSelected: number) {
    this.resetState();
    this.dataFilter.page = _pageSelected;
    this.filterGift(_pageSelected);
  }

  public changePerPage(_perPage: number) {
    this.resetState();
    this.dataFilter.per_page = _perPage;
    this.filterGift();
  }

  // =========================== FUNCTION FILTER PAGE =================================================================
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
    this.filterGift();
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
    this.filterGift();
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
    this.filterGift();
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
    this.filterGift();
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
    this.filterGift();
  }

  public sortNameGift() {
// set default icon view price + select all checkbox + disable button execute
    this.setIconPoint = 0;
    this.setIconTimeEnd = 0;
    this.setIconTimeStart = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'TenKhuyenMai';
    this.filterTypeName = !this.filterTypeName;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeName ? 'desc' : 'asc';
    this.setIconName = !this.filterTypeName ? 2 : 1;
    this.filterGift(this.dataFilter.page);
  }

  public sortPoint() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconName = 0;
    this.setIconTimeEnd = 0;
    this.setIconTimeStart = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'DiemQuyDoi';
    this.filterTypePoint = !this.filterTypePoint;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypePoint ? 'desc' : 'asc';
    this.setIconPoint = !this.filterTypePoint ? 2 : 1;
    this.filterGift(this.dataFilter.page);
  }

  // ------- sub filter sorting timeStart and timeEnd
  public sortTimeStart() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconName = 0;
    this.setIconPoint = 0;
    this.setIconTimeEnd = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'ThoiDiemBatDauKhuyenMai';
    this.filterTypeTimeStart = !this.filterTypeTimeStart;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeTimeStart ? 'desc' : 'asc';
    this.setIconTimeStart = !this.filterTypeTimeStart ? 2 : 1;
    this.filterGift(this.dataFilter.page);
  }

  public sortTimeEnd() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconName = 0;
    this.setIconPoint = 0;
    this.setIconTimeStart = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'ThoiDiemKetThucKhuyenMai';
    this.filterTypeTimeEnd = !this.filterTypeTimeEnd;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeTimeEnd ? 'desc' : 'asc';
    this.setIconTimeEnd = !this.filterTypeTimeEnd ? 2 : 1;
    this.filterGift(this.dataFilter.page);
  }

// =========================== FUNCTION BAR MANAGER ===============================================================
  public searchGift() {
    this.dataFilter.ChuoiTimKiem = this.keySearch;
    if (!this.keySearch) {
      this.dataFilter.ChuoiTimKiem = '';
    }
    this.filterGift();
  }

  // =========================== FUNCTION SHOW - HIDE MODAL PROMOTION ===============================================
  /**
   * @method removeGiftSelect
   * @description delete selected gift
   */
  public removeGiftSelect() {
    if (!confirm('Bạn có muốn xóa các quà tặng đã chọn!'))
      return;
    let idGift: string = 'ids=';
    this.gifts.forEach(gift => {
      if (gift['select'] === true) {
        idGift += `${gift.idGift},`;
      }
    });
    idGift = idGift.slice(0, idGift.length - 1);
    this._giftService.deleteMultipleGift(idGift)
      .subscribe(data => {
        this.resetState();
        this.filterGift();
        this._toasterService.pop('success', null, data.D);
      }, this.funcError);
  }

  /**
   * @method switchStateGift
   * @description set visible/ invisible seleted gift
   */
  public switchStateGift(state: number) {
    let idGift = [];
    this.gifts.forEach(gift => {
      if (gift['select'] === true) {
        idGift.push(gift.idGift);
      }
    });
    const body = {
      presents: idGift,
      TrangThai: state
    };
    this._giftService.changeStateShowGift(body)
      .subscribe(data => {
        this.resetState();
        this.filterGift(this.dataFilter.page);
        this._toasterService.pop('success', null, `${data.D}`);
      }, this.funcError);
  }

  /**
   * @method showModalPromotion
   * @description on click show modal create or edit createVoucher
   * @param event
   */
  public showModalGift(event) {
    this.giftModal.show();
    if (event === 1) {
      this.textTitle = 'Tạo Quà Tặng';
    } else {
      this.textTitle = 'Sửa Quà Tặng';
    }
  }

  /**
   * @method showCreateGift
   */
  public showCreateGift() {
    this._initGiftCreateEdit();
    this.gift.imageDescriptions = null;
    // reset selected promotionType (<=> category)
    this.promotionTypesModal = _.cloneDeep(this.promotionTypes);
    // reset selected category by promotion
    _.map(this.promotionTypesModal, promotionType => promotionType['select'] = false);
    this.showModalGift(1);
  }

  /**
   * @method showEditGift
   * @description edit gift detail
   * @param _idPromotion
   * @param _state
   * @deprecated change state param is state get from back-end
   */
  public showEditGift(_idPromotion: string, _state: number) {
    this._initGiftCreateEdit();
    this._giftService.getGiftDetail(_idPromotion)
      .subscribe(dataPromotion => {
        this.gift = dataPromotion;
        // set selected promotionType (<=> category) and push promotionType value is choice
        this.promotionTypesModal = _.cloneDeep(this.promotionTypes);
        if (!_.isNil(this.gift.idCategory)) {
          for (let i = 0; i < this.promotionTypesModal.length; i++) {
            this.promotionTypesModal[i]['select'] = this.gift.idCategory
              .indexOf(this.promotionTypesModal[i].code) !== -1;
            if (this.gift.idCategory.indexOf(this.promotionTypesModal[i].code) !== -1) {
              this.promotionTypesSelect.push(this.promotionTypesModal[i].code);
            }
          }
        }
        // set list tag input
        for (let i = 0; i < this.gift.tags.length; i++) {
          this.tags.push({value: i, display: this.gift.tags[i].tag});
        }
        // set state from server -----------------------
        this.gift.state = _state;

        // get so qua tang trong kho -------------------
        const giftTypeSelect = _.find(this.giftTypes, giftType => giftType.price === this.gift.price);
        if (giftTypeSelect) {
          // get total count
          const paramGift = {
            MenhGia: giftTypeSelect.price,
            LoaiTheCao: giftTypeSelect.type
          };
          this._giftService.getGiftTotalCount(paramGift)
            .subscribe(totalGift => {
              this.totalGifAvailable = totalGift;
              console.log('So luong qua tang con trong kho la: ' + this.totalGifAvailable);
            }, this.funcError);
        }
        // --------- end -------------------------------

        this.showModalGift(2); // show modal
      }, this.funcError);
  }

  // =========================== FUNCTION ACTION CLICK IN TABLE =============================================
  /**
   * @method selectGifts
   * @description select all gifts
   * @param event
   */
  public selectGifts(event: any) {
    if (event.currentTarget.checked) {
      this.allowButton = true;
      this.gifts.map(gift => gift['select'] = true);
    } else {
      this.allowButton = false;
      this.gifts.map(gift => gift['select'] = false);
    }
  }

  /**
   * @method selectGift
   * @description select single gift
   * @param event
   * @param _idGift
   */
  public selectGift(event, _idGift) {
    if (event.currentTarget.checked === true) {
      this.allowButton = true;
    } else {
      this._selectAllGift.nativeElement.checked = false;
    }
    let giftSelect = _.find(this.gifts, gift => gift.idGift === _idGift);
    giftSelect.select = event.currentTarget.checked;
    const findSelect = _.findIndex(this.gifts, gift => gift.select === true);
    this.allowButton = findSelect !== -1;
  }

  /**
   * @method hideState
   * @description change state show in gift
   * @param _idGift
   * @param _state
   */
  public switchSingleState(_idGift: string, _state: number) {
    let idGift = [_idGift];
    _state = _state === 1 ? 2 : 1;
    const body = {
      presents: idGift,
      TrangThai: _state
    };

    this._giftService.changeStateShowGift(body)
      .subscribe(data => {
        this.resetState();
        this.filterGift(this.dataFilter.page);
        this._toasterService.pop('success', null, `${data.D}`);
      }, this.funcError)
  }

  /**
   * @method removeGift
   * @description remove item gift
   * @param _nameGift
   * @param _idGift
   */
  public removeGift(_nameGift: string, _idGift: string) {
    if (!confirm(`Bạn có muốn xóa ưu đãi: "${_nameGift.toUpperCase()}" ?`))
      return;
    let idGift: string = `ids=${_idGift}`;
    this._giftService.deleteMultipleGift(idGift)
      .subscribe(data => {
        this.filterGift();
        this._toasterService.pop('success', null, data.D);
      }, this.funcError);
  }

  // ======================= FUNCTION POPUP MODEL CREATE GIFT ==============================================
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

  /**
   * @method selectGiftForm
   * @alias giftType
   * @param {string} _gifFormValue
   */
  public selectGiftForm(_gifFormValue: string) {
    this.gift.giftForm = _gifFormValue; // [1] or [2]
  }

  /**
   * @method selectGiftType
   * @alias giftForm
   * @param {string} _giftTypeId
   */
  public selectGiftTypes(_giftTypeId: string) {
    // set value gift
    const giftTypeSelect = _.find(this.giftTypes, giftType => giftType.id === _giftTypeId);
    if (giftTypeSelect) {
      // set value GiaTriThe va DiemDoiQuaTang
      this.gift.price = giftTypeSelect.price;
      this.gift.conversionPoint = this.gift.price / 1000;
      this.gift.typeGift = giftTypeSelect.type;
      // get total count
      const paramGift = {
        MenhGia: giftTypeSelect.price,
        LoaiTheCao: giftTypeSelect.type
      };
      this._giftService.getGiftTotalCount(paramGift)
        .subscribe(totalGift => {
          this.totalGifAvailable = totalGift;
          console.log('So luong qua tang con trong kho la: ' + this.totalGifAvailable);
        }, this.funcError);
    }
  }

  /**
   * @method validateGift
   * @description validateGift
   * @param value
   * @param typeGift
   */
  public validateGift(value, typeGift) {
    if (!value) {
      this.setErrorQuantity = true;
      return false;
    }
    let intValue = parseFloat(value);
    if (typeGift === '1' && this.gift.number_max > this.totalGifAvailable) {
      this.setErrorQuantity = false;
      this.gift.number_max = 0;
      return false;
    }
    this.setErrorQuantity = true;
  }

  /**
   * @method changePriceGift
   * @description change price gift information
   */
  public changePriceGift() {
    this.gift.conversionPoint = Math.round(this.gift.price / 1000);
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
    if (!this.gift.imageDescriptions || !this.gift.imageDescriptions[iImage]) {
      return;
    }
    this.gift.imageDescriptions.splice(iImage, 1);
  }

  // ----- function modify state -----------------------------------------------
  public switchState(event: any) {
    this.gift.state = event.currentTarget.checked ? 1 : 2;
  }

  // ------- function interage api cr update promotion -----------------
  public saveGift() {
    if (this.textTitle === 'Tạo Quà Tặng') {
      this.createGift();
    } else {
      this.updateGift();
    }
  }

  /**
   * @method createPromotion
   * @description create new gift
   */
  public createGift() {
    this.isLoadingGift = true;
    // common validate
    if (!this.validateInputCommon()) {
      this.isLoadingGift = false;
      return;
    }
    // validate file upload
    if (!this.fileUploadAvatar) {
      this.isLoadingGift = false;
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ảnh đại diện!');
      return;
    }
    if (!this.fileUploadDescription) {
      this.isLoadingGift = false;
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
    const bodyCustom = {
      promotionTypesSelect: this.promotionTypesSelect,
      tags: tagsParam
    };
    this._giftService.createGift(this.gift, bodyCustom, file)
      .subscribe((data) => {
        this.isLoadingGift = false;
        this._toasterService.pop('success', null, data.D);
        this.filterGift();
        this.giftModal.hide();
      }, err => {
        this.isLoadingGift = false;
        this.funcError(err);
      });
  }

  /**
   * @method updateGift
   * @description update gift info
   */
  public updateGift() {
    this.isLoadingGift = true;
    // common validate
    if (!this.validateInputCommon()) {
      this.isLoadingGift = false;
      return;
    }
    // config file upload
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
    const bodyCustom = {
      promotionTypesSelect: this.promotionTypesSelect,
      tags: tagsParam
    };
    this._giftService.updateGift(this.gift, bodyCustom, file)
      .subscribe((data) => {
        this.isLoadingGift = false;
        this._toasterService.pop('success', null, data.D);
        this.filterGift();
        this.giftModal.hide();
      }, err => {
        this.isLoadingGift = false;
        this.funcError(err);
      });
  }

  /**
   * @method validateInputCommon
   * @description validate input date common
   * @returns {boolean}
   */
  public validateInputCommon(): boolean {
    if (this.gift.nameGiff.trim().length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Tên quà tặng không được phép để trống!');
      return false;
    }
    // validate category
    if (this.promotionTypesSelect.length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ít nhất một danh mục');
      return false;
    }
    if (this.gift.giftForm === '[1]' && this.gift.typeGift === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn một quà tặng đính kèm!');
      return false;
    }
    if (this.gift.giftForm === '[2]' && this.gift.price <= 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Trị giá quà tặng phải lớn hơn 0!');
      return false;
    }
    if (this.gift.conversionPoint <= 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Điểm đổi quà tặng phải là số nguyên dương và lớn hơn 0!');
      return false;
    }
    // validate so luong qua tang
    if (this.gift.giftForm === '[1]') {
      if (this.totalGifAvailable <= 0) {
        this._toasterService.clear();
        this._toasterService.pop('error', null,
          'Loại quà tặng bạn chọn hiện đang hết! Vui lòng chọn loại quà tặng khác thay thế!');
        return false;
      }
      if (this.gift.number_max <= 0 || this.gift.number_max > this.totalGifAvailable) {
        this._toasterService.clear();
        this._toasterService.pop('error', null,
          'Số lượng quà tặng phải là số nguyên dương và nhỏ hơn số lượng quà tặng trong kho!');
        return false;
      }
    }
    if (this.gift.giftForm === '[2]' && this.gift.number_max <= 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null,
        'Số lượng quà tặng phải là số nguyên dương!');
      return false;
    }
    // --- end validate so luong qua tang
    if (!this.gift.timeStartPromotion) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Thời gian bắt đầu không được phép để trống!');
      return false;
    }
    if (!this.gift.timeStartDisplay) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Thời gian bắt đầu hiển thị không được phép để trống!');
      return false;
    }
    if (this.gift.description.trim().length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Mô tả không được phép để trống!');
      return false;
    }
    return true;
  }

  // ======================= FUNCTION COMMON ==================================================================
  /**
   * @method _initGiftCreateEdit
   * @description Listener event scroll Gift modal
   */
  private _initGiftCreateEdit() {
    this.gift = {
      idGift: '',           // KhuyenMaiID
      nameGiff: '',         // TenKhuyenMai
      idCategory: '',       // MaDanhMuc
      giftForm: '[1]',          // HinhThucNhanQua
      typeGift: 0,         // KieuQuaTang
      conversionPoint: 0,   // DiemQuyDoi
      price: 0,             // GiaTien
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
    };
    this.totalGifAvailable = 0;

    this.tags = [];
    this.promotionTypesSelect = [];
    // reset image is null
    this.fileUploadAvatar = null;
    this.fileUploadDescription = null;
    this.uploaderImageDescriptions = new FileUploader({url: ''});
    this.uploaderAvatar = new FileUploader({url: ''});
    this.isLoadingGift = false;
  }

  private resetState() {
    this.allowButton = false;
    this._selectAllGift.nativeElement.checked = false;
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
