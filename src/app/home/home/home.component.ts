import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  buttonText = ['Usuários'];
  buttonSelect: string;

  constructor(private router: Router) { }

  ngOnInit() {
    switch (this.router.url) {
      case '/home/getUsers':
        this.buttonSelect = this.buttonText[0];
    }
  }

  getUser(text) {
    this.buttonSelect = text;
    switch (text) {
      case 'Usuários':
        this.router.navigate(['/home/getUsers']);
        break;
    }
  }
}
