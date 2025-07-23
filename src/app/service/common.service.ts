import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  uploadImg(img: FormData): Observable<any> {
    return this._httpClient
      .post(
        environment.baseURL + '/upload/file',
        img,
      )
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this._httpClient
      .get<any>(environment.baseURL + '/users/profilebytoken/'+token, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      )
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }
}
