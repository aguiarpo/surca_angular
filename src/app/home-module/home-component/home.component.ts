import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ConstantsService} from '../../globals-service/constants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  buttonText = ['Usuários', 'Relatório', 'Sair']; // Menu de itens
  buttonSelect: string;

  constructor(private router: Router, private cookie: CookieService, private constant: ConstantsService) { }

  ngOnInit() {
    if (this.router.url.indexOf('getUsers') > 0 || this.router.url.indexOf('user') > 0) { // Verificar qual página está
      this.buttonSelect = this.buttonText[0];
    } else if (this.router.url.indexOf('report') <= 0) {
      this.get('Usuários');
    } else {
      this.buttonSelect = this.buttonText[1];
    }
  }

  get(text) { // Função que define qual requisão precisa fazer
    this.buttonSelect = text;
    switch (text) {
      case 'Usuários': // Pega todos os usuários
        this.router.navigate(['/home/getUsers']);
        break;
      case 'Relatório': // Pega todos os relatórios
        this.router.navigate(['/home/report']);
        break;
      case 'Sair': // Deslogar
        this.cookie.set('email', '');
        this.cookie.set('password', '');
        this.constant.login = undefined;
        this.router.navigate(['/']);
        break;
    }
  }
}
