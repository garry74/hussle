/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/quotes */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(value: any[], query: string) {
    let res: any[];
    if (!query) return value;

    res = value.filter((val) => {
      return val.title.toLowerCase().match(query.toLowerCase());
    });

    return res;
  }
}
