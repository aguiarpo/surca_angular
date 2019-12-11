import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConstantsService} from '../../../../globals-service/constants.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GetReportService {
  response;

  private header(): object { // Cabeçalho para as requisições
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Basic ' + btoa(this.cookie.get('email') + ':' + this.cookie.get('password')),
        observe: 'response'
      })
    };
  }

  async getAll() { // Pega tudo
    this.constant.progress = true;
    await this.http.get(this.constant.baseAppUrl + 'v1/admin/animal/report',
      this.header()).toPromise().catch(err => this.response = undefined).then(data => this.response = data);
    this.constant.progress = false;
    return this.response;
  }

  async get(name) { // Pega por campo de pesquisa
    this.constant.progress = true;
    await this.http.get(this.constant.baseAppUrl + 'v1/admin/animal/report/' + name,
      this.header()).toPromise().catch(err => this.response = undefined).then(data => this.response = data);
    this.constant.progress = false;
    return this.response;
  }


  constructor(private http: HttpClient, private constant: ConstantsService, private cookie: CookieService) {}

  async getSuggestion(suggestionValue: string) { // Pega as sugestões para a pesquisa
    await this.http.get(this.constant.baseAppUrl + 'v1/admin/animal/' + suggestionValue  ,
      this.header()).toPromise().catch(err => this.response = undefined).then(data => this.response = data);
    return this.response;
  }
}
