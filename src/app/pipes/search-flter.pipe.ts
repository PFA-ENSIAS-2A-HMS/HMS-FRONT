import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from '../models/doctor';

@Pipe({
  name: 'searchFlter'
})
export class SearchFlterPipe implements PipeTransform {

  transform(Doctors: Doctor[], searchValue: string): Doctor[] {
    if (!Doctors || !searchValue) { return Doctors; }
    return Doctors.filter(student =>
      student.first_name?.toLowerCase().startsWith(searchValue.toLowerCase())
      || student.last_name?.startsWith((searchValue.toLowerCase()))
      || student.cne.toLowerCase().startsWith(searchValue.toLowerCase())
    );
  }
}
