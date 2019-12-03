import { Injectable } from '@angular/core';

export interface User {
  createdDate: string;
  lastModifiedDate: string;
  createdBy: string;
  lastModifiedBy: string;
  code: number ;
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
  telephone1: string;
  telephone2: string;
  levelsOfAccess: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly baseAppUrl: string = 'http://localhost:8080/';
  login: User;
}
