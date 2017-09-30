/**
 * @module api-request.service
 * @author ManhNV
 * @description custom http method
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, ResponseOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import * as _ from 'lodash';

import {AppConfig} from '../../config/app.config';
import {AuthenticateService} from './authenticate.service';
import {Router} from '@angular/router';
import {ResponseCustom} from '../../model/response-custom.model';

@Injectable()
export class ApiRequestService {
  private headers: Headers;
  private apiUrl: string;
  private options: RequestOptions;

  constructor(private http: Http,
              private router: Router,
              private _appConfig: AppConfig,
              private _authService: AuthenticateService) {
    // set default additional path
    this.apiUrl = `${this._appConfig.getHostBase()}`;
  }

  /**
   * @method setRequestOptions
   * @description config header with option another attach request
   */
  private setRequestOptions() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.getToken()}`
    });
    this.options = new RequestOptions({headers: this.headers});
  }

  /**
   * @method get
   * @description custom method get with header authenticate
   * @param mapResponse
   * @param pathApi
   */
  public get (pathApi: string, mapResponse: any = this.mapResponseDefault) {
    this.setRequestOptions();
    return this.http.get(`${this.apiUrl}${pathApi}`, this.options)
      .map(mapResponse)
      .catch(this.catchError);
  }

  /**
   * @method {post}
   * @description custom method post
   * @param api
   * @param body
   * @param mapResponse
   *  - value only = 0 || function mapResponse custom
   *  - if set mapResponse = 0 => apply default mapResponse
   *  - use mapResponse = 0 iff need config param option
   * @param options
   * @returns {Observable<R>}
   */
  public post(api: string, body: any, mapResponse?: any, options?: any) {
    this.setRequestOptions();
    let opt = this.options;
    if (options) {
      opt = _.merge({}, this.options, options);
    }
    // accept mapping object data
    if (mapResponse && mapResponse !== 0 && typeof mapResponse !== 'function')
      mapResponse = 0;
    if (!mapResponse || mapResponse === 0) mapResponse = this.mapResponseDefault;
    return this.http
      .post(this.apiUrl + api, body, opt)
      .map(mapResponse)
      .catch(this.catchError);
  }

  /**
   * @method put
   * @description custom method put
   * @param api
   * @param body
   * @param mapResponse
   *  - value only = 0 || function mapResponse custom
   *  - if set mapResponse = 0 => apply default mapResponse
   *  - use mapResponse = 0 iff need config param option
   * @param options
   * @returns {Observable<R>}
   */
  public put(api: string, body: any, mapResponse?: any, options?: any) {
    this.setRequestOptions();
    let opt = this.options;
    if (options) {
      opt = _.merge({}, this.options, options);
    }
    // accept mapping object data
    if (mapResponse && mapResponse !== 0 && typeof mapResponse !== 'function')
      mapResponse = 0;
    if (!mapResponse || mapResponse === 0) mapResponse = this.mapResponseDefault;
    return this.http
      .put(this.apiUrl + api, body, opt)
      .map(mapResponse)
      .catch(this.catchError);
  }

  /**
   * @method patch
   * @description custom method patch
   * @param api
   * @param body
   * @param mapResponse
   *  - value only = 0 || function mapResponse custom
   *  - if set mapResponse = 0 => apply default mapResponse
   *  - use mapResponse = 0 iff need config param option
   * @param options
   * @returns {Observable<R>}
   */
  public patch(api: string, body: any, mapResponse?: any, options?: any) {
    this.setRequestOptions();
    let opt = this.options;
    if (options) {
      opt = _.merge({}, this.options, options);
    }
    // accept mapping object data
    if (mapResponse && mapResponse !== 0 && typeof mapResponse !== 'function')
      mapResponse = 0;
    if (!mapResponse || mapResponse === 0) mapResponse = this.mapResponseDefault;
    return this.http
      .patch(this.apiUrl + api, body, opt)
      .map(mapResponse)
      .catch(this.catchError);
  }

  /**
   * @method delete
   * @description custom method delete
   * @param api
   * @returns {Observable<R>}
   */
  public delete(api: string, body?: any) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.getToken()}`
    });
    this.options = new RequestOptions({
      headers: this.headers,
      body: body
    });
    return this.http
      .delete(this.apiUrl + api, this.options)
      .map(this.mapResponseDefault)
      .catch(this.catchError);
  }

  /**
   * @method sendNotFile
   * @description send data with form-urlencoded
   * @param {string} api
   * @param {string} method - method is [post, put, path]
   * @param body
   * @param mapResponse
   * @returns {Observable<any>}
   */
  public sendNotFile(api: string, method: string, body: any, mapResponse?: any) {
    method = method.toLowerCase();
    this.headers = new Headers({
      'Authorization': `Bearer ${this._authService.getToken()}`
    });
    this.options = new RequestOptions({headers: this.headers});

    // accept mapping object data
    if (mapResponse && mapResponse !== 0 && typeof mapResponse !== 'function')
      mapResponse = 0;
    if (!mapResponse || mapResponse === 0) mapResponse = this.mapResponseDefault;

    let data = new FormData();
    for (let item in body) {
      if (Array.isArray(body[item])) {
        for (let itemChild in body[item]) {
          data.append(item, body[item][itemChild])
        }
      } else data.append(item, body[item]);
    }
    return this.http[method](this.apiUrl + api, data, this.options)
      .map(mapResponse)
      .catch(this.catchError);
  }

  /**
   * @method sendWithFile
   * @description custom upload single and multiple file
   * @param api
   * @param method
   * @param data
   * @param files
   * @returns {Observable<R>}
   */
  public sendWithFile(api: string, method: string, data: any, files: any[]): Observable<any> {
    method = method.toUpperCase();
    const _getToken = this._authService.getToken();
    let obv: Observable<Response> =
      Observable.create((observer: any) => {
        let formData: FormData = new FormData(),
          xhr: XMLHttpRequest = new XMLHttpRequest();
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            for (let j = 0; j < files[i].files.length; j++) {
              formData.append(files[i].name, files[i].files[j],
                files[i].files[j] ? files[i].files[j].name : '__upload_file');
            }
          }
        }
        for (let property in data) {
          this.appendRecursive(formData, data[property], property);
        }
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              observer.next(this.convertResponse(xhr));
              observer.complete();
            } else {
              observer.error(this.convertResponse(xhr));
            }
          }
        };

        xhr.open(method, this.apiUrl + api, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + _getToken);
        xhr.send(formData);
      });
    return obv.map(this.mapResponseDefault).catch(this.catchError);
  }

  /**
   * @method appendRecursive
   * @description
   * @param fData
   * @param data
   * @param prop
   */
  private appendRecursive(fData: FormData, data: any, prop: string) {
    if ('object' === typeof data) {
      for (let p in data) {
        this.appendRecursive(fData, data[p], `${prop}`);
      }
    } else {
      fData.append(prop, data);
    }
  }

  /**
   * @method convertResponse
   * @param _xhr
   * @returns {Response}
   */
  private convertResponse(_xhr): Response {
    const XSSI_PREFIX = /^\)\]\}',?\n/;
    let status: number = _xhr.status === 1223 ? 204 : _xhr.status;

    let body: any = null;

    // HTTP 204 means no content
    if (status !== 204) {
      // responseText is the old-school way of retrieving response (supported by IE8 & 9)
      // response/responseType properties were introduced in ResourceLoader Level2 spec
      // (supported by IE10)
      body = (typeof _xhr.response === 'undefined') ? _xhr.responseText : _xhr.response;

      // Implicitly strip a potential XSSI prefix.
      if (typeof body === 'string') {
        body = body.replace(XSSI_PREFIX, '');
      }
    }

    // fix status code when it is 0 (0 status is undocumented).
    // Occurs when accessing file resources or on Android 4.1 stock browser
    // while retrieving files from application cache.
    if (status === 0) {
      status = body ? 200 : 0;
    }

    const headers: Headers = Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
    // IE 9 does not provide the way to get URL of response
    const url = this.getResponseURL(_xhr);
    const statusText: string = _xhr.statusText || 'OK';

    let responseOptions = new ResponseOptions({body, status, headers, statusText, url});
    const res = new Response(responseOptions);
    return res;
  }

  /**
   * @method getResponseURL
   * @param xhr
   * @returns {string}
   */
  public getResponseURL(xhr: any): string | null {
    if ('responseURL' in xhr) {
      return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
      return xhr.getResponseHeader('X-Request-URL');
    }
    return null;
  }

  /**
   * @deprecated public is deprecated, Please change method to Private
   * @param {Response} res
   * @returns {any}
   */
  public mapResponseDefault(res: Response): any | null {
    let out = null;
    try {
      out = res.json();
    } catch (e) {
    }
    return out;
  };

  /**
   * @method catchError
   * @description catch error and exeption
   * @param {Response} err
   * @returns {ErrorObservable}
   */
  public catchError(err: Response) {
    let out: ResponseCustom = {};
    try {
      out.D = err.json().D;
      out.C = err.json().C;
      out.status = err.status;
      if (out.status === 401)
        localStorage.removeItem('__token');
    } catch (e) {
      // localStorage.removeItem('__token');
    }
    return Observable.throw(out);
  }
}
