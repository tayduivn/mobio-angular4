/**
 * @author ManhNV, DuyBV
 * @description setting feature product component
 * @version 1.0.0
 */

import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';

import { FileUploader } from 'ng2-file-upload';
import ckConfig from '../../../common/config/ck.config';
import * as _ from 'lodash'
import { Product } from './product.model';
import { Paging } from '../../../common/model/paging';
import { ApiRequestService } from '../../../common/service/common-service/api-request.service';

import { Category } from '../../../common/model/category.model';
import { ProductService } from '../../../common/service/component-service/product.service';
import { CategoryService } from '../../../common/service/common-service/category.service';
import { MobileKaraokeComponent } from './mobile/karaoke/mobile-karaoke.component';
import { MobileProductComponent } from './mobile/product/mobile-product.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product-styles/product.component.scss', './product-styles/modal.component.scss']
})

export class ProductComponent implements OnInit {
  // =================DECLARE VARIABLE =========================================================================
  // variable native element ------------------------------
  @ViewChild('fileUrl') fileUrl: ElementRef;
  // Filter state-show
  @ViewChild('showStateItem') showStateItem: ElementRef;
  @ViewChild('hideStateItem') hideStateItem: ElementRef;
  // Filter state-change
  @ViewChild('allowChangeItem') allowChangeItem: ElementRef;
  @ViewChild('dontAllowChangeItem') dontAllowChangeItem: ElementRef;
  // table select native element
  @ViewChild('_selectAllProduct') _selectAllProduct: ElementRef;
  // modal product
  @ViewChild('titleModalProduct') titleModalProduct: ElementRef;
  @ViewChild('modalCreateEditProduct') public modalCreateEditProduct: ModalDirective;
  @ViewChild('elModalDescription') elModalDescription: ElementRef;
  @ViewChild('elProductName') elProductName: ElementRef;
  @ViewChild('elProductAvatar') elProductAvatar: ElementRef;
  @ViewChild('elModalBody') elModalBody: ElementRef;
  @ViewChild(MobileKaraokeComponent) elMobileKaraoke: MobileKaraokeComponent;
  @ViewChild(MobileProductComponent) elMobileDetail: MobileProductComponent;
  // Hot listener event
  @HostListener('scroll', ['$event'])

  // common variable ----------------------------------------------------------------------
  public products: Product[];
  public product: Product;
  public categories: Category[] = null;
  public setTop: number;
  public keySearch: string = '';
  public setTopProductDetail: number;
  public _isProductKaraoke: boolean = false;
  public apiService: ApiRequestService;
  // variable bar (search and action button)-----------------------------------------------
  public allowButton: boolean = false;
  public titleModal: string = '';

  // variable menu-left -------------------------------------------------------------------

  // data filter product ------------------------------------------------------------------
  public dataFilter = {
    TrangThaiDoiDiem: '',
    TrangThai: '',
    MaDanhMuc: '',
    ChuoiTimKiem: '',
    sort: '',
    order: '',
    page: 1, // default page select is 1
    per_page: 5 // default get 5 item
  };
  public filterTypeName: boolean = true;
  public filterTypePrice: boolean = true;
  public setIconViewName: number = 0;
  public setIconViewPrice: number = 0;
  public paging: Paging; // paging is response data from server

  // variable table product ---------------------------------------------------------------

  // variable create product modal --------------------------------------------------------
  public fileUploadAvatar: File = null;
  public uploaderAvatar: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOverAvatar: boolean = false;
  @ViewChild('elInputFileAvatar') elInputFileAvatar: ElementRef;

  public fileUploadDescription: File[] = [];
  public uploaderImageDescriptions: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOverImageDescriptions: boolean = false;
  @ViewChild('elInputFileImageDescriptions') elInputFileImageDescriptions: ElementRef;

  public imagesAvatar: any = [];
  public tags = [{ value: 0, display: 'THOITRANG' }];
  // data config ckeditor view
  public config = {
    uiColor: '#F0F3F4',
    height: '300',
    toolbar: ckConfig.toolbar,
    toolbarGroups: ckConfig.toolbarGroups,
    resize_enabled: false,
    removePlugins: "elementspath"
  };
  // variable state
  public _stateShowInfoMationUploadProduct: boolean = false;
  public checkActionModal: boolean = false;
  public isLoadingCreateProduct: boolean = false;
  public categoriesByModal: Category[] = null;

