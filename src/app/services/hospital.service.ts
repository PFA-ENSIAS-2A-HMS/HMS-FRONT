import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // add token from localStorage
    }
  )
};
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  readonly apiUrl = 'http://localhost:8080/api/v1/hospitals/';
  readonly endPointStudents = '/all'
  constructor(private http: HttpClient) { }
  getHolidays() {
    return this.http.get(this.apiUrl + this.endPointStudents, httpOptions);
  }
  addHospital(hospital: any): Observable<any> {
    let addHospitalUrl = this.apiUrl;
    return this.http.post<any>(addHospitalUrl, hospital, httpOptions).pipe(
      map(response => {
        
      })
    );
    ;
  }
  deleteHospital(id: string) {
    return this.http.delete(this.apiUrl + "/" + id, httpOptions);
  }
}
