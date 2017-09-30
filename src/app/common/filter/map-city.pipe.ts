/**
 * @description map-city filter with idCity
 * @version 1.0.0
 */

import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {ProvincesService} from '../service/common-service/provinces.service';
import {ProvincesCity} from '../model/provinces.model';
import * as _ from 'lodash';

@Pipe({
  name: 'dataMapCity'
})
@Injectable()
export class MapCityPipe implements PipeTransform {
  public provincesCities: ProvincesCity[];

  constructor(private _provincesService: ProvincesService) {
    this._provincesService.getProvincesCity()
      .subscribe(cities => {
        this.provincesCities = cities;
      });
  }

  transform(array: ProvincesCity[], queryCodeCity: string): any {
    array = this.provincesCities;
    if (queryCodeCity === '') return '';
    if (queryCodeCity && queryCodeCity !== '') {
      const resultCity = _.find(array, provincesCity => provincesCity.code === queryCodeCity.toString().trim());
      return !resultCity ? '' : resultCity.name || '';
    }
    return array;
  }
}
