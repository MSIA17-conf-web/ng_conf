import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const dataObj = localStorage.getItem('requestedRoute');
    console.log('dataObj', dataObj);
    if (dataObj) {
      console.log('not empty');
      this.router.navigate([dataObj]);
      return false;
    } else {
      console.log('via routerLink');
      return true;
    }
  }
}
