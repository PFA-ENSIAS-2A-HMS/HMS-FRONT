import { Hospital } from '../models/hospital';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHolidays'
}) 
export class SearchHolidaysPipe implements PipeTransform {

  transform(Hospitals: Hospital[], searchValue: string): Hospital[] {
    if (!Hospitals || !searchValue) { return Hospitals; }
    return Hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchValue.toLowerCase())
      ||
      hospital.country.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
