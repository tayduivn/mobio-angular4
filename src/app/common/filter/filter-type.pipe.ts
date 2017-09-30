import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataFilterType'
})
@Injectable()
export class DataFilterType implements PipeTransform {

  transform(array: any[], queryType: number): any {
    if (queryType && [1, 2].indexOf(queryType) !== -1) {
      if (queryType === 1) return 'Nhận diện khách hàng tới cửa hàng';
      else return 'Tặng điểm khách hàng tới cửa hàng';
    }
    return queryType;
  }
}
