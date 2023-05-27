import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // add token from localStorage
    }
  )
};
@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  readonly apiUrl = 'http://localhost:8080/api/v1/holiday';
  readonly endPointStudents = '/all'
  constructor(private http: HttpClient) { }
  getHolidays() {
    return this.http.get(this.apiUrl + this.endPointStudents, httpOptions);
  }
  addHoliday(holiday: any): Observable<any> {
    let addHolidayUrl = this.apiUrl + "/create";
    return this.http.post<any>(addHolidayUrl, holiday, httpOptions).pipe(
      map(response => {
        console.log(response)
      })
    );
    ;
  }
  deleteHoliday(id: string) {
    return this.http.delete(this.apiUrl + "/" + id, httpOptions);
  }
}
