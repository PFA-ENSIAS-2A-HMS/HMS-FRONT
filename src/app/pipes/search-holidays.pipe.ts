import { Holiday } from '../models/holiday';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHolidays'
}) 
export class SearchHolidaysPipe implements PipeTransform {

  transform(Holidays: Holiday[], searchValue: string): Holiday[] {
    if (!Holidays || !searchValue) { return Holidays; }
    return Holidays.filter(holiday =>
      holiday.title.toLowerCase().includes(searchValue.toLowerCase())
      ||
      holiday.type.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
