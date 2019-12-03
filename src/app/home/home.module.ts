import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { HomeRoutesModule } from './home-routes/home-routes.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    UserModule,
    HomeRoutesModule
  ],
  exports : [
    HomeComponent,
    HomeRoutesModule
  ]
})
export class HomeModule { }
