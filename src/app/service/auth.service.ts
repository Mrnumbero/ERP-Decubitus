import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _httpClient: HttpClient,
    private router: Router,
  ) { }

  getlist(): Observable<any[]> {
    return this._httpClient.get<any[]>(
      environment.baseURL + '/roles'
    ).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  login(credentials: { username: string; password: string }): Observable<number | null> {
    const body = {
      ssid: credentials.username,
      password: credentials.password,
    };

    return this._httpClient.post(environment.baseURL + '/auth/login', body).pipe(
      switchMap((response: any) => {
        const token = response.accessToken;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', response.refreshToken);

        // Decode JWT to get role ID
        const decodedToken: any = jwtDecode(token);
        const roleId = decodedToken.roleId; // Adjust if necessary
        console.log('Role ID:', roleId);

        if (roleId) {
          localStorage.setItem('roleId', roleId.toString());
        }

        return of(roleId);
      }),
      catchError((error) => {
        console.error('Login failed', error);
        // alert('Login failed. Please check your credentials.');
        return of(null);
      })
    );
  }

  recoverPassword(email: string) {
    return of({ success: true });
  }
}
