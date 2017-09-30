/**
 * @module marketing-service
 * @class audience
 * @author ManhNV
 * @description config audience service in marketing
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {AuthenticateService} from '../common-service/authenticate.service';
import {Observable} from 'rxjs/Observable';
// import {UtilService} from '../common-service/util.service';
import {Audience, CustomerMarketing, ResponseActionMarketing} from '../../../marketing/marketing.model';

@Injectable()
export class AudienceService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}/audiences`;
  }

  /**
   * @method estimateCustomer
   * @param {string} audience_id
   * @returns {Observable<ResponseActionMarketing>}
   */
  public estimateCustomer(audience_id: string): Observable<Audience> {
    return Observable.create(observer => {
      this._apiRequest.post(`${this.basePath}/${audience_id}/actions/estimate`, {})
        .subscribe(
          data => observer.next(data['audience']),
          err => observer.error(err)
        );
    });
  }

  /**
   * @method getAudiences
   * @description get list audiences
   */
  public getAudiences(): Observable<Audience[]> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}`, {})
        .subscribe(
          data => observer.next(data['audiences']),
          error => observer.error(error)
        );
    });
  }

  /**
   * @method getCustomers
   * @description get list customer
   * @param {string} audience_id
   * @returns {Observable<CustomerMarketing>}
   */
  public getCustomers(audience_id: string): Observable<CustomerMarketing> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/${audience_id}/customers`)
        .subscribe(
          data => observer.next(data['customers']),
          error => observer.error(error)
        );
    });
  }
}
