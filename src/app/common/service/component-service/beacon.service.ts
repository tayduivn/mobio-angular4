/**
 * @module beacon-service
 * @author ManhNV
 * @description config beacon service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs';
import {UtilService} from '../common-service/util.service';
import {ResponseCustom} from '../../model/response-custom.model';
import {AuthenticateService} from '../common-service/authenticate.service';
import {Beacon, Beacons} from '../../../customer-care/config/beacon/beacon.model';

@Injectable()
export class BeaconService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}/beacon/config`;
  }

  /**
   * @type get
   * @method getBeacons
   * @description get list beacon
   * @returns {Observable<Shop>}
   */
  public getBeacons(dataFilter: any): Observable<Beacons> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}${queryString}`);
  }

  /**
   * @type get
   * @method getBeaconDetail
   * @param _idShop
   * @returns {Observable<Beacon>}
   */
  public getBeaconDetail(_idShop: string): Observable<Beacon> {
    return this._apiRequest.get(`${this.basePath}/${_idShop}`);
  }

  /**
   * @method updateBeaconConfig
   * @description update detail beacon config
   * @param {Beacon} beaconConfig
   * @returns {Observable<ResponseCustom>}
   */
  public updateBeaconConfig(beaconConfig: Beacon): Observable<ResponseCustom> {
    let bodyMap = {
      KieuChucNang: beaconConfig.functionalType,
      TenBeacon: beaconConfig.nameBeacon,
      CuaHangID: beaconConfig.idShop
    };
    return this._apiRequest.patch(`${this.basePath}/${beaconConfig.beaconTheoPartnerID}`, bodyMap);
  }

  /**
   * @method toBeacon
   * @description mapping beacon model
   * @param r
   * @returns {Beacon}
   */
  public static toBeacon(r: any): Beacon {
    const beacon: Beacon = {
      beaconTheoPartnerID: r['BeaconTheoPartnerID'],
      idShop: r['CuaHangID'],
      functionalType: r['KieuChucNang'],
      macAddress: r['DiaChiMac'],
      nameBeacon: r['TenBeacon'],
      shopAddress: r['DiaChiCuaHang']
    };
    console.log(beacon);
    return beacon;
  }
}
