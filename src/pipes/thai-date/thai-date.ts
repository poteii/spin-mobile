import { Pipe, PipeTransform } from '@angular/core';
import { UtilsProvider } from '../../providers/utils/utils';


@Pipe({
  name: 'thaiDate',
})
export class ThaiDatePipe implements PipeTransform {
  constructor(private utils: UtilsProvider) { }

  transform(value: any, displayType: any): any {
    if (value) {
      if (displayType) {
        switch (displayType) {
          case 'stamptable': {
            return this.utils.displayTimestampDate(value)
          }
          case 'calendar': {
            return this.utils.displayCalendarDate(value);
          }
          case 'short': {
            return this.utils.displayShortDate(value);
          }
          case 'full': {
            return this.utils.displayFullDate(value);
          }
          case 'day': {
            return this.utils.displayDayDate(value);
          }
          case 'dayfull': {
            return this.utils.displayDay(value);
          }
        }
      }
      return '';
    }
  }
}
