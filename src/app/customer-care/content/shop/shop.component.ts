/**
 * @class shop-component
 * @author ManhNV, DuyBV
 * @description setting feature shop component
 * @version 1.0.0
 */

import {Component, OnInit, ViewChild, ElementRef, Renderer} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {AgmMap} from '@agm/core';
import {ToasterService} from 'angular2-toaster';
import * as _ from 'lodash';
import ckConfig from '../../../common/config/ck.config';
import {ShopService} from '../../../common/service/component-service/shop.service';
import {ProvincesService} from '../../../common/service/common-service/provinces.service';
import {Shop} from './shop.model';
import {Provinces, ProvincesCity} from '../../../common/model/provinces.model';
import {Router} from '@angular/router';
import {Paging} from '../../../common/model/paging';
import {Observable} from 'rxjs/Observable';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'shop-component',
  templateUrl: './shop.component.html',
  styleUrls: ['../product/product-styles/modal.component.scss', './shop.component.scss']
})

export class ShopComponent implements OnInit {
  // =================DECLARE VARIABLE =======================================================================
  // variable native element ------------------------------
  @ViewChild(AgmMap) map: AgmMap;
  @ViewChild('largeModal') public modalExecuteShop: ModalDirective;
  @ViewChild('smallModal') public smallModal: ModalDirective;
  @ViewChild('titleModalShop') titleModalShop: ElementRef;
  @ViewChild('qrCode') public qrCode: ElementRef;
  @ViewChild('fileUrl') fileUrl: ElementRef;
  @ViewChild('outImg') outImg: ElementRef;
  @ViewChild('fileUrlAvatar') fileUrlAvatar: ElementRef;
  @ViewChild('outImgAvatar') outImgAvatar: ElementRef;
  @ViewChild('emailInput') emailInput: ElementRef;
  // table select native element
  @ViewChild('_selectAllShop') _selectAllShop: ElementRef;
  // Filter state-show
  @ViewChild('showStateItem') showStateItem: ElementRef;
  @ViewChild('hideStateItem') hideStateItem: ElementRef;

  // common variable ---------------------------------------------------
  public shops: Shop[];
  public shop: Shop;
  public provinceCities: ProvincesCity[];

  // variable bar (search and action button)----------------------------
  public allowButton: boolean = false;
  public keySearch: string = '';

  // variable menu-left ------------------------------------------------
  public hide: boolean = false;
  public filterCity: string = '';
  public checkAllCity: boolean = false;
  public checkAllShop: boolean = false;

  // data filter shop --------------------------------------------------
  public dataFilter = {
    TrangThai: '',
    ChuoiTimKiem: '',
    MaTinhThanh: '',
    sort: '',
    order: '',
    page: 1, // default page select is 1
    per_page: 10 // default get 5 item
  };
  public paging: Paging;
  public filterTypeCity: boolean = true;
  public filterTypeAddress: boolean = true;
  public setIconViewAddress: number = 0;
  public setIconViewCity: number = 0;

  // variable create shop modal ----------------------------------------
  stateToggle: boolean = false;
  title: string = 'My first AGM project'; // map info
  zoom: number = 12;
  public sourceImg: string = ''; // src download bar-code
  // ---- element modal gen barcode

  // variable state
  public isLoadingShop: boolean = false;
  public barCodeSelected: string;

  // ------ config module angular- multiple select -----------------------------
  public dropDownListShop = [];
  public selectedShop = [];
  public dropDownSettings = {};

