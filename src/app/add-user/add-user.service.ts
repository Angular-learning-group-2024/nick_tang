import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http: HttpClient) { }

  saveData(data: any): Observable<any> {
    
    const url = `${API_BASE_URL}/api/users`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(url, data, {headers, observe: 'response'})
      .pipe(
        tap(response => {
        })
      );
  }

  editData(data: any, userId:number): Observable<any> {
    
    const url = `${API_BASE_URL}/api/users/${userId}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.put(url, data, {headers, observe: 'response'})
      .pipe(
        tap(response => {
        })
      );
  }
}