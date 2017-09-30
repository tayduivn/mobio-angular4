/**
 * @module marketing-service
 * @class action
 * @author ManhNV
 * @description config marketing service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {AuthenticateService} from '../common-service/authenticate.service';
import {Observable} from 'rxjs/Observable';
// import {UtilService} from '../common-service/util.service';
import {ResponseActionMarketing} from '../../../marketing/marketing.model';

@Injectable()
export class ActionService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}/campaigns`;
  }

  // ===== ACTION SERVICE =======================================================
  /**
   * @method disableCampaign
   * @param {string} campaign_id
   * @returns {Observable<ResponseActionMarketing>}
   */
  public disableCampaign(campaign_id: string): Observable<ResponseActionMarketing> {
    return this._apiRequest.post(`${this.basePath}/${campaign_id}/actions/off`, {});
  }

  /**
   * @method enableCampaign
   * @param {string} campaign_id
   * @returns {Observable<ResponseActionMarketing>}
   */
  public enableCampaign(campaign_id: string): Observable<ResponseActionMarketing> {
    return this._apiRequest.post(`${this.basePath}/${campaign_id}/actions/on`, {});
  }

  /**
   * @method pauseCampaign
   * @param {string} campaign_id
   * @returns {Observable<ResponseActionMarketing>}
   */
  public pauseCampaign(campaign_id: string): Observable<ResponseActionMarketing> {
    return this._apiRequest.post(`${this.basePath}/${campaign_id}/actions/pause`, {});
  }

  /**
   * @method replicateCampaign
   * @param {string} campaign_id
   * @returns {Observable<ResponseActionMarketing>}
   * @todo change observable reponse
   */
  public replicateCampaign(campaign_id: string): Observable<ResponseActionMarketing> {
    return this._apiRequest.post(`${this.basePath}/${campaign_id}/actions/replicate`, {});
  }

  /**
   * @method resumeCampaign
   * @param {string} campaign_id
   * @returns {Observable<ResponseActionMarketing>}
   */
  public resumeCampaign(campaign_id: string): Observable<ResponseActionMarketing> {
    return this._apiRequest.post(`${this.basePath}/${campaign_id}/actions/resume`, {});
  }

  /**
   * @method scheduleCampaign
   * @param {string} campaign_id
   * @returns {Observable<ResponseActionMarketing>}
   */
  public scheduleCampaign(campaign_id: string): Observable<ResponseActionMarketing> {
    return this._apiRequest.post(`${this.basePath}/${campaign_id}/actions/schedule`, {});
  }

  /**
   * @method startCampaign
   * @param {string} campaign_id
   * @returns {Observable<ResponseActionMarketing>}
   */
  public startCampaign(campaign_id: string): Observable<ResponseActionMarketing> {
    return this._apiRequest.post(`${this.basePath}/${campaign_id}/actions/start`, {});
  }

  /**
   * @method inScheduleCampaign
   * @param {string} campaign_id
   * @returns {Observable<ResponseActionMarketing>}
   */
  public unScheduleCampaign(campaign_id: string): Observable<ResponseActionMarketing> {
    return this._apiRequest.post(`${this.basePath}/${campaign_id}/actions/unschedule`, {});
  }
}
