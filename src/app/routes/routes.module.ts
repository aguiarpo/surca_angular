import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login-module/login-component/login.component';
import { HomeModule } from '../home-module/home.module';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [
    HomeModule,
    RouterModule.forRoot(appRoutes, { useHash: true } ),
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }
