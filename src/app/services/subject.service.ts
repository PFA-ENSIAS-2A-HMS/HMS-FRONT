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
export class SubjectService {

  readonly apiUrl = 'http://100.76.108.249:8080/course';
  getPatients() {
    return this.http.get(this.apiUrl, httpOptions);
  }
  constructor(private http: HttpClient) { }
  addSubject(subject: any): Observable<any> {
    let addSubjectUrl = this.apiUrl + "/add";
    return this.http.post<any>(addSubjectUrl, subject, httpOptions).pipe(
      map(response => {
        console.log(response)
      })
    );
    ;
  }
}