  // variable modal upload product --------------------------------------------------------
  @ViewChild('uploadProductModal') public uploadProductModal: ModalDirective;
  @ViewChild('elInputFileProduct') elInputFileProduct: ElementRef;
  public uploaderProduct: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;
  public isLoadingUploadProduct: boolean = false;
  public fileUploadExcelProduct: File = null;

  constructor(private _productService: ProductService,
    private _router: Router,
    private _categoryService: CategoryService,
    private _toasterService: ToasterService,
    private renderer: Renderer) {
    this._initProductCreateEdit();
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
  }

  ngOnInit() {
    this.filterProducts();
    this._categoryService.getCategories()
      .subscribe(
      dataCategories => {
        let categoriesTemp = dataCategories;
        _.map(categoriesTemp, category => category['idCategory'] = category['idCategory'].replace('&', '%26'));
        this.categories = categoriesTemp;
        this.categoriesByModal = categoriesTemp;
      }, err => {
        this.funcError(err);
      });
  }

  // ===================== FUNCTION INIT PAGE ================================================================
  /**
   * @function filterProducts
   * @description support filter Product
   * @private
   */
  private filterProducts(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._productService.getProducts(this.dataFilter)
      .subscribe(
      data => {
        // set data and add temp fill select
        this.products = data.products.length === 0 ? [] : data.products.map(ProductService.toProduct);
        _.map(this.products, product => product.select = false);
        // binding paging
        if (data.paging) {
          this.paging = data.paging;
          this.paging.page = _setPage;
        }
      }, this.funcError);
  }

  // ================== FUNCTION SUPPORT FILTER ==================================================================
  /**
   * @method changePerPage
   * @description change per page view
   * @param {string} _perPage
   */
  public changePerPage(_perPage: number) {
    this.resetState();
    this.dataFilter.per_page = _perPage;
    this.filterProducts();
  }

  /**
   * @method getCurrentPage
   * @description get page when click button page
   * @param {string} _pageSelected
   */
  public getCurrentPage(_pageSelected: number) {
    this.resetState();
    this.dataFilter.page = _pageSelected;
    this.filterProducts(_pageSelected);
  }




  /**
   * @method searchProduct
   * @description search product
   */
  public searchProduct() {
    this.keySearch = this.keySearch.trim();
    this.dataFilter.ChuoiTimKiem = this.keySearch;
    if (!this.keySearch) {
      this.dataFilter.ChuoiTimKiem = '';
    }
    this.filterProducts();
  }

  /**
   * @method filterStateShow
   * @description filter by state product equal show (1)
   * @param event
   */
  public filterStateShow(event: any) {
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
    this.filterProducts();
  }

  /**
   * @method filterStateHide
   * @description filter by state product equal hide (2)
   * @param event
   */
  public filterStateHide(event: any) {
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
    this.filterProducts();
  }

  /**
   * @method filterAllowChange
   * @description set allow change equal 1
   * @param event
   */
  public filterAllowChange(event: any) {
    // set disable allowButton + selectAllProduct
    this.allowButton = false;
    this._selectAllProduct.nativeElement.checked = false;

    if (this.allowChangeItem.nativeElement.checked) {
      if (this.dontAllowChangeItem.nativeElement.checked)
        this.dataFilter.TrangThaiDoiDiem = '';
      else this.dataFilter.TrangThaiDoiDiem = '1';
    } else if (this.dontAllowChangeItem.nativeElement.checked) {
      this.dataFilter.TrangThaiDoiDiem = '2';
    } else {
      this.dataFilter.TrangThaiDoiDiem = '';
    }
    this.filterProducts();
  }

  /**
   * @method dontAllowChange
   * @description set allow change equal 2
   * @param event
   */
  public filterDontAllowChange(event: any) {
    // set disable allowButton + selectAllProduct
    this.allowButton = false;
    this._selectAllProduct.nativeElement.checked = false;

    if (this.dontAllowChangeItem.nativeElement.checked) {
      if (this.allowChangeItem.nativeElement.checked)
        this.dataFilter.TrangThaiDoiDiem = '';
      else this.dataFilter.TrangThaiDoiDiem = '2';
    } else if (this.allowChangeItem.nativeElement.checked) {
      this.dataFilter.TrangThaiDoiDiem = '1';
    } else {
      this.dataFilter.TrangThaiDoiDiem = '';
    }
    this.filterProducts();
  }

