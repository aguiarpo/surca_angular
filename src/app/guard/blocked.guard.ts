import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ConstantsService } from '../globals-service/constants.service';
import { CookieService } from 'ngx-cookie-service';
import {LoginService} from '../login-module/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class BlockedGuard implements CanActivate {

  constructor(private constants: ConstantsService, private router: Router,
              private cookie: CookieService, private loginService: LoginService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.constants.login === undefined) { // Verifica se o usuário está logado
      let password; let email;
      if (this.cookie.get('email') && this.cookie.get('password')) { // Verifica se o usuário está salvo no cookie
        email = this.cookie.get('email');
        password = this.cookie.get('password');
      } else {
        await this.router.navigate(['/']);
        return false;
      }
      let user;
      user = await this.loginService.getUser(email, password);
      if (user.levelsOfAccess === 'ADMIN') { return true; } else { // Verifica se é administrador
        await this.router.navigate(['/']);
        return false;
      }
    } else {
      if (this.constants.login.levelsOfAccess === 'ADMIN') { // Verifica se é administrador
        return true;
      } else {
        return false;
      }
    }
  }
}
