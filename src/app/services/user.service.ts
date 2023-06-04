import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin } from '../models/admin';
import { Observable } from 'rxjs';
import { environment } from 'src/config/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  apiUrl: string = environment.serverAddress+"/api/v1/admin";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
  };

  constructor(private http: HttpClient) { }

  getUserById(id: any) {
    return this.http.get(`${this.apiUrl}/user/${id}`, this.httpOptions);
  }
  registerAdmin(admin: Admin): Observable<any> {
    return this.http.post<any>(this.apiUrl, admin);
  }
  deleteAdmin(adminId: string): Observable<any> {
    const url = `${this.apiUrl}/${adminId}`;
    return this.http.delete<any>(url);
  }

  getAdminById(adminId: string): Observable<Admin> {
    const url = `${this.apiUrl}/${adminId}`;
    return this.http.get<Admin>(url);
  }

  updateAdmin(adminId: string, admin: Admin): Observable<any> {
    const url = `${this.apiUrl}/${adminId}`;
    return this.http.put<any>(url, admin);
  }
}
