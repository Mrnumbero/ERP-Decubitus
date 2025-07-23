import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {

    const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated
    const roleId = Number(localStorage.getItem('roleId'));
    
    if (isAuthenticated) {
       if (roleId === 1) {
      return true; // Allow access for roleId = 1
    } else {
      return false; // Redirect other users to dashboard
    }
    }
    return this.router.createUrlTree(['/login']); // Redirect to login if not authenticated
  }
}
