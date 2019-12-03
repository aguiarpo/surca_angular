import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../../../globals/constants.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllService {
  users;

  constructor(private http: HttpClient, private constant: ConstantsService) {}

  async getAll(page: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Basic ' + btoa('eduardo.aguiarpo@gmail.com:12345678aS'),
        observe: 'response'
      })
      //        Authorization: 'Basic ' + btoa(this.constant.login.email + ':'
      //           + this.constant.login.password),
    };
    await this.http.get(this.constant.baseAppUrl + 'v1/admin/usuario?page=' + page, httpOptions).toPromise().catch(
      err => {
        this.users = undefined;
      }
    ).then(
      data => {
        this.users = data;
      }
    );
    return this.users;
  }
}
