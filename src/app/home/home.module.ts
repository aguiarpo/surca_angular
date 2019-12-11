import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { HomeRoutesModule } from './home-routes/home-routes.module';
import { ReportModule } from './report/report.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    UserModule,
    HomeRoutesModule,
    ReportModule
  ],
  exports : [
    HomeComponent,
    HomeRoutesModule
  ]
})
export class HomeModule { }
