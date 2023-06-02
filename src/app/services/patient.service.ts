import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/config/environment';

const httpOptions = {
  headers: new HttpHeaders(
    {
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // add token from localStorage
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  
  readonly apiUrlPOST = environment.serverAddress+'/api/v1/patients/add/1';
  readonly apiUrl = environment.serverAddress+'/api/v1/patients';

  constructor(private http: HttpClient) { }

  savePatient(patient: any): Observable<any> {
    return this.http.post(this.apiUrlPOST, patient, httpOptions);
  }

  getPatients(): Observable<any> {
    return this.http.get(this.apiUrl, httpOptions);
  }

  deletePatient(patientId: any): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + patientId, httpOptions);
  }

  getPatientById(patientId: any): Observable<any> {
    return this.http.get(this.apiUrl + "/" + patientId, httpOptions);
  }

  updatePatient(patient: any, patientId: string): Observable<any> {
    return this.http.put(this.apiUrl + "/" + patientId, patient, httpOptions);
  }
}
