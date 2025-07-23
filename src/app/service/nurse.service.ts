import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTablesResponse } from '../../type/datatable.type';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  constructor(private _httpClient: HttpClient) { }

  private columnMap: { [key: number]: string } = {
    0: '',
    1: 'id',
    2: 'first_name',
    3: 'last_name',
    4: 'ssid',
    5: 'createdAt'
  };

  getPage(dataTablesParameters: any, id: number = 3): Observable<any> {
    // console.log(dataTablesParameters);
    
    const params: any = {
      page: Math.floor(dataTablesParameters.start / dataTablesParameters.length) + 1,
      limit: dataTablesParameters.length,
      search: dataTablesParameters.search.value || undefined,
      searchBy: ['first_name', 'last_name', 'ssid'],
      sortBy: dataTablesParameters.order?.length
        ? [this.mapColumn(dataTablesParameters.order[0].column), dataTablesParameters.order[0].dir.toUpperCase()]
        : undefined,
    };
    
    console.log("params:", params);
    
    if (!params.search) delete params.search;
    if (!params.sortBy) delete params.sortBy;
  
    return this._httpClient.get(`${environment.baseURL}/users/role/${id}`, { params });
  }
  
  private mapColumn(index: number): string {
    return this.columnMap[index] || 'id';
  }

  create(data: FormData): Observable<any> {
    return this._httpClient
      .post<any>(environment.baseURL + '/users/register', data)
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }

  getbyID(id:number): Observable<any> {
    return this._httpClient
      .get<any>(environment.baseURL + '/users/' + id)
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }

  update(data: FormData,id:number): Observable<any> {
    return this._httpClient
      .patch<any>(environment.baseURL + '/users/'+id, data)
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }

  delete(id:number): Observable<any> {
    return this._httpClient
      .delete<any>(environment.baseURL + '/users/'+id)
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }
}
