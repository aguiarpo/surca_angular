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

export interface Vet {
  code: number;
  crmv: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class ConstantsService { // Classe contendo todas as variáveis globais
  readonly baseAppUrl: string = 'http://10.197.66.2/';
  login: User;
  progress = false; // Variável da barra de progresso - true = show, false - hide
}
