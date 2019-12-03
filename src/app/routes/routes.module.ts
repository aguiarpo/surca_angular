import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login/login.component';
import { HomeModule } from '../home/home.module';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [
    HomeModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true } ),
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }
