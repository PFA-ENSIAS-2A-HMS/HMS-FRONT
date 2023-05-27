import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  

  readonly apiUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
  };
  constructor(private http: HttpClient) { }

  addTeacher(teacher: any): Observable<any> {
    let addTeacherUrl = this.apiUrl + "/api/v1/auth/register/teacher";
    return this.http.post<any>(addTeacherUrl, teacher, this.httpOptions).pipe(
      map(response => {
        console.log(response)
      })
    );
    ;
  }

  updateTeacher(teacher: any,id : AnalyserOptions): Observable<any> {
    let addTeacherUrl = this.apiUrl + "/api/v1/teacher/"+id;
  return this.http.patch<any>(addTeacherUrl, teacher, this.httpOptions).pipe(
      map(response => {
        console.log(response)
      })
    );
    ;
  }

  getReceptionists() {
    return this.http.get(this.apiUrl +"/api/v1/teacher/all" , this.httpOptions);
  }
  deleteTeacher(id: string) {
    return this.http.delete(this.apiUrl  +"/api/v1/teacher/"+id,this.httpOptions);
  }
 
  findTeacherById(id: string) {
    return this.http.get(this.apiUrl  + "/api/v1/teacher/" + id, this.httpOptions);
  }
}
