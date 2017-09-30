/**
 * @module marketing-service
 * @class operator
 * @author ManhNV
 * @description config operator service in marketing
 * @version 1.0.0
 * @todo confirm model response paging
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs/Observable';
import {Operator} from '../../../marketing/marketing.model';
import {ResponseCustom} from '../../model/response-custom.model';

@Injectable()
export class OperatorService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService) {
    this.basePath = `audiences/operators`;
  }

  /**
   * @method createCriteria
   * @description create criteria
   * @returns {Observable<ResponseCustom>}
   * @todo confirm model
   */
  public createOperator(body: any): Observable<ResponseCustom> {
    const bodyMap = {
      operands: body.operands,
      name: body.name,
      key: body.key
    };
    return this._apiRequest.post(`${this.basePath}`, bodyMap);
  }

  /**
   * @method getOperators
   * @returns {Observable<Operator[]>}
   */
  public getOperators(): Observable<Operator[]> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}`)
        .subscribe(
          data => observer.next(data['operators']),
          error => observer.error(error)
        );
    });
  }

  /**
   * @method getDetailOperator
   * @param {string} operator_key
   * @returns {Observable<Operator>}
   */
  public getDetailOperator(operator_key: string): Observable<Operator> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/${operator_key}`)
        .subscribe(
          data => observer.next(data['operator']),
          error => observer.error(error)
        );
    });
  }
}










