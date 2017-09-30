/**
 * @module marketing-service
 * @class criteria
 * @author ManhNV
 * @description config criteria service in marketing
 * @version 1.0.0
 * @todo confirm model response paging
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs/Observable';
import {Chanel, Criteria} from '../../../marketing/marketing.model';
import {ResponseCustom} from '../../model/response-custom.model';

@Injectable()
export class CriteriaService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService) {
    this.basePath = `audiences/profile/criterion`;
  }

  /**
   * @method createCriteria
   * @description create criteria
   * @returns {Observable<ResponseCustom>}
   */
  public createCriteria(body: any): Observable<ResponseCustom> {
    const bodyMap = {
      name: body.name,
      key: body.key,
      value_type: body.value_type
    };
    return this._apiRequest.post(`${this.basePath}`, bodyMap);
  }

  /**
   * @method getListCriteria
   * @returns {Observable<Criteria[]>}
   */
  public getListCriteria(): Observable<Criteria[]> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}`)
        .subscribe(
          data => observer.next(data['criterion']),
          error => observer.error(error)
        );
    });
  }

  /**
   * @method getCriteriaDetail
   * @description get detail criteria
   * @param {string} idCriteria
   * @returns {Observable<Criteria>}
   */
  public getCriteriaDetail(idCriteria: string): Observable<Criteria> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/${idCriteria}`)
        .subscribe(
          data => observer.next(data['criteria']),
          error => observer.error(error)
        );
    });
  }

  /**
   * @method updateCriteria
   * @param body
   * @param {string} idCriteria
   * @returns {Observable<ResponseCustom>}
   * @todo
   */
  public updateCriteria(body: any, idCriteria: string): Observable<ResponseCustom> {
    return this._apiRequest.post(`${this.basePath}/${idCriteria}`, body);
  }
}










