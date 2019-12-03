import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

interface User {
  createdDate: string;
  lastModifiedDate: string;
  createdBy: string;
  lastModifiedBy: string;
  code: number ;
  name: string;
  email: string;
  state: string;
  city: string;
  telephone1: string;
  telephone2: string;
  levelsOfAccess: string;
  status: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  user: User;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
  }

  async buttonClick() {
     this.user = await this.loginService.getUser(this.email, this.password);
     console.log(this.user);
  }
}
