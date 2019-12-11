import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login-component/login.component';
import {FormsModule} from '@angular/forms';
import {LoginService} from './service/login.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
