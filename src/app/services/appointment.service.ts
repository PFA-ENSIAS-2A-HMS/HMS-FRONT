import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/config/environment';
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
export class AppointmentService {
 readonly hospitalId = localStorage.getItem('hospitalId');
 readonly apiUrl = environment.serverAddress+'/api/v1/appointments';
  constructor(private http: HttpClient) { }
  saveAppointment(AppointmentData : any): Observable<any>{
   return this.http.post(this.apiUrl+"/hospital/"+this.hospitalId, AppointmentData, httpOptions);
  }
  getAppointments(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/hospital/"+this.hospitalId,httpOptions);
  }

  getAppointmentById(id:any):Observable<any>{
    return this.http.get(this.apiUrl+"/"+id,httpOptions);
  }
  updateAppointment(appointment:any,id:any):Observable<any>{
   return this.http.put(this.apiUrl+"/"+id,appointment,httpOptions);
  }
}
