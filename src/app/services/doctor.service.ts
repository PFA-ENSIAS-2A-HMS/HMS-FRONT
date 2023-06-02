import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, switchMap } from 'rxjs';
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
export class DoctorService {

  readonly apiUrlPOST = environment.serverAddress+'/api/v1/doctors/add/1';
  readonly apiUrl = environment.serverAddress+'/api/v1/doctors';
  constructor(private http: HttpClient) { }
  
  saveDoctor(doctor : any){
    return this.http.post(this.apiUrlPOST,doctor,httpOptions);
  }
  
  getDoctors(){
    return this.http.get(this.apiUrl,httpOptions);
  }
  deleteDoctor(doctorId : any){
    return this.http.delete(this.apiUrl+"/"+doctorId,httpOptions);
  }
  getDoctorById(doctorId : any){
     return this.http.get(this.apiUrl+"/"+doctorId,httpOptions);
  }
  updateDoctor(doctor : any,doctorId : string){
    console.log(doctor);
    return this.http.put(this.apiUrl+"/"+doctorId,doctor,httpOptions);
  }
}
