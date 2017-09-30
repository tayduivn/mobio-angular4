/**
 * @module marketing-service
 * @class criteria-operator
 * @author ManhNV
 * @description config criteria service in marketing
 * @version 1.0.0
 * @todo confirm model response paging
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs/Observable';
import {ResponseCustom} from '../../model/response-custom.model';
import {CriteriaOperator, Operator, CriteriaSupport} from '../../../marketing/marketing.model';

@Injectable()
export class CriteriaOperatorService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService) {
    this.basePath = `audiences/profile/criteria-operator`;
  }

  /**
   * @method createCriteriaOperator
   * @param body
   * @returns {Observable<ResponseCustom>}
   * @todo pending body
   */
  public createCriteriaOperator(body: any): Observable<ResponseCustom> {
    return this._apiRequest.post(`${this.basePath}`, body);
  }

  /**
   * @method getListCriteriaSupport
   * @description get list criteria
   * @returns {Observable<CriteriaSupport[]>}
   */
  public getListCriteriaSupport(): Observable<CriteriaSupport[]> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/criterion`)
        .subscribe(
          data => observer.next(data['criterion']),
          error => observer.error(error)
        );
    });
  }

  /**
   * @method getListCriteriaOperator
   * @returns {Observable<CriteriaOperator[]>}
   */
  public getListCriteriaOperator(): Observable<CriteriaOperator[]> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}`)
        .subscribe(
          data => observer.next(data['data']),
          error => observer.error(error)
        );
    });
  }

  /**
   * @method getListCriteriaOperatorSupport
   * @param {string} criteria_key
   * @returns {Observable<Operator[]>}
   */
  public getListCriteriaOperatorSupport(criteria_key: string): Observable<Operator[]> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/criterion/${criteria_key}/operators`)
        .subscribe(
          data => observer.next(data['operators']),
          error => observer.error(error)
        );
    });
  }

  /**
   * @method updateCriteriaOperator
   * @param body
   * @returns {Observable<ResponseCustom>}
   * @todo body pending
   */
  public updateCriteriaOperator(body: any): Observable<ResponseCustom> {
    return this._apiRequest.patch(`${this.basePath}`, body);
  }
}










