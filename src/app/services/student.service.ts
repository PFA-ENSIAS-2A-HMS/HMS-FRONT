import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, switchMap } from 'rxjs';

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
export class DoctorService {


  readonly apiUrl = 'http://localhost:8080';
  readonly endPointDoctors = '/students'
  constructor(private http: HttpClient) { }
  getDoctors() {
    return this.http.get(this.apiUrl + this.endPointDoctors, httpOptions);
  }
  deleteDoctor(cne: string) {
    return this.http.delete(this.apiUrl + this.endPointDoctors + "/" + cne, httpOptions);
  }
  /*addDoctor(student: any,id : number): Observable<any> {
    let addDoctorUrl = this.apiUrl + "/api/v1/auth/register/student";
    return this.http.post<any>(addDoctorUrl, student, httpOptions).pipe(
      map(response => {
      
      })
    );
    ;
  }*/
  addDoctor(student: any, filiereId: number): Observable<any> {
    let addDoctorUrl = this.apiUrl + "/api/v1/auth/register/student";
    return this.http.post<any>(addDoctorUrl, student, httpOptions).pipe(
      switchMap(response => {
        // Récupérer l'ID de l'étudiant ajouté
        const studentId = student.cne;
        // Construire l'URL pour affecter la filière à l'étudiant
        const assignFiliereUrl = this.apiUrl + "/students/" + studentId + "/filiere/" + filiereId;
        // Effectuer la requête pour affecter la filière à l'étudiant
        return this.http.post(assignFiliereUrl, {},httpOptions).pipe(
          map(() => response) 
        );
      })
    );
  }
  
  findDoctorByCne(cne: string) {
    return this.http.get(this.apiUrl + this.endPointDoctors + "/" + cne, httpOptions);
  }
  
}
