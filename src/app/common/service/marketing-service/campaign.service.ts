/**
 * @module marketing-service
 * @class campaign
 * @author ManhNV
 * @description config campaign service in marketing
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {AuthenticateService} from '../common-service/authenticate.service';
import {Observable} from 'rxjs/Observable';
import {Campaign} from '../../../marketing/marketing.model';
import {ResponseCustom} from '../../model/response-custom.model';
import {UtilService} from '../common-service/util.service';

@Injectable()
export class CampaignService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}/campaigns`;
  }

  /**
   * @method getCampaigns
   * @description get all campaigns not paging
   * @returns {Observable<Campaign>}
   */
  public getCampaigns(): Observable<Campaign[]> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}`, {})
        .subscribe(
          data => observer.next(data['campaigns']),
          err => observer.error(err)
        );
    });
  }

  /**
   * @method getCampaignDetail
   * @description get detail campaign
   * @param {string} campaign_id
   * @returns {Observable<Campaign>}
   */
  public getCampaignDetail(campaign_id: string): Observable<Campaign> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/${campaign_id}`)
        .subscribe(
          data => observer.next(data['campaign']),
          error => observer.error(error)
        );
    });
  }

  /**
   * @method deleteCampaign
   * @param params
   * @returns {Observable<ResponseCustom>}
   */
  public deleteCampaign(params: any): Observable<ResponseCustom> {
    const queryString = UtilService.encodeParams(params);
    return this._apiRequest.delete(`${this.basePath}${queryString}`);
  }

  // todo createCampaign
  // public createCampaign(): Observable<ResponseCustom> {
  // return this._apiRequest.post()
  // }
}
