import {Injectable, Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'dataFilterCategory'
})

@Injectable()
export class FilterCategory implements PipeTransform {

  transform(array: any[], query: number[]): any {
    if (query && query.length !== 0) {
      return _.filter(array, row => query.indexOf(row.category) !== -1);
    }
    return array;
  }
}
