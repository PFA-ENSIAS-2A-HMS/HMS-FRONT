import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/api/v1/hospitals/dashboard/'; // Update the URL with your backend endpoint

  constructor(private http: HttpClient) { }

  getDashboardInfo(hospitalId : number): Observable<any> {
    return this.http.get<any>(this.apiUrl+hospitalId);
  }
}