  /**
   * @method filterCate
   * @description filter category
   * @param event
   * @param {string} idCategory
   */
  public filterCate(event: any, idCategory: string) {
    this.resetState();

    // reset any more click filter category
    if (event.currentTarget.checked) {
      this.dataFilter.MaDanhMuc += `${idCategory},`;
    } else {
      this.dataFilter.MaDanhMuc = _.replace(this.dataFilter.MaDanhMuc, idCategory + ',', '');
    }
    this.filterProducts();
  }

  /**
   * @method sortNameProduct
   * @description sort product with field name
   */
  public sortNameProduct() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconViewPrice = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'TenSanPham';
    this.filterTypeName = !this.filterTypeName;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeName ? 'desc' : 'asc';
    this.setIconViewName = !this.filterTypeName ? 2 : 1;
    this.filterProducts(this.dataFilter.page);
  }

  /**
   * @method sortPriceProduct
   * @description sort product with field price
   */
  public sortPriceProduct() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconViewName = 0;
    this.resetState();  // reset state filter

    this.dataFilter.sort = 'GiaSanPham';
    this.filterTypePrice = !this.filterTypePrice;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypePrice ? 'desc' : 'asc';
    this.setIconViewPrice = !this.filterTypePrice ? 2 : 1;
    this.filterProducts(this.dataFilter.page);
  }

  // ============== FUNCTION BAR MANAGER =========================================================================
  /**
   * @method removeProductSelect
   * @description remove multiple product selected
   */
  public removeProductSelect() {
    if (!confirm('Bạn có muốn xóa các sản phẩm đã chọn!'))
      return;
    let idProducts: string = 'ids=';
    this.products.forEach(product => {
      if (product['select'] === true) {
        idProducts += product.idProduct;
        idProducts += ',';
      }
    });
    idProducts = idProducts.slice(0, idProducts.length - 1);
    this._productService.deleteMultipleProduct(idProducts)
      .subscribe(data => {
        this.allowButton = false;
        this.filterProducts();
        this._toasterService.pop('success', null, data.D);
      }, err => {
        this.funcError(err);
      });
  }

  /**
   * @method {hideProductSelect}
   * @description hid
   */
  public hideProductSelect() {
    let idProducts = [];
    this.products.forEach(product => {
      if (product['select'] === true) {
        idProducts.push(product.idProduct);
      }
    });
    const body = {
      products: idProducts,
      TrangThai: 2
    };
    this._productService.changeStateShowProduct(body)
      .subscribe(data => {
        this.filterProducts();
        this.allowButton = false;
        this._toasterService.pop('success', null, `${data.D}`);
      }, err => {
        this.funcError(err);
      });
  }

  /**
   * @method showProductSelect
   * @description switch state to => show multiple product selected
   */
  public showProductSelect() {
    let idProducts = [];
    this.products.forEach(product => {
      if (product['select'] === true) {
        idProducts.push(product.idProduct);
      }
    });
    const body = {
      products: idProducts,
      TrangThai: 1
    };
    this._productService.changeStateShowProduct(body)
      .subscribe(data => {
        console.log(data);
        this.filterProducts();
        this.allowButton = false;
        this._toasterService.pop('success', null, data.D);
      }, err => {
        this.funcError(err);
      });
  }

  // ============== FUNCTION SUPPORT TABLE =======================================================================
  public selectAllProduct(event: any) {
    if (event.currentTarget.checked === true) {
      _.map(this.products, product => product['select'] = true);
    } else {
      _.map(this.products, product => product['select'] = false);
    }
    this.allowButton = event.currentTarget.checked;
  }

  public selectProduct(event: any, _idProduct: string) {
    if (event.currentTarget.checked === true) {
      this.allowButton = true;
    } else {
      this._selectAllProduct.nativeElement.checked = false;
    }
    let productSelect = _.find(this.products, product => product.idProduct === _idProduct);
    productSelect.select = event.currentTarget.checked;
    const findSelect = _.findIndex(this.products, product => product.select === true);
    this.allowButton = findSelect !== -1;
  }

  /**
   * @method switchSingleState
   * @description switch stateShow is hide or show
   * @param _idProduct
   * @param _stateShow
   */
  public switchSingleState(_idProduct: string, _stateShow: number) {
    let idProducts = [_idProduct];
    _stateShow = _stateShow === 1 ? 2 : 1;
    const body = {
      products: idProducts,
      TrangThai: _stateShow
    };

    this._productService.changeStateShowProduct(body)
      .subscribe(data => {
        this.filterProducts(this.dataFilter.page);
        this._toasterService.pop('success', null, `${data.D}`);
      }, err => {
        this.funcError(err);
      }
      )
  }

  /**
   * @method deleteProduct
   * @description delete single product for column action
   * @param name
   * @param idProduct
   */
  public deleteProduct(name: string, idProduct: string) {
    if (!confirm(`Bạn có muốn xóa sản phẩm: ${name.toUpperCase()}!`))
      return;
    let idProducts: string = `ids=${idProduct}`;
    this._productService.deleteMultipleProduct(idProducts)
      .subscribe(data => {
        this.filterProducts(this.dataFilter.page);
        this._toasterService.pop('success', null, data.D);
      }, err => {
        this.funcError(err);
      });
  }

  // ================= UPLOAD PRODUCT ============================================================================
  /**
   * @method changeStateInfoMationUploadProduct
   * @description show or hiden infomation to upload product
   * @param event
   */
  public changeStateInfoMationUploadProduct(event: any) {
    let elementId: string = (event.target as Element).id;
    if (elementId.trim() === '') {
      return false;
    }
    this._stateShowInfoMationUploadProduct = !this._stateShowInfoMationUploadProduct;
  }

  /**
   * @method showModalUploadProduct
   * @description clear valiable and show modal
   */
  public showModalUploadProduct() {
    this._stateShowInfoMationUploadProduct = false;
    this.uploadProductModal.show();
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
   * @method onFileDropUploadProduct
   * @description onfile drop to box upload product
   * @param event
   */
  public onFileDropUploadProduct(event: any) {
    console.log(this.uploaderProduct);
    let fileQueue = this.uploaderProduct.queue;
    if (fileQueue.length > 1) {
      this.uploaderProduct.queue[0].remove();
    }
    let reg = /.+\.xlsx$|.+\.xls$/g;
    if (fileQueue.length === 1 && !reg.test(fileQueue[0].file.name)) {
      this.uploaderProduct.queue[0].remove();
      this._toasterService.pop('error', null, 'Định dạng file phải có đuôi .xls hoặc xlsx');
      return;
    }
    // set file excel upload
    this.fileUploadExcelProduct = this.uploaderProduct.queue[0]._file;
  }

  /**
   * @method chooseFileUpdateProduct
   * @description click to choose file to upload product
   * @param event
   */
  public chooseFileUpdateProduct(event: any) {

    let eventClick = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.elInputFileProduct.nativeElement, 'dispatchEvent', [eventClick]);
  }

  /**
   * @method uploadProduct
   * @description upload file product
   */
  public uploadProduct() {
    this.isLoadingUploadProduct = true;
    let timer = setTimeout(() => {
      this.isLoadingUploadProduct = false;
    }, 1000);
    if (this.uploaderProduct.queue.length <= 0) {
      this._toasterService.pop('error', null, 'Bạn cần chọn file để upload.');
      return;
    }
    let file = [];
    file.push({
      name: 'file',
      files: [this.fileUploadExcelProduct]
    });
    this._productService.createProductFromFile(file)
      .subscribe(data => {
        this._toasterService.pop('success', null,
          data.D);
        this.uploadProductModal.hide();
      }, this.funcError);
  }

  // ================ SUPPORT MODAL CREATE - EDIT PRODUCT =============================================================

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
  public changeUrlFileUploadAvatar(event: EventTarget) {
    let fileQueue = this.uploaderAvatar.queue;
    console.log(fileQueue);
    
    let reg = /.+\.png$|.+\.jpg$|.+\.jpeg$/g;
    if (fileQueue.length >= 1 && !reg.test(fileQueue[0].file.name) || fileQueue[0].file.size>100000 ) {
      this.uploaderAvatar.queue[0].remove();
      this._toasterService.pop('error', null, 'Định dạng file phải có đuôi .png hoặc .jpg hoặc jpeg');
      return;
    }


    // if (fileQueue.length > 1) {
    //   this.uploaderAvatar.queue[0].remove();
    // }

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
   * @param event
   */
  public chooseFileUpdateAvatar(event: any) {


    let fileQueueAvatar = this.uploaderAvatar.queue;
    this.fileUploadDescription = [];
    let reg = /.+\.png$|.+\.jpg$|.+\.jpeg$/g;


    let eventClick = new MouseEvent('click', { bubbles: true });
    for (let i = 0; i < fileQueueAvatar.length; i++) {
      if (!reg.test(fileQueueAvatar[i].file.name)) {
        this.uploaderAvatar.queue[i].remove();
        this._toasterService.pop('error', null, 'Định dạng file phải có đuôi .png hoặc .jpg hoặc jpeg');
        return;
      }
    }
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
    let fileQueueDescription = this.uploaderImageDescriptions.queue;
    this.fileUploadDescription = [];
    let self = this;
    let reg = /.+\.png$|.+\.jpg$|.+\.jpeg$/g;

    for (let i = 0; i < fileQueueDescription.length; i++) {
      if (!reg.test(fileQueueDescription[i].file.name) || fileQueueDescription[i].file.size>100000) {
        this.uploaderImageDescriptions.queue[i].remove();
        this._toasterService.pop('error', null, 'Định dạng file phải có đuôi .png hoặc .jpg hoặc jpeg');
        return;
      }

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

    let fileQueueDescription = this.uploaderImageDescriptions.queue;
    this.fileUploadDescription = [];
    let reg = /.+\.png$|.+\.jpg$|.+\.jpeg$/g;


    let eventClick = new MouseEvent('click', { bubbles: true });
    for (let i = 0; i < fileQueueDescription.length; i++) {
      if (!reg.test(fileQueueDescription[i].file.name)) {
        this.uploaderImageDescriptions.queue[i].remove();
        this._toasterService.pop('error', null, 'Định dạng file phải có đuôi .png hoặc .jpg hoặc jpeg');
        return;
      }
    }
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
    if (!this.product.imageDescriptions[iImage]) {
      return;
    }
    this.product.imageDescriptions.splice(iImage, 1);
  }

  /**
   * @method onScroll
   * @description Listener event scroll perant model
   * @param event
   */
  public onScroll(event) {
    let descriptionTop = this.elModalDescription.nativeElement.offsetTop;
    let productNameTop = this.elProductName.nativeElement.offsetTop;
    let productAvatarTop = this.elProductAvatar.nativeElement.offsetTop;
    let modalBodyTop = this.elModalBody.nativeElement.scrollTop;
    let _elMobile;
    if (!this._isProductKaraoke) {
      _elMobile = this.elMobileDetail;
    } else {
      _elMobile = this.elMobileKaraoke;
    }
    if (descriptionTop > modalBodyTop - 30 && descriptionTop < modalBodyTop + 30) {
      this.setTop = _elMobile.elMobileEntry.nativeElement.offsetTop;
    }
    if (productNameTop > modalBodyTop - 20 && productNameTop < modalBodyTop + 20) {
      this.setTop = _elMobile.elMobileName.nativeElement.offsetTop;
    }
    if (productAvatarTop > modalBodyTop - 20 && productAvatarTop < modalBodyTop + 20) {
      this.setTop = _elMobile.elMobileName.nativeElement.offsetTop;
    }
  }

  /**
   * @method showEditProduct
   * @description edit preview product
   */
  public showEditProduct(_idProduct: string) {
    this.titleModalProduct.nativeElement.innerText = 'SỬA SẢN PHẨM';
    this.imagesAvatar = [];
    this.fileUploadAvatar = null;
    this.fileUploadDescription = null;
    this.uploaderImageDescriptions = new FileUploader({ url: '' });
    this.uploaderAvatar = new FileUploader({ url: '' });

    for (let i = 0; i < this.categoriesByModal.length; i++) {
      this.categoriesByModal[i]['select'] = false;
    }
    this.checkActionModal = false; // <=> edit product
    this._productService.getProductInformation(_idProduct)
      .subscribe(data => {
        this.product = [data['products']].map(ProductService.toProduct)[0];
        this.product.textSearch = !this.product.textSearch ? '' : this.product.textSearch;
        console.log(this.product);
        // set value category select
        for (let i = 0; i < this.categoriesByModal.length; i++) {
          if (this.product.idCategory.indexOf(this.categoriesByModal[i].idCategory) !== -1)
            this.categoriesByModal[i]['select'] = true;
        }
        // this.tags = [{value: 0, display: 'THOITRANG'}];
        // this.tags.push({value:})
        this.modalCreateEditProduct.show();
      }, err => {
        this.funcError(err);
      });
  }

  /**
   * @method showCreateProduct
   * @description event click create new product
   * @param  event event
   */
  public showCreateProduct(event: any) {
    this.titleModalProduct.nativeElement.innerText = 'TẠO SẢN PHẨM';
    this.checkActionModal = true; // <=> create product
    this.fileUploadAvatar = null;
    this.fileUploadDescription = null;
    this.uploaderImageDescriptions = new FileUploader({ url: '' });
    this.uploaderAvatar = new FileUploader({ url: '' });
    this._initProductCreateEdit();
    this.imagesAvatar = [];
    // init selected category by modal = empty

    this.modalCreateEditProduct.show();
  }

  public switchState(event: any) {
    this.product.state = event.currentTarget.checked ? 1 : 2;
  }

  /**
   * @method saveProduct
   * @description update or create new product
   */
  public saveProduct() {
    if (this.checkActionModal) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  /**
   * @method createNewProduct
   * @description create new product
   * @todo cannot create product with multiple categories
   */
  public createProduct() {
    this.isLoadingCreateProduct = true;
    // validate
    if (this.tags.length > 0) {
      this.tags.forEach(tag => {
        this.product.textSearch += tag.display + ';';
      });
      this.product.textSearch.substring(0, this.product.textSearch.length - 1);
    }

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
    this._productService.createProduct(this.product, file)
      .subscribe((data) => {
        this.isLoadingCreateProduct = false;
        this._toasterService.pop('success', null, data.D);
        this.filterProducts();
        this.modalCreateEditProduct.hide();
      }, err => {
        this.isLoadingCreateProduct = false;
        this.funcError(err);
      });
  }

  /**
   * @method updateProduct
   * @todo cannot update with multiple categories
   * @todo confirm delete multiple image
   */
  public updateProduct() {
    let self = this;
    let productUpdate = self.product;
    Reflect.deleteProperty(productUpdate, 'avatar');
    Reflect.deleteProperty(productUpdate, 'imageDescriptions');

    if (this.tags.length > 0) {
      this.tags.forEach(tag => {
        this.product.textSearch += tag.display + ';';
      });
      this.product.textSearch.substring(0, this.product.textSearch.length - 1);
    }
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
    file = file.length > 0 ? file : null;
    this._productService.updateProduct(productUpdate, file)
      .subscribe((data) => {
        this.isLoadingCreateProduct = false;
        this._toasterService.pop('success', null, data.D);
        this.filterProducts();
        this.modalCreateEditProduct.hide();
      }, err => {
        this.isLoadingCreateProduct = false;
        this.funcError(err);
      });
  }

  /**
   * @method selectProductCateByModal
   * @description select product from checkbox input and push product idCategory
   * @param event
   * @param _idCategory
   */
  public selectProductCateByModal(event: any, _idCategory: string) {
    // reset any more click filter category
    if (event.currentTarget.checked) {
      if (this.product.idCategory.indexOf(_idCategory) === -1)
        this.product.idCategory += `${_idCategory};`;
    } else {
      this.product.idCategory = _.replace(this.dataFilter.MaDanhMuc, _idCategory + ';', '');
    }
    let cateSelect = _.find(this.categoriesByModal, item => item.idCategory === _idCategory);
    cateSelect.select = true;
  }

  // ================ FUNCTION COMMON SUPPORT  ===================================================================
  /**
   * @method _initProductCreateEdit
   * @description init product to create and edit
   */
  private _initProductCreateEdit() {
    this.product = {
      idProduct: '',
      name: '',
      price: 1,
      idCategory: '',
      codeProduct: '',
      avatar: '',
      productPoint: 0,
      statusChangePoint: 2,
      imageDescriptions: null,
      state: 1, // status show
      description: '',
      textSearch: ''
    }
  }

  public statusChangePointModal(value: string) {
    this.product.statusChangePoint = parseInt(value, 10);
  }

  private resetState() {
    this.allowButton = false;
    this._selectAllProduct.nativeElement.checked = false;
  }

  public getFileExample() {
    event.preventDefault();
    let url = this._productService.fileExample() + '/products/excel/sample';
    let link = document.createElement('a');
    if (typeof link.download === 'string') {
      document.body.appendChild(link); // Firefox requires the link to be in the body
      link.download = 'MauFileExcelNhapLieuSanPham.xls';
      link.href = url;
      link.click();
      document.body.removeChild(link); // remove the link when done
    } else {
      console.log('err');
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
