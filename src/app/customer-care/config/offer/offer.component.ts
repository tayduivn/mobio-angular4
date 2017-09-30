import { Component, OnInit } from '@angular/core';
import {CrudLevel, Offer, OfferLevel} from './offer.model';
import {OfferService} from '../../../common/service/component-service/offer.service';
import {VoucherService} from '../../../common/service/component-service/voucher.service';
import {Voucher} from '../../content/voucher/voucher.model';
import {Observable} from 'rxjs/Observable';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';

@Component({
  selector: 'app-voucher-mpoint',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  offerMethods: any[] = [
    {
      id: 1,
      name: 'Giảm giá trên giá trị hóa đơn'
    },
    {
      id: 2,
      name: 'Tặng điểm trên giá trị hóa đơn'
    },
    {
      id: 3,
      name: 'Khác'
    }
  ];

  offer: Offer;
  currentOfferMethod: any;
  vouchers: Voucher[] = [];

  constructor(private _offerService: OfferService, private _voucherService: VoucherService,
              private _toasterService: ToasterService, private _router: Router) { }

  ngOnInit() {
    this.offer = {
      reward_type: 1,
      levels: []
    };
    this.currentOfferMethod = this.offerMethods[0];
    this.getRewardConfig();
    // get list voucher
    this._voucherService.getVouchers('')
      .subscribe(data => {
        this.vouchers = data.vouchers.map(VoucherService.toVoucher);
      }, err => this.funcError);
  }

  switchUpdateScreen: boolean = false;

  getRewardConfig() {
    this._offerService.getReward()
      .subscribe(data => {
        console.dir(data);
        if (data.config) {
          this.offer = OfferService.toOffer(data.config['purchase-reward']);
          this.currentOfferMethod = this.offerMethods.find(i => i.id === this.offer.reward_type);
        } else {
          this.switchUpdateScreen = !this.switchUpdateScreen;
          this.addLevel();
        }
      }, err => this.funcError);
  }

  // ==========   FILTER LIST ========================
  setVoucherForCreatedReward(event: any, level: OfferLevel) {
    if (event.target.value !== '0') {
      level.voucherID = event.target.value;
    }
  }
  // =========    UPDATE OFFER  =======================
  changeOfferMethod(event: any, offerMethod: any) {
    if (event.target.checked) {
      this.offer.levels = this.offer.levels.filter(item => item.id !== '');
      this.currentOfferMethod = offerMethod;
      if (this.offer.reward_type === offerMethod.id) {
        this.offer.levels.forEach(i => i.deleted = false);
      } else {
        this.offer.levels.forEach(i => i.deleted = true);
      }
      if (this.offer.levels.length === 0 || this.offer.levels.filter(i => !i.deleted).length === 0) {
        this.addLevel();
      }
    }
  }

  configFirst() {
    // user start config purchase reward
      this._offerService.createReward(this.offer)
        .subscribe(result => {
          this._toasterService.pop('success', '', result['D']);
          this.getRewardConfig();
          this.switchUpdateScreen = !this.switchUpdateScreen;
        }, this.funcError);

  }

  saveOffer() {
    for (let level of this.offer.levels) {
      if (this.offer.levels.find(item => {
          return (level.priceFrom === item.priceFrom) ||
            (level.priceFrom > item.priceFrom && level.priceFrom < item.priceTo) ||
            (level.priceFrom === item.priceTo)
        })) {
        this._toasterService.pop('warning', '', 'Giá từ ' + level.priceFrom + ' đến ' + level.priceTo + ' không hợp lệ!');
        return;
      }
    }
    // user change method reward
    if (this.offer.reward_type !== this.currentOfferMethod.id) {
      let offer: Offer = {reward_type: this.currentOfferMethod.id};
      this._offerService.changeReward(offer)
        .subscribe(result => {
          if (this.offer.levels.filter(item => item.id !== '' && !item.deleted).length === 0) {
            this.configFirst();
          } else {
            this._toasterService.pop('success', '', result['D']);
            this.switchUpdateScreen = !this.switchUpdateScreen;
          }
        }, this.funcError);
    } else if (this.offer.levels.filter(item => item.id !== '' && !item.deleted).length === 0) {
        this.configFirst();
    } else {
      // user add or update level reward
      let mergeLevel: CrudLevel = {
        insertLevel: [],
        updateLevel: [],
        deleteLevel: [],
      };
      mergeLevel.insertLevel = this.offer.levels.filter(item => item.id === '' && !item.deleted);
      mergeLevel.deleteLevel = this.offer.levels.filter(item => item.id !== '' && item.deleted).map(item => item.id);
      mergeLevel.updateLevel = this.offer.levels.filter(item => { return item.id !== '' && !item.deleted; });
      this._offerService.crudLevelReward(mergeLevel)
        .subscribe(result => {
          this.getRewardConfig();
          this.switchUpdateScreen = !this.switchUpdateScreen;
        }, this.funcError);
    }
  }

  deleteLevel(level: OfferLevel) {
    if (level.id === '') {
      this.offer.levels.splice(this.offer.levels.indexOf(level), 1);
    } else {
      level.deleted = true;
    }
  }

  addLevel() {
    let level = {
      id: '',
      typeOffer: 1,
      createdAccount: '',
      updatedAccount: '',
      createdTime: '',
      updatedTime: '',
      rateReward: 0,
      priceFrom: 0,
      priceTo: 0,
      categoryName: '',
      xPoint: 0,
      pointReward: 0,
      typeSelectVoucher: 0,
      voucherID: '',
      numberVoucher: 0,
      deleted: false
    };
    this.offer.levels.push(level);
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
