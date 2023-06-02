import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

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
export class RoomService {

  readonly apiUrl = 'http://100.76.108.249:8080/filiere';
  // readonly endPointRooms = '/all'
  constructor(private http: HttpClient) { }
  getRooms() {
    return this.http.get(this.apiUrl, httpOptions);
  }
  addRoom(branch: any): Observable<any> {
    let addRoomUrl = this.apiUrl + "/add";
    return this.http.post<any>(addRoomUrl, branch, httpOptions).pipe(
      map(response => {
        console.log(response)
      })
    );
    ;
  }

}

