/**
 * @module provinceCities.service
 * @author ManhNV
 * @description config provinces service
 * @version 1.1.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from './api-request.service';
import {DomainLang, Provinces, ProvincesCity} from '../../model/provinces.model';
import {Observable} from 'rxjs/Observable';
import {AuthenticateService} from './authenticate.service';
import * as _ from 'lodash';

@Injectable()
export class ProvincesService {
  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
  }

  /**
   * @method getProvinces
   * @description get list ProvincesCity
   * @returns {Observable<[Provinces]>}
   */
  public getProvinces(): Observable<Provinces[]> {
    return new Observable(observer => {
      this._apiRequest.get('static/provinces.json')
        .subscribe(
          provincesData => observer.next(provincesData['regions'].map(ProvincesService.toProvinces)),
          err => observer.error(err)
        )
    })
  }

  public getProvincesCity(): Observable<ProvincesCity[]> {
    return new Observable(observer => {
      this.getProvinces()
        .subscribe(provinces => {
          console.log(provinces);
          let provincesCity: ProvincesCity[] = [];
          provinces.forEach(provinceItem => {
            provincesCity = _.concat(provincesCity, provinceItem.provinces);
          });
          return observer.next(provincesCity);
        }, err => observer.error(err));
    })
  }

  /**
   * @method toProvinces
   * @description mapping provinces model
   * @param r
   * @returns {Provinces}
   */
  public static toProvinces(r: any): Provinces {
    const provincesMap: Provinces = {
      code: r['code'],
      name: !r['name'] ? null
        : [r['name']].map(ProvincesService.toLanguageDomain)[0],
      provinces: (!r['provinces'] || r['provinces'].length === 0) ? []
        : r['provinces'].map(ProvincesService.toProvincesCity)
    };
    return provincesMap;
  }

  public static toProvincesCity(r: any): ProvincesCity {
    const provincesCityMap: ProvincesCity = {
      code: r['code'],
      name: r['name']
    };
    return provincesCityMap;
  }

  public static toLanguageDomain(r: any): DomainLang {
    const domainLang: DomainLang = {
      en: r['en'],
      vi: r['vi']
    };
    return domainLang;
  }
}
