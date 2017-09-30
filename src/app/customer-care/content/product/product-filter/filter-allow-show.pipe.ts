import {Injectable, Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'dataFilterShow'
})
@Injectable()
export class DataFilterAllowShow implements PipeTransform {

  transform(array: any[], query: number[]): any {
    if (query && query.length !== 0) {
      return _.filter(array, row => query.indexOf(row.allowShow) !== -1);
    }
    return array;
  }
}
