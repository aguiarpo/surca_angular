import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {User} from '../../globals/constants.service';
import {Router} from '@angular/router';
import { ConstantsService } from '../../globals/constants.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  checkbox = true;
  user: User;

  constructor(private loginService: LoginService, private router: Router, private  constant: ConstantsService,
              private cookie: CookieService) {}

  ngOnInit() {
    this.email = this.cookie.get('email');
    this.password = this.cookie.get('password');
  }

  async buttonClick() {
     this.user = await this.loginService.getUser(this.email, this.password);
     if (this.user === undefined) {
       // @ts-ignore
       M.toast({html: 'Email ou Senha inválidas', classes: 'rounded'});
     } else {
       this.saveLogin();
       this.navigation();
     }
  }

  private saveLogin() {
    this.constant.login = this.user;
    this.constant.login.password = this.password;
    if (this.checkbox) {
      this.cookie.set('email', this.user.email);
      this.cookie.set('password', this.password);
    } else {
      this.cookie.deleteAll();
    }
  }

  private navigation() {
    this.router.navigate(['/home']);
  }
}
