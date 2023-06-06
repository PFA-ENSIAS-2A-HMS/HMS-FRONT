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
export class ReceptionistService {
  readonly hospitalId = localStorage.getItem('hospitalId');
  readonly apiUrlPOST = environment.serverAddress+'/api/v1/receptionists/add/'+this.hospitalId;
  readonly apiUrl = environment.serverAddress+'/api/v1/receptionists';
  readonly apiUrlRegister = environment.serverAddress+'/api/v1/auth/register/receptionist/'+this.hospitalId;
  constructor(private http: HttpClient) { }

  saveReceptionist(receptionist: any): Observable<any> {
    return this.http.post(this.apiUrlPOST, receptionist, httpOptions);
  }

  getReceptionists(): Observable<any> {
    return this.http.get(this.apiUrl, httpOptions);
  }

  deleteReceptionist(receptionistId: any): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + receptionistId, httpOptions);
  }

  getReceptionistById(receptionistId: any): Observable<any> {
    return this.http.get(this.apiUrl + "/" + receptionistId, httpOptions);
  }

  updateReceptionist(receptionist: any, receptionistId: string): Observable<any> {
    return this.http.put(this.apiUrl + "/" + receptionistId, receptionist, httpOptions);
  }
}
