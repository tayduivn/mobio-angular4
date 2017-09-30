/**
 * @module Debt-service
 * @author Duy
 * @description config Debt service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
// import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs';
import {Debt} from '../../../customer-care/debt/debt.model';
import {Http} from '@angular/http';

@Injectable()
export class DebtService {
  constructor(/*private _apiRequestService: ApiRequestService,*/
              private http: Http) {
  }

  /**
   * @method getDebt
   * @description get list Debt
   * @returns {Observable<Debt>}
   * @deprecated instead service http = service apiRequest
   * @todo [component-service] instead service http = service apiRequest
   */
  public getDebt() {
    return this.http.get('data/debt.json');
  }

  /**
   * @method toDebt
   * @description mapping Debt model
   * @param r
   * @returns {toDebt}
   */
  public static toDebt(r: any): Debt {
    const Debt: Debt = {
      id: r['id'],
      date: r['date'],
      transactionContent: r['transactionContent'],
      point: r['point'],
      startDebt: r['startDebt'],
      endDebt: r['endDebt'],
      email: r['email'],
      phone: r['phone'],
      admin: r['admin'],
      plusOrMinus: r['plusOrMinus'],

    };
    return Debt;
  }
}
