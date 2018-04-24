import { Pipe, PipeTransform } from '@angular/core';
import { UtilsProvider } from '../../providers/utils/utils';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {

  constructor(private utils: UtilsProvider) { }

  transform(value: any): any {
    if (value) {
      return this.utils.convertDisplayTime(value)
    }
    return '';
  }
}
