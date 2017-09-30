/**
 * @module category.service
 * @author ManhNV
 * @description category service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from './api-request.service';
import {Category} from '../../model/category.model';
import {Observable} from 'rxjs/Observable';
import {AuthenticateService} from './authenticate.service';

@Injectable()
export class CategoryService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}/`;
  }

  /**
   * @method getProductCategories
   * @description get list categories products
   * @returns {Observable<[Category]>}
   */
  public getCategories(): Observable<[Category]> {
    return new Observable(observer => {
      this._apiRequest.get(`${this.basePath}products/categories`)
        .subscribe(
          data => {
            console.log(data);
            return observer.next((!data['categories'] || data['categories'].length === 0) ? []
              : data['categories'].map(CategoryService.toCategory));
          },
          err => observer.error(err)
        )
    })
  }

  /**
   * @method toCategory
   * @description mapping category model
   * @param r
   * @returns {Category}
   */
  public static toCategory(r: any): Category {
    let cat: Category = {
      idCategory: r['MaDanhMuc'],
      name: r['TenDanhMuc']
    };
    return cat;
  }
}
