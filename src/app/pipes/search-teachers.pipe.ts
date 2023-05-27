import { Pipe, PipeTransform } from '@angular/core';
import { Teacher } from '../models/teacher';

@Pipe({
  name: 'searchReceptionists'
})
export class SearchReceptionistsPipe implements PipeTransform {

  transform(teachers: Teacher[], searchValue: string): Teacher[] {
    if (!teachers || !searchValue) { return teachers; }
    return teachers.filter(teacher =>
      teacher.firstname?.toLowerCase().startsWith(searchValue.toLowerCase())
      || teacher.lastname?.toLowerCase().startsWith((searchValue.toLowerCase()))
      || teacher.matricule.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
