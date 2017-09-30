/**
 * @module customer.service
 * @author ManhNV
 * @description customer service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from './api-request.service';
import {Category} from '../../model/category.model';
import {Observable} from 'rxjs/Observable';
import {AuthenticateService} from './authenticate.service';
import {Customer} from '../../model/customer.model';

@Injectable()
export class CustomerService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  /**
   * @method getCustomerSummary
   * @description get customer info
   * @param {string} idCustomer
   * @returns {Observable<[Category]>}
   */
  public getCustomerSummary(idCustomer: string): Observable<Customer> {
    return this._apiRequest.get(`${this.basePath}/customers/${idCustomer}/summary`);
  }
}
