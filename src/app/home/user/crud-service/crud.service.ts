import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConstantsService} from '../../../globals/constants.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  deleteStatus: boolean;
  response;

  constructor(private http: HttpClient, private constant: ConstantsService, private cookie: CookieService) {}

  private header(): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Basic ' + btoa(this.cookie.get('email') + ':' + this.cookie.get('password')),
        observe: 'response'
      })
      //        Authorization: 'Basic ' + btoa(this.constant.login.email + ':'
      //           + this.constant.login.password),
    };
  }

  async delete(id: number, column: string) {
    this.constant.progress = true;
    if ( column === 'removed') {
      await this.http.delete(this.constant.baseAppUrl + 'v1/admin/usuario/visible/' + id,
        this.header()).toPromise().catch(err => this.deleteStatus = false).then(data => this.deleteStatus = true);
    } else {
      await this.http.delete(this.constant.baseAppUrl + 'v1/admin/usuario/' + id,
        this.header()).toPromise().catch(err => this.deleteStatus = false).then(data => this.deleteStatus = true);
    }
    this.constant.progress = false;
    return this.deleteStatus;
  }

  async edit(user) {
    this.constant.progress = true;
    await this.http.put(this.constant.baseAppUrl + 'v1/admin/usuario/', JSON.stringify(user),
      this.header()).toPromise().catch(err => this.response = err).then(data => this.response = data);
    this.constant.progress = false;
    return this.response;
  }

  async create(user) {
    this.constant.progress = true;
    await this.http.post(this.constant.baseAppUrl + 'v1/admin/usuario/', JSON.stringify(user),
      this.header()).toPromise().catch(err => this.response = err).then(data => this.response = data);
    this.constant.progress = false;
    return this.response;
  }

  async get(id: number) {
    this.constant.progress = true;
    await this.http.get(this.constant.baseAppUrl + 'v1/admin/usuario/' + id,
      this.header()).toPromise().catch(err => this.response = undefined).then(data => this.response = data);
    this.constant.progress = false;
    return this.response;
  }

  async getAll(column: string, value: string, page: number) {
    this.constant.progress = true;
    await this.http.get(this.constant.baseAppUrl + 'v1/admin/usuario/' + column + '/' + value + '?page=' + page,
      this.header()).toPromise().catch(err => this.response = undefined).then(data => this.response = data);
    this.constant.progress = false;
    return this.response;
  }

  async getSuggestion(column: string, value: string) {
    await this.http.get(this.constant.baseAppUrl + 'v1/admin/usuario/like/' + column + '/' + value ,
      this.header()).toPromise().catch(err => this.response = undefined).then(data => this.response = data);
    return this.response;
  }
}
