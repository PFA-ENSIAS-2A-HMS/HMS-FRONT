import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/config/environment';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // add token from localStorage
    }
  )
};
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  readonly apiUrl = environment.serverAddress+'/api/v1/rooms';
  readonly apiAssign = environment.serverAddress+"/api/v1/assignments";
  constructor(private http: HttpClient) {}

  addRoom(room: any): Observable<any> {
    return this.http.post(this.apiUrl+"/1", room,httpOptions);
  }

  loadRooms():Observable<any>{
   return this.http.get(this.apiUrl,httpOptions);
  }
  getRoomById(id : any) : Observable<any>{
    return this.http.get(this.apiUrl+"/"+id,httpOptions);
  }
  addAssignment(assignment : any): Observable<any>{
    return this.http.post(this.apiAssign,assignment,httpOptions);
  }

  getAssignmentsByRoomId(id:any): Observable<any>{
    return this.http.get(this.apiAssign+"/room/"+id,httpOptions);
  }
}
