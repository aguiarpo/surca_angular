import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConstantsService} from '../../../globals/constants.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  deleteStatus: boolean;

  constructor(private http: HttpClient, private constant: ConstantsService) {}

  async delete(id: number) {
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
    await this.http.delete(this.constant.baseAppUrl + 'v1/admin/usuario/' + id, httpOptions).toPromise().catch(
      err => {
        this.deleteStatus = false;
      }
    ).then(
      data => {
        this.deleteStatus = true;
      }
    );
    return this.deleteStatus;
  }
}
