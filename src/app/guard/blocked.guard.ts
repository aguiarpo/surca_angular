import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConstantsService } from '../globals/constants.service';
import { CookieService } from 'ngx-cookie-service';
import {strictEqual} from 'assert';

@Injectable({
  providedIn: 'root'
})
export class BlockedGuard implements CanActivate {

  constructor(private constants: ConstantsService, private router: Router,
              private cookie: CookieService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.constants.login === undefined || this.constants.login.levelsOfAccess !== 'ADMIN') {
    //     this.router.navigate(['/']);
    //     return false;
    // } else { return true; }
    return true;
  }
}
