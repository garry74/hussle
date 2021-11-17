/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private LoginService: LoginService,
    private Router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!!localStorage.getItem('intro')) {
      return true;
    } else {
      this.Router.navigate(['intro']);

      return false;
    }
  }
}
