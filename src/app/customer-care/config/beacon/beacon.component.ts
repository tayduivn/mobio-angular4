import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {Paging} from '../../../common/model/paging';
import {BeaconService} from '../../../common/service/component-service/beacon.service';
import {Observable} from 'rxjs/Observable';
import {ToasterService} from 'angular2-toaster';
import {Beacon} from './beacon.model';
import {Router} from '@angular/router';
import {ShopService} from '../../../common/service/component-service/shop.service';
import {Shop} from '../../content/shop/shop.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon-styles/beacon.component.scss', './beacon-styles/modal.component.scss']
})
export class BeaconComponent implements OnInit {
  @ViewChild('largeModal') public modalExecuteBeacon: ModalDirective;

  // common variable -----------------------------------------------------
  public beacons: Beacon[];
  public beacon: Beacon;
  public isLoadingBeacon: boolean = false;

  // data filter beacon --------------------------------------------------
  public dataFilter = {
    ChuoiTimKiem: '',
    sort: '',
    order: '',
    page: 1, // default page select is 1
    per_page: 10 // default get 10 item
  };
  public paging: Paging;
  public filterNameBeacon: boolean = true;
  public filterMacAddress: boolean = true;
  public filterShopAddress: boolean = true;
  public setIconNameBeacon: number = 0;
  public setIconMacAddress: number = 0;
  public setIconShopAddress: number = 0;

  // ------ config module angular- multiple select -----------------------------
  public dropDownListShop = [];
  public selectedShop = [];
  public dropDownSettings = {};
  public shops: Shop[];
  // set selected
  public selectedIdentity = false;
  public selectedDonate = false;

  constructor(private _beaconService: BeaconService,
              private _shopService: ShopService,
              private _router: Router,
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
      text: 'Chọn cửa hàng',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }

  ngOnInit() {
    this._initDataBeacon();
    this.filterBeacons();
  }

  /**
   * @function filterBeacons
   * @description support filter Shop
   * @private
   */
  private filterBeacons(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._beaconService.getBeacons(this.dataFilter)
      .subscribe(
        data => {
          // set data and add temp field select
          this.beacons = data.beacon.length === 0 ? [] : data.beacon.map(BeaconService.toBeacon);
          this.paging = data.paging;
          this.paging.page = _setPage;
        }, this.funcError);
    this._shopService.getShops({page: -1})
      .subscribe(data => {
        this.shops = data.stores.length === 0 ? [] : data.stores.map(ShopService.toShop);
        // _.map(this.shops, shop => shop.select = false);
        this.dropDownListShop = this.shops.map(shop => {
          return {
            id: shop.idShop,
            itemName: shop.address
          }
        });
        console.log(this.dropDownListShop);
      }, this.funcError);
  }

  /**
   * @method getCurrentPage
   * @description get current page selected
   * @param {number} _pageSelected
   */
  public getCurrentPage(_pageSelected: number) {
    this.dataFilter.page = _pageSelected;
    this.filterBeacons(_pageSelected);
  }

  /**
   * @method changePerPage
   * @param {number} _perPage
   */
  public changePerPage(_perPage: number) {
    this.dataFilter.per_page = _perPage;
    this.filterBeacons();
  }

  // ========== FUNCTION EDIT MODEL =========================================

  /**
   * @method showEditBeacon
   * @description show modal update beacon
   */
  public showEditBeacon(_idShop: string) {
    // reset data beacon + reset selected beacon
    this._initDataBeacon();
    _.map(this.shops, shop => shop.select = false);
    // get detail data
    this._beaconService.getBeaconDetail(_idShop)
      .subscribe(data => {
        this.beacon = [data['config']].map(BeaconService.toBeacon)[0];
        const shopSelected = _.find(this.dropDownListShop, shop => shop.id === this.beacon.idShop);
        // set selected store ( shop )
        if (!_.isNil(shopSelected)) this.selectedShop = [shopSelected];

        // set selected checkbox
        if (this.beacon.functionalType.indexOf(1) !== -1) this.selectedIdentity = true;
        if (this.beacon.functionalType.indexOf(2) !== -1) this.selectedDonate = true;
        this.modalExecuteBeacon.show();
      }, this.funcError);
  }

  /**
   * @method onShopSelect
   * @param _shop
   */
  public onShopSelect(_shop: any) {
    this.beacon.idShop = _shop['id'];
  }

  /**
   * @method onShopDeSelect
   * @description deselected shop
   */
  public onShopDeSelect() {
    // set default idShop
    this.beacon.idShop = '';
  }

  public changeIdentify(event: any) {
    this.selectedIdentity = event.currentTarget.checked;
  }

  public changeDonate(event: any) {
    this.selectedDonate = event.currentTarget.checked;
  }

  /**
   * @method updateBeacon
   * @description update detail beacon
   */
  public saveBeacon() {
    const reg = /^([a-zA-Z0-9]+)$/g;
    if (!reg.test(this.beacon.nameBeacon)) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null,
        'Tên beacon bắt buộc tiếng việt không dấu, không dấu cách, không ký tự đặc biệt');
      return;
    }
    if (this.selectedShop.length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Vui lòng chọn chọn 1 cửa hàng trước khi lưu trữ!');
      return;
    }
    if (!this.selectedIdentity && !this.selectedDonate) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Vui lòng chọn mục đích sử dụng Beacon của bạn!');
      return;
    }
    this.isLoadingBeacon = true;
    let functionTypeTemp = [];    
    if (this.selectedIdentity) functionTypeTemp.push(1);
    if (this.selectedDonate) functionTypeTemp.push(2);
    this.beacon.functionalType = functionTypeTemp;
    this._beaconService.updateBeaconConfig(this.beacon)
      .subscribe(data => {
        this.isLoadingBeacon = false;
        this._toasterService.clear();
        this._toasterService.pop('success', null, data.D);
        this.filterBeacons(this.paging.page);
        this.modalExecuteBeacon.hide();
      }, err => {
        this.isLoadingBeacon = false;
        this.funcError(err);
      });
  }

  /**
   * @method _initDataBeacon
   * @description init data for beacon
   * @private
   */
  public _initDataBeacon() {
    this.beacon = {
      beaconTheoPartnerID: '',
      idShop: '',
      functionalType: [],
      macAddress: '',
      nameBeacon: '',
      shopAddress: ''
    };
    this.selectedIdentity = false;
    this.selectedDonate = false;
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
