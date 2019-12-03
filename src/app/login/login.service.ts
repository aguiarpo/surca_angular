import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../constants.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user;
  constructor(private http: HttpClient, private  constant: ConstantsService) { }

  async getUser(email, password) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type'  : 'application/json',
          'Access-Control-Allow-Origin' :  '*',
          Authorization: 'Basic ' + btoa(email + ':' + password),
      })
    };
    console.log(this.constant.baseAppUrl + 'v1/user/usuario/login');
    await this.http.get(this.constant.baseAppUrl + 'v1/user/usuario/login', httpOptions).toPromise().then(
      data => {
        this.user = data;
      }
    );
    return this.user;
  }
}