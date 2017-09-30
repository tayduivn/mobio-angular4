/**
 * @module marketing-service
 * @class chanel
 * @author ManhNV
 * @description config chanel service in marketing
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs/Observable';
import {Chanel} from '../../../marketing/marketing.model';
import {ResponseCustom} from '../../model/response-custom.model';

@Injectable()
export class ChanelService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService) {
    this.basePath = `merchants/campaigns/channels`;
  }

  /**
   * @method createChanel
   * @description create chanel
   * @returns {Observable<ResponseCustom>}
   */
  public createChanel(body: any): Observable<ResponseCustom> {
    const bodyMap = {
      name: body.name,
      type: body.type
    };
    return this._apiRequest.post(`${this.basePath}`, bodyMap);
  }

  /**
   * @method getMarketingChanel
   * @description get list chanel marketing
   * @returns {Observable<Chanel[]>}
   */
  public getMarketingChanel(): Observable<Chanel[]> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}`)
        .subscribe(
          data => observer.next(data['channels']),
          error => observer.error(error)
        );
    });
  }
}
