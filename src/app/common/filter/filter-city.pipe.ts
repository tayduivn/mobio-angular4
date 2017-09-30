import {Injectable, Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'dataFilterCity'
})
@Injectable()
export class DataFilterCity implements PipeTransform {

  transform(array: any[], queryCodeCities: string): any {
    if (queryCodeCities && queryCodeCities !== '') {
      return array.filter(item => item.name.indexOf(queryCodeCities.trim()) !== -1);
    }
    return array;
  }
}
