/**
 * @module comment-service
 * @author ManhNV
 * @description config comment service
 * @summary not cast object mapping :D
 * @version 1.0.0
 * @deprecated apply cast to object
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs';
import {AuthenticateService} from '../common-service/authenticate.service';
import {UtilService} from '../common-service/util.service';
import {ResponseCustom} from '../../model/response-custom.model';
import {ProductsComments} from '../../../customer-care/comment/model/product-comments.model';
import {ItemsComments} from '../../../customer-care/comment/model/item-comments.model';
import {MerchantComments} from '../../../customer-care/comment/model/merchant-comment.model';
import Comment from '../../../customer-care/comment/model/comment.model';

@Injectable()
export class CommentService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}/comments`;
  }

  // ================== BASIC SERVICE CRUD ======================================================================
  /**
   * @method getMerchantComment
   * @description get list merchant comment
   * @alias list card comment
   * @param {*} dataFilter
   * @returns {Observable<any>}
   * @memberof CommentService
   */
  public getMerchantComments(dataFilter: any): Observable<MerchantComments> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}${queryString}`);
  }

  /**
   * @method getProductsComments
   * @description get list product comments
   * @param {Object} dataFilter
   * @returns {Observable<ProductsComments>}
   */
  public getProductsComments(dataFilter: any): Observable<ProductsComments> {
    let queryString = UtilService.encodeParams(dataFilter);
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/products${queryString}`)
        .subscribe(data => {
          return observer.next(data['data'])
        }, err => observer.next(err));
    });
  }

  /**
   * @method getItemsComments
   * @description get list item
   * @param {Object} dataFilter
   * @returns {Observable<ItemsComments>}
   */
  public getItemsComments(dataFilter: any): Observable<ItemsComments> {
    let queryString = UtilService.encodeParams(dataFilter);
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/items${queryString}`)
        .subscribe(data => {
          return observer.next(data['data'])
        }, err => observer.next(err));
    });
  }


  /**
   * @method getProductComments
   * @description get list comment in product
   * @param dataFilter
   * @param idProduct
   * @returns {Observable<Comment>}
   */
  public getProductComments(dataFilter: any, idProduct: string): Observable<Comment[]> {
    let queryString = UtilService.encodeParams(dataFilter);
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/products/${idProduct}${queryString}`)
        .subscribe(data => {
          return observer.next(data['data']['comments']);
        }, err => observer.error(err));
    })
  }

  /**
   * @method getItemComments
   * @description get list comment in item
   * @param dataFilter
   * @param idItem
   * @returns {Observable<Comment>}
   */
  public getItemComments(dataFilter: any, idItem: string): Observable<Comment[]> {
    let queryString = UtilService.encodeParams(dataFilter);
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/items/${idItem}${queryString}`)
        .subscribe(data => {
          return observer.next(data['data']['comments']);
        }, err => observer.error(err));
    })
  }

  /**
   * @method changeStatusComment
   * @description hide or unhide comment
   * @param statusChange
   * @param idComment
   */
  public changeStatusComment(statusChange: number, idComment: string): Observable<ResponseCustom> {
    const typeChange = statusChange === 1 ? 'unhide' : 'hide';
    return this._apiRequest.post(`${this.basePath}/${idComment}/${typeChange}`, {});
  }

  /**
   * @method deleteComment
   * @description delete item comment
   * @param {string} idComment
   * @returns {Observable<ResponseCustom>}
   * @memberof CommentService
   */
  public deleteComment(idComment: string): Observable<ResponseCustom> {
    return this._apiRequest.delete(`${this.basePath}/${idComment}`);
  }

  /**
   * @method replyComment
   * @description reply comment for customer
   * @param {string} idComment
   * @param {string} content
   * @param {any[]} file
   * @returns {Observable<Comment>}
   */
  public replyComment(idComment: string, content: string, file: any[]): Observable<Comment> {
    return Observable.create(observer => {
      if (file.length === 0)
        return this._apiRequest.sendNotFile(`${this.basePath}/${idComment}/reply`, 'post', {content: content})
          .subscribe(data => observer.next(data['comment']),
            err => observer.error(err));
      return this._apiRequest.sendWithFile(`${this.basePath}/${idComment}/reply`, 'post', {content: content}, file)
        .subscribe(data => observer.next(data['comment']),
          err => observer.error(err));
    });
  }
}
