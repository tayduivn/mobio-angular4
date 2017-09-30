import {Injectable, Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'dataFilterArrayCity'
})

@Injectable()
export class DataFilterArrayCity implements PipeTransform {

  transform(array: any[], query: string[]): any {
    if (query && query.length !== 0) {
      return _.filter(array, row => query.indexOf(row.city) !== -1);
    }
    return array;
  }
}
