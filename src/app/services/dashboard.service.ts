import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class DashboardService {
  readonly hospitalId = localStorage.getItem('hospitalId');
  private apiUrl = environment.serverAddress+'/api/v1/hospitals/dashboard/'; // Update the URL with your backend endpoint

  constructor(private http: HttpClient) { }

  getDashboardInfo(hospitalId : number): Observable<any>{
    return this.http.get<any>(this.apiUrl+this.hospitalId,httpOptions);
  }
}
