/**
 * @author ManhNV
 * @description setting feature reservation
 * @version 1.0.0
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import * as _ from 'lodash';
import {ShopService} from '../../common/service/component-service/shop.service';
import {ReservationService} from '../../common/service/component-service/reservation.service';
import {Paging} from '../../common/model/paging';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {Reservation} from './reservation.model';
import {Shop} from '../content/shop/shop.model';

@Component({
  selector: 'reservation-component',
  templateUrl: './reservation.component.html',
  styleUrls: [
    '../content/product/product-styles/modal.component.scss',
    '../content/product/product-styles/product.component.scss',
    './reservation.component.scss'
  ]
})
export class ReservationComponent implements OnInit {
  @ViewChild('reservationModal') public reservationModal: ModalDirective;

  // data common ----------------------------------
  public reservations: Reservation[];
  public reservation: Reservation;
  public paging: Paging;
  public allowButton: boolean = false;

  // data menu left -------------------------------
  public timeRangerOrder: string = '';
  public timeRangerUtil: string = '';

  // data filter ----------------------------------
  public dataFilter = {
    page: 1, // default page select is 1
    per_page: 5, // default get 5 item
    order_since: '',
    order_until: '',
    reservation_since: '',
    reservation_until: '',
    sort: '',
    status: '',
    order: '',
  };
  public keySearch: string = '';

  // data modal update reservation ----------------
  public optionsEndDisplayDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY'
  };

  // ------ config module angular- multiple select -----------------------------
  public dropDownListShop = [];
  public selectedShop = [];
  public dropDownSettings = {};

  constructor(private _reservationService: ReservationService,
              private _toasterService: ToasterService,
              private _shopService: ShopService,
              private _router: Router) {
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
    this.dropDownSettings = {
      singleSelection: true,
      text: 'Chọn địa điểm muốn chuyển đổi',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.initData();
  }

  ngOnInit() {
    this.filterReservation();
    // get list shop address
    this._shopService.getShops({page: -1})
      .subscribe(dataShops => {
        let shops: Shop[] = dataShops.stores.length === 0 ? [] : dataShops.stores.map(ShopService.toShop);
        this.dropDownListShop = shops.map(shop => {
          return {
            id: shop.idShop,
            itemName: shop.address
          }
        });
      });
  }

  /**
   * @method filterReservation
   * @description filter reservation detail
   * @param {number} _setPage
   */
  public filterReservation(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._reservationService.getReservations(this.dataFilter)
      .subscribe(
        data => {
          // set data and add temp field select
          this.reservations = data.bookings;
          _.map(this.reservations, reservation => reservation.select = false);
          if (data.paging) {
            this.paging = data.paging;
            this.paging.page = _setPage;
          }
        }, this.funcError);
  }

  /**
   * @method getCurrentPage
   * @description get page selected
   * @param {number} _pageSelected
   */
  public getCurrentPage(_pageSelected: number) {
    this.dataFilter.page = _pageSelected;
    this.filterReservation(_pageSelected);
  }

  /**
   * @method changePerPage
   * @description change item get page
   * @param {number} _perPage
   */
  public changePerPage(_perPage: number) {
    this.dataFilter.per_page = _perPage;
    this.filterReservation();
  }

  // ====== SUB FUNCTION BAR =====================
  public buttonSearch() {

  }

  public acceptMultiReservation() {

  }

  public rejectMultiReservation() {

  }

  // ====== SUB FUNCTION FILTER ==================================================================
  /**
   * @method filterStatus
   * @description filter status value
   * @param {number} status
   */
  public filterStatus(status: number) {
    this.resetState();
    this.dataFilter.status = status.toString();
    this.filterReservation();
  }

  /**
   * @method filterTimeOrder
   * @description filter with time ranger register
   */
  public filterTimeOrder(event) {
    let timeRanger = event.event.currentTarget.value.replace(/\//g, '-');
    this.dataFilter.order_since = `${timeRanger.substring(6, 10)}${timeRanger.substring(0, 2)}${timeRanger.substring(3, 5)}`;
    this.dataFilter.order_until = `${timeRanger.substring(19, 23)}${timeRanger.substring(13, 15)}${timeRanger.substring(16, 18)}`;
    this.filterReservation();
    console.log(event.event.currentTarget.value);
  }

  /**
   * @method filterTimeUtil
   * @description filter with time ranger approve
   */
  public filterTimeUtil(event) {
    let timeRanger = event.event.currentTarget.value.replace(/\//g, '-');
    this.dataFilter.reservation_since = `${timeRanger.substring(6, 10)}${timeRanger.substring(0, 2)}${timeRanger.substring(3, 5)}`;
    this.dataFilter.reservation_until = `${timeRanger.substring(19, 23)}${timeRanger.substring(13, 15)}${timeRanger.substring(16, 18)}`;
    this.filterReservation();
  }

  // ===== FUNCTION TABLE =====================================================================
  public editReservation(idReservation: string) {
    this.initData();
    // merge data
    let reservationSelected = this.reservations.find(reservation => reservation.id === idReservation);
    _.merge(this.reservation, reservationSelected);

    // push data in multiple select
    let shopAddressSelected = this.dropDownListShop.find(shop => shop.idShop === this.reservation.venue.id);
    if (shopAddressSelected)
      this.selectedShop.push(shopAddressSelected);
    this.reservationModal.show();
  }

  /**
   * @method acceptReservation
   * @description accept reservation information
   * @param {string} _idReservation
   */
  public acceptReservation(_idReservation: string) {
    this._reservationService.acceptReservation(_idReservation)
      .subscribe(data => {
        this.resetState();
        this.filterReservation(this.dataFilter.page);
        this._toasterService.pop('success', null, `Duyệt yêu cầu thành công`);
      }, this.funcError);
  }

  /**
   * @method rejectReservation
   * @description reject reservation information
   * @param {string} _idReservation
   */
  public rejectReservation(_idReservation: string) {
    this._reservationService.acceptReservation(_idReservation)
      .subscribe(data => {
        this.resetState();
        this.filterReservation(this.dataFilter.page);
        this._toasterService.pop('success', null, `Hủy yêu cầu thành công`);
      }, this.funcError);
  }

  // function support modal update reservation ================================================
  /**
   * @method hideModalUpdate
   */
  public hideModalUpdate() {
    this.reservationModal.hide();
  }

  /**
   * @method onShopSelect
   */
  public onShopSelect() {

  }

  /**
   * @method onShopDeSelect
   */
  public onShopDeSelect() {

  }

  /**
   * @method updateReservation
   * @description update reservation info
   * @param {string} idReservation
   */
  public updateReservation(idReservation: string) {
    const phonePattern = /\+?\d{10,15}/g; // bo loc filter
    const numberPepople = /\d+/g;
    if (this.reservation.detail.time.toString().trim().length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Địa chỉ và thời gian đặt không được phép để trống!');
      return;
    }
    if (!phonePattern.test(this.reservation.detail.contact_phone)) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Số điện thoại không hợp lệ!');
      return;
    }
    if (!numberPepople.test(this.reservation.detail.number_of_peoples.toString())) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Số người không hợp lệ!');
      return;
    }
    if (this.selectedShop.length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Vui lòng lựa chọn ít nhất một địa chỉ!');
      return;
    }
    let bodyMap = {
      booking: {
        venue: {
          id: this.selectedShop[0].id
        },
        detail: this.reservation.detail
      }
    };

    bodyMap.booking.venue = _.omitBy(bodyMap.booking.venue, _.isNil);
    bodyMap.booking.detail = _.omitBy(bodyMap.booking.detail, _.isNil);
    // if (bodyMap.booking.venue.id === '')
    // Reflect.deleteProperty(bodyMap.booking, 'venue');
    this._reservationService.updateReservation(bodyMap, idReservation)
      .subscribe(data => {
        this._toasterService.clear();
        this._toasterService.pop('success', null, data.D);
        this.reservationModal.hide();
        this.filterReservation(this.paging.page);
      }, this.funcError);
  }

  // =================== FUNCTION COMMON ======================================================
  private resetState() {
    this.allowButton = false;
  }

  private initData() {
    this.reservation = {
      id: '',
      customer: {
        id: '',
        name: '',
        avatar: ''
      },
      status: 1,
      venue: {
        id: '',
        name: ''
      },
      detail: {
        number_of_peoples: 0,
        note: '',
        contact_name: '',
        contact_phone: '',
        time: ''
      },
      created_time: ''
    };
    this.selectedShop = [];
  }

  /**
   * @function funcError
   * @description function authen error
   * @param err
   */
  funcError = (err) => {
    this._toasterService.clear();
    this._toasterService.pop('error', null, err.D);
    if (err.status === 401) {
      Observable.timer(2000)
        .subscribe(() => {
          this._router['navigate'](['login']);
        });
    }
  };
}
