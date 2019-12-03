import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LoginModule} from './login/login.module';
import { ConstantsService} from './globals/constants.service';
import { HttpClientModule } from '@angular/common/http';
import {HomeModule } from './home/home.module';
import { RoutesModule } from './routes/routes.module';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    HttpClientModule,
    HomeModule,
    RoutesModule
  ],
  providers: [
    ConstantsService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
