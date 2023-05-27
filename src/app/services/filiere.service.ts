import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

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

export class FiliereService {
  private apiUrl = 'http://localhost:8080/filiere';

  constructor(private http: HttpClient) {}

  getFilieres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl,httpOptions).pipe(
      map((response: any[]) =>
        response.map((filiere: any) => ({
          id: filiere.id,
          name: filiere.name
        }))
      )
    );
  }
}
