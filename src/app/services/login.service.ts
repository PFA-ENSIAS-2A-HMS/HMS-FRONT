import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly apiUrl = 'http://localhost:8080';
  readonly endPointDoctors = '/api/v1/auth/login';
  isLoggedIn : boolean = false;
  constructor(private http: HttpClient,private router: Router) { 
   const token = localStorage.getItem('accessToken');
   this.isLoggedIn = !!token;
   if(this.isLoggedIn && !this.isTokenExpired(token|| '')){
    this.router.navigate(['/dashboard']);
   }
  }
   isTokenExpired(token: string): boolean {
    const decoded = jwt_decode<{ exp: number }>(token);
    const expirationDate = new Date(decoded.exp * 1000);
    const isExpired = expirationDate.getTime() < Date.now();
    return isExpired;
   }

  login(email : string, password : string) : Observable<any>{
    let loginUrl : string = this.apiUrl + this.endPointDoctors;
    let loginObject ={
      email : email,
      password : password
    };
    return this.http.post<any>(loginUrl, loginObject,httpOptions).pipe(
      map(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('role',response.role);
        localStorage.setItem('id',response.id);
      })
    );
  }
  
}
