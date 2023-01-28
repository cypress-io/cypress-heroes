import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {

  transform(value: number): string {
    if (value > 1000000) {
      return formatNumber(value / 100000, 'en', '1.1-2') + 'M';
    // } else if (value > 100000) {
    //   return formatNumber(value / 1000, 'en', '1.1-2') + 'K';
    } else if (value > 10000) {
      return formatNumber(value / 1000, 'en', '1.1-2') + 'K';
    } else {
      return formatNumber(value, 'en');
    }
  }

}
