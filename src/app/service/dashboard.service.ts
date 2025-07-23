import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getTopWidgets(): Observable<any> {
      return this._httpClient
        .get<any>(environment.baseURL + '/dashboard/topwiget' )
        .pipe(
          switchMap((response: any) => {
            return of(response);
          })
        );
    }

  getMiddleWidgets(): Observable<any> {
    return this._httpClient
      .get<any>(environment.baseURL + '/dashboard/middlewiget' )
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }

  getMiddleWidgets2(): Observable<any> {
    return this._httpClient
      .get<any>(environment.baseURL + '/dashboard/middlewiget2' )
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }

  getBottomWidgets(): Observable<any> {
    return this._httpClient
      .get<any>(environment.baseURL + '/dashboard/bottomwiget' )
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }
}