  constructor(private _shopService: ShopService,
              private _provincesService: ProvincesService,
              private _router: Router,
              public renderer: Renderer,
              private _toasterService: ToasterService) {
    this.paging = {
      total_page: 0,
      per_page: 10,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
    this.dropDownSettings = {
      singleSelection: true,
      text: 'Chọn Tỉnh/ Thành',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.initShopData();
  }

  ngOnInit() {
    this.filterShop();
    this._provincesService.getProvincesCity()
      .subscribe(provinces => {
        this.provinceCities = provinces;
        _.map(this.provinceCities, provinceCity => provinceCity['select'] = false);

        // config single select oject angular multipler select
        this.dropDownListShop = this.provinceCities.map(province => {
          return {
            id: province.code,
            itemName: province.name
          }
        });
        console.log(this.provinceCities);
      }, this.funcError);
  }

  /**
   * @function filterShop
   * @description support filter Shop
   * @private
   */
  private filterShop(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._shopService.getShops(this.dataFilter)
      .subscribe(
        data => {
          // set data and add temp field select
          this.shops = data.stores.length === 0 ? [] : data.stores.map(ShopService.toShop);
          _.map(this.shops, shop => shop.select = false);
          if (data.paging) {
            this.paging = data.paging;
            this.paging.page = _setPage;
          }
        }, this.funcError);
  }

  public searchShop() {
    this.dataFilter.ChuoiTimKiem = this.keySearch;
    if (!this.keySearch) {
      this.dataFilter.ChuoiTimKiem = '';
    }
    this.filterShop();
  }

  public getCurrentPage(_pageSelected: number) {
    this.resetState();
    this.dataFilter.page = _pageSelected;
    this.filterShop(_pageSelected);
  }

  public changePerPage(_perPage: number) {
    this.resetState();
    this.dataFilter.per_page = _perPage;
    this.filterShop();
  }

  // ================= UPLOAD PRODUCT ============================================================================
  // Declare variable
  public _stateShowInformationUploadShop: boolean = false;
  @ViewChild('uploadShopModal') public uploadShopModal: ModalDirective;
  @ViewChild('elInputFileProduct') elInputFileProduct: ElementRef;
  public uploaderShop: FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOver: boolean = false;
  public isLoadingUploadShop: boolean = false;
  public fileUploadExcel: File = null;

  /**
   * @method changeStateInformationUploadShop
   * @description show or hide to upload product
   * @param event
   */
  public changeStateInformationUploadShop(event: any) {
    let elementId: string = (event.target as Element).id;
    if (elementId.trim() === '') {
      return false;
    }
    this._stateShowInformationUploadShop = !this._stateShowInformationUploadShop;
  }

  /**
   * @method showModalUploadProduct
   * @description clear valiable and show modal
   */
  public showModalUploadFile() {
    this._stateShowInformationUploadShop = false;
    this.uploadShopModal.show();
  }

  /**
   * @method fileOverBaseUploadProduct
   * @description file over in border upload product.
   * @param e
   */
  public fileOverBaseUploadProduct(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  /**
   * @method onFileDropUploadShop
   * @description on file drop to box upload product
   */
  public onFileDropUploadShop() {
    let fileQueue = this.uploaderShop.queue;
    if (fileQueue.length > 1) {
      this.uploaderShop.queue[0].remove();
    }
    let reg = /.+\.xls$/g;
    if (fileQueue.length === 1 && !reg.test(fileQueue[0].file.name)) {
      this.uploaderShop.queue[0].remove();
      this._toasterService.pop('error', null, 'File phải có định dạng .xls');
      return;
    }
    this.fileUploadExcel = this.uploaderShop.queue[0]._file;
  }

  /**
   * @method chooseFileUpdateShop
   * @description click to choose file to upload product
   * @param event
   */
  public chooseFileUpdateShop(event: any) {
    let eventClick = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(
      this.elInputFileProduct.nativeElement, 'dispatchEvent', [eventClick]);
  }

  public getFileCodeStore() {

  }

  public getFileDataStore() {
    event.preventDefault();
    let url = this._shopService.fileExample() + '/excel/sample';
    let link = document.createElement('a');
    if (typeof link.download === 'string') {
      document.body.appendChild(link); // Firefox requires the link to be in the body
      link.download = 'MauFileExcelNhapLieuCuaHang.xls';
      link.href = url;
      link.click();
      document.body.removeChild(link); // remove the link when done
    } else {
      console.log('err');
    }
  }

  /**
   * @method uploadFileExcel
   * @description upload file product
   */
  public uploadFileExcel() {
    this.isLoadingUploadShop = true;
    let timer = setTimeout(() => {
      this.isLoadingUploadShop = false;
    }, 1000);
    if (this.uploaderShop.queue.length <= 0) {
      this._toasterService.pop('error', null, 'Bạn cần chọn file để upload.');
      return;
    }
    let file = [{
      name: 'file',
      files: [this.fileUploadExcel]
    }];
    this._shopService.createShopFromFile(file)
      .subscribe(data => {
        this._toasterService.pop('success', null, data.D);
        this.uploadShopModal.hide();
      }, this.funcError);
  }

  // ============== FUNCTION BAR MANAGER =========================================================================
  public hideShopSelect() {
    this.updateMultipleShop(2);
  }

  public showShopSelect() {
    this.updateMultipleShop(1);
  }

  /**
   * @method updateMultipleShop
   * @description enable/ disable multiple shop select
   * @param {number} state
   */
  private updateMultipleShop(state: number) {
    let idShops = [];
    this.shops.forEach(shop => {
      if (shop['select'] === true) {
        idShops.push(shop.idShop);
      }
    });

    let body = {
      stores: idShops,
      TrangThai: state
    };
    this._shopService.changeStateShowShop(body)
      .subscribe(data => {
          this.resetState();
          this.filterShop(this.dataFilter.page); // set current-page
          this._toasterService.pop('success', null, data.D);
        }, this.funcError
      );
  }

  // ============== FUNCTION MENU LEFT ===========================================================================
  public filterAllCityFunc(event: any) {
    this.resetState();
    this.checkAllCity = event.currentTarget.checked;
    _.map(this.provinceCities, provinceCity => provinceCity['select'] = event.currentTarget.checked);
    // select or un-select => filter all
    this.dataFilter.MaTinhThanh = '';
    if (event.currentTarget.checked) {
      this.provinceCities.forEach(provinceCity => {
        this.dataFilter.MaTinhThanh += `${provinceCity.code},`;
      })
    }
    this.filterShop();
  }

  /**
   * @method filterCityFunc
   * @description filter with city select
   * @param event
   * @param {string} _code
   */
  public filterCityFunc(event: any, _code: string) {
    // set disable allowButton + selectAllProduct
    this.resetState();

    // modify selected item city
    let citySelect = _.find(this.provinceCities, provinceCity => provinceCity.code === _code);
    citySelect.select = event.currentTarget.checked;
    // add data filter by idCity
    if (event.currentTarget.checked) {
      this.dataFilter.MaTinhThanh += `${_code},`;
      this.filterShop();
    } else {
      this.checkAllCity = false;
      this.dataFilter.MaTinhThanh = _.replace(this.dataFilter.MaTinhThanh, _code + ',', '');
      this.filterShop();
    }
  }

  /**
   * @method filterShowState
   * @description filter with state is (show| hide)
   */
  public filterShowState() {
    // set disable allowButton + selectAllProduct
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
    this.filterShop();
  }

  /**
   * @method filterHideState
   * @description filter by state product equal hide (2)
   */
  public filterHideState() {
    // set disable allowButton + selectAllProduct
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
    this.filterShop();
  }

  // ================== FUNCTION SUPPORT TABLE =====================================================================
  /**
   * @method selectAllShop
   * @description select all checkbox in table and set all item shop select = true
   * @param event
   */
  public selectAllShop(event) {
    this.checkAllShop = event.currentTarget.checked;
    if (event.currentTarget.checked === true) {
      this.allowButton = true;
      _.map(this.shops, item => item['select'] = true);
    } else {
      this.allowButton = false;
      _.map(this.shops, item => item['select'] = false);
    }
  }

  /**
   * @method selectShop
   * @description set item shop select is true
   * @param event -event checkbox
   * @param _idShop -id shop select
   */
  public selectShop(event, _idShop) {
    if (event.currentTarget.checked === true) {
      this.allowButton = true;
    } else {
      this.checkAllShop = false;
    }
    let shopSelect = _.find(this.shops, shop => shop.idShop === _idShop);
    shopSelect.select = event.currentTarget.checked;
    const findSelect = _.findIndex(this.shops, shop => shop.select === true);
    this.allowButton = findSelect !== -1;
  }

  /**
   * @method hideState
   * @description switch allowState shop is hide or show
   * @param _idShop
   * @param state
   */
  public hideState(_idShop: string, state: number) {
    let body = {
      stores: [_idShop],
      TrangThai: state === 1 ? 2 : 1
    };
    this._shopService.changeStateShowShop(body)
      .subscribe(() => {
          this.filterShop(this.dataFilter.page); // set current-page
          const message = state === 2 ? 'Đã chuyển sang trạng thái hiển thị'
            : 'Đã chuyển sang trạng thái ẩn';
          this._toasterService.pop('success', null, message);
        }, this.funcError
      );
  }

  /**
   * @method removeShop
   * @description remove item shop select
   */
  public removeShop() {
    this._toasterService.pop('info', null, 'Feature remove shop');
  }

  public showModalBarCode(idShop: string, barCode: string) {
    this.barCodeSelected = barCode;
    this.sourceImg = this.qrCode['elementRef'].nativeElement.childNodes[0].currentSrc;
    // set idBarcodeGlobal
    this.idShopGlobal = idShop;
    console.log(this.qrCode);
    console.log(this.sourceImg);
    this.smallModal.show();
  }

  public idShopGlobal: string = '';

  /**
   * @method genBarCode
   */
  public genBarCode() {
    this._shopService.genBarCode(this.idShopGlobal)
      .subscribe(data => {
        console.log(data['qrcode']);
        this.barCodeSelected = data['qrcode'];
        this.filterShop(this.dataFilter.page);
      }, this.funcError);
  }

  /**
   * @method downloadBarCode
   * @description download barcode selected
   * @param qrCode
   */
  public downloadBarCode(qrCode: any) {
    event.preventDefault();
    let url = this.qrCode['elementRef'].nativeElement.childNodes[0]
      .currentSrc.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    let link = document.createElement('a');
    if (typeof link.download === 'string') {
      document.body.appendChild(link); // Firefox requires the link to be in the body
      link.download = 'barcode.png';
      link.href = url;
      link.click();
      document.body.removeChild(link); // remove the link when done
    } else {
      console.log('err');
    }
  }

  // ================== FUNCTION SUPPORT MODAL CREATE SHOP ========================================================
  public selectCity(_city: string) {
    this.shop.city = _city;
  }

  /**
   * @method mapClicked
   * @description event mapClicked
   * @param $event
   */
  public mapClicked($event: any) {
    this.shop.lat = $event.coords.lat;
    this.shop.lng = $event.coords.lng;
  }

  testChange($event) {
    this.shop.lat = $event.coords.lat;
    this.shop.lng = $event.coords.lng;
  }

  /**
   * @method markerDragEnd
   * @param demo
   * @param $event
   */
  public markerDragEnd($event: any) {
    console.log($event);
  }

  public triggerMap() {
    this.map.triggerResize();
  }

  public switchState(event: any) {
    this.shop.state = event.currentTarget.checked ? 1 : 2;
  }

  // ==================== FUNCTION SUPPORT FILTER ====================================
  public sortCity() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconViewAddress = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'MaTinhThanh';
    this.filterTypeCity = !this.filterTypeCity;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeCity ? 'desc' : 'asc';
    this.setIconViewCity = !this.filterTypeCity ? 2 : 1;
    this.filterShop(this.dataFilter.page);
  }

  public sortAddress() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconViewCity = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'DiaChi';
    this.filterTypeAddress = !this.filterTypeAddress;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeAddress ? 'desc' : 'asc';
    this.setIconViewAddress = !this.filterTypeAddress ? 2 : 1;
    this.filterShop(this.dataFilter.page);
  }

  // ================ FUNCTION CREATE- UPDATE SHOP ===============================================================
  public showCreateShop() {
    this.titleModalShop.nativeElement.innerText = 'TẠO CỬA HÀNG';
    this.modalExecuteShop.show();
    this.initShopData();
  }

  /**
   * @method editShop
   * @description edit shop in table
   */
  public showEditShop(_idShop: string) {
    this.modalExecuteShop.show();
    this.initShopData();
    this.titleModalShop.nativeElement.innerText = 'SỬA CỬA HÀNG';
    this._shopService.getShopDetail(_idShop)
      .subscribe(shopData => {
        this.shop = [shopData['store']].map(ShopService.toShop)[0];

        const shopSelect = _.find(this.dropDownListShop, shop => shop.id === this.shop.city);
        if (!_.isNil(shopSelect)) {
          this.selectedShop.push(shopSelect);
        }
      }, this.funcError);
  }

  /**
   * @method saveShop
   * @description create or update shop
   */
  public saveShop() {
    if (this.titleModalShop.nativeElement.innerText === 'TẠO CỬA HÀNG') {
      this.createShop();
    } else {
      this.updateShop();
    }
  }

  /**
   * @method createShop
   * @description create new shop
   */
  public createShop() {
    this.isLoadingShop = true;
    const patternMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.shop.email && this.shop.email.trim().length > 0 && !patternMail.test(this.shop.email.trim())) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Email không hợp lệ!');
      this.emailInput.nativeElement.focus();
      this.isLoadingShop = false;
      return;
    }
    if (this.selectedShop.length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Bạn cần chọn Tỉnh thành phố!');
      return;
    }
    if (this.shop.address.trim().length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Bạn cần nhập địa chỉ!');
      this.isLoadingShop = false;
      return;
    }
    this.shop.city = this.selectedShop[0]['id'];
    this._shopService.createShop(this.shop)
      .subscribe(() => {
        this.isLoadingShop = false;
        this._toasterService.pop('success', null, 'Tạo cửa hàng thành công!');
        this.filterShop();
        this.modalExecuteShop.hide();
      }, err => {
        this.isLoadingShop = false;
        this.funcError(err);
      });
  }

  public onShopSelect(event: any) {
  }

  public onShopDeSelect() {
  }

  /**
   * @method updateShop
   * @description update shop detail
   */
  public updateShop() {
    const patternMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.shop.email && this.shop.email.trim().length > 0 && !patternMail.test(this.shop.email.trim())) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Email không hợp lệ!');
      this.emailInput.nativeElement.focus();
      this.isLoadingShop = false;
      return;
    }
    if (this.selectedShop.length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Bạn cần chọn Tỉnh thành phố!');
      return;
    }
    this.shop.city = this.selectedShop[0]['id'];
    this._shopService.updateShop(this.shop)
      .subscribe(() => {
        this.filterShop(this.dataFilter.page);
        this.isLoadingShop = false;
        this._toasterService.pop('success', null, 'Cập nhật thành công!');
        this.modalExecuteShop.hide();
      }, err => {
        this.isLoadingShop = false;
        this.funcError(err);
      });
  }


  // ================ FUNCTION COMMON SUPPORT  ===================================================================
  /**
   * @method initShopData
   * @description init new shop data
   */
  private initShopData() {
    this.shop = {
      idShop: '',
      address: '',
      city: '0',
      codeStore: '',
      state: 1,
      email: '',
      hotLine: '',
      lat: 21.0277646,
      lng: 105.83415979999995,
      nameShop: ''
    };
    // reset shop select
    this.selectedShop = [];
  }

  private resetState() {
    this.allowButton = false;
    this._selectAllShop.nativeElement.checked = false;
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
