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
    const cookie =  this.buildCookie();
    const requestedRoute: string = cookie.requestedRoute;

    if (requestedRoute) {
      console.log('The requested route is ' + requestedRoute);
      if (requestedRoute !== 'accueil') {
        cookie.requestedRoute = '';
        this.router.navigateByUrl(requestedRoute);
        return false;
      } else {
        console.log('The requested route is accueil');
        return true;
      }
    } else {
      console.log('The requested route doesn\'t exist');
      return true;
    }
  }

  private buildCookie(): any {
    return document.cookie.split(/; */).reduce((obj, str) => {
      if (str === '') { return obj; }
      const eq = str.indexOf('=');
      const key = eq > 0 ? str.slice(0, eq) : str;
      let val = eq > 0 ? str.slice(eq + 1) : null;
      if (val != null) { try { val = decodeURIComponent(val); } catch (ex) { /* pass */ } }
      obj[key] = val;
      return obj;
    }, {});
  }
}
