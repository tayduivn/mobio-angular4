import {Injectable, Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'dataFilter'
})
@Injectable()
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: number): any {
    if (query && query !== 0) {
      return _.filter(array, row => row.allowChange === query);
    }
    return array;
  }
}
