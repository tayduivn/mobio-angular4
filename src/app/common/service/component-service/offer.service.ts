import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {CrudLevel, Offer} from '../../../customer-care/config/offer/offer.model';
import {AuthenticateService} from '../common-service/authenticate.service';
import {VoucherService} from './voucher.service';

@Injectable()
export class OfferService {

  public basePath: string;

  constructor(private _apiRequestService: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  getReward() {
    return this._apiRequestService.get(`${this.basePath}/purchase/config/reward`);
  }

  createReward(offer: Offer) {
    let bodyData = {
      reward_type: offer.reward_type,
      levels: offer.levels.filter(item => !item.deleted).map(item => {
          let requestParam =  {};
          requestParam['GiaTu'] = item.priceFrom;
          requestParam['GiaDen'] = item.priceTo;
          if (item.rateReward !== 0)requestParam['PhanTramGiamGia'] = item.rateReward;
          if (item.voucherID !== '') requestParam['VoucherID'] = item.voucherID;
          if (item.voucherID !== '' && item.numberVoucher !== 0) requestParam['SoLuotTich'] = item.numberVoucher;
          return requestParam;
      })
    };
    return this._apiRequestService.post(`${this.basePath}/purchase/config/reward`, bodyData);
  }

  changeReward(offer: Offer) {
    return this._apiRequestService.patch(`${this.basePath}/purchase/config/reward/change`, offer);
  }

  crudLevelReward(offerCrud: CrudLevel) {
    let bodyData = {
        actions: [
          {
            value: 'insert',
            levels: offerCrud.insertLevel.map(item => {
              let requestParam =  {};
              requestParam['GiaTu'] = item.priceFrom;
              requestParam['GiaDen'] = item.priceTo;
              if (item.rateReward !== 0)requestParam['PhanTramGiamGia'] = item.rateReward;
              if (item.voucherID !== '') requestParam['VoucherID'] = item.voucherID;
              if (item.numberVoucher !== 0) requestParam['SoLuotTich'] = item.numberVoucher;
              return requestParam;
            })
          },
          {
            value: 'update',
            levels: offerCrud.updateLevel.map(item => {
              let requestParam =  {};
              requestParam['DanhMucTichDiemNCCID'] = item.id;
              requestParam['GiaTu'] = item.priceFrom;
              requestParam['GiaDen'] = item.priceTo;
              if (item.rateReward !== 0)requestParam['PhanTramGiamGia'] = item.rateReward;
              if (item.voucherID !== '') requestParam['VoucherID'] = item.voucherID;
              if (item.numberVoucher !== 0) requestParam['SoLuotTich'] = item.numberVoucher;
              return requestParam;
            })
          },
          {
            value: 'delete',
            levels: offerCrud.deleteLevel
          }
        ]
    };
    return this._apiRequestService.patch(`${this.basePath}/purchase/config/reward`, bodyData);
  }

  public static toOffer(r: any): Offer {
    return {
      levels: !r['levels'] ? [] : r['levels'].map(item => {
        return {
          id: item['DanhMucTichDiemNCCID'],
          typeOffer: item['LoaiTichDiem'],
          createdAccount: item['TaiKhoanTao'],
          updatedAccount: item['TaiKhoanCapNhat'],
          createdTime: item['ThoiDiemTao'],
          updatedTime: item['ThoiDiemCapNhat'],
          rateReward: item['PhanTramGiamGia'],
          priceFrom: item['GiaTu'],
          priceTo: item['GiaDen'],
          categoryName: item['TenDanhMuc'],
          xPoint: item['DiemXpoint'],
          pointReward: item['DiemThuong'],
          typeSelectVoucher: item['KieuChonVoucher'],
          voucher: item['voucher'] ? VoucherService.toVoucher(item['voucher']) : item['voucher'],
          voucherID: item['voucher'] ? VoucherService.toVoucher(item['voucher']).idVoucher : '',
          numberVoucher: item['voucher'] && item['voucher']['SoLanTich'] ? item['voucher']['SoLanTich'] : 0
        }
      }),
      reward_type: r['reward_type']
    };
  }
}
