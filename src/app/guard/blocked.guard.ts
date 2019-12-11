import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConstantsService } from '../globals/constants.service';
import { CookieService } from 'ngx-cookie-service';
import {strictEqual} from 'assert';
import {LoginService} from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class BlockedGuard implements CanActivate {

  constructor(private constants: ConstantsService, private router: Router,
              private cookie: CookieService, private loginService: LoginService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.constants.login === undefined) {
      let password; let email;
      if (this.cookie.get('email') && this.cookie.get('password')) {
        email = this.cookie.get('email');
        password = this.cookie.get('password');
      } else {
        await this.router.navigate(['/']);
        return false;
      }
      let user;
      user = await this.loginService.getUser(email, password);
      if (user.levelsOfAccess === 'ADMIN') { return true; } else {
        await this.router.navigate(['/']);
        return false;
      }
    } else {
      if (this.constants.login.levelsOfAccess === 'ADMIN') {
        return true;
      } else {
        return false;
      }
    }
  }
}
