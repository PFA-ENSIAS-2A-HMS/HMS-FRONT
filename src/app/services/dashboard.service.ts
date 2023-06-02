import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { environment } from 'src/config/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.serverAddress+'/api/v1/hospitals/dashboard/'; // Update the URL with your backend endpoint

  constructor(private http: HttpClient) { }

  getDashboardInfo(hospitalId : number): Observable<any> {
    return this.http.get<any>(this.apiUrl+hospitalId);
  }
}
