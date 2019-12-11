import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetComponent } from '../user/get-component/get.component';
import {HomeComponent} from '../home/home.component';
import { BlockedGuard } from '../../guard/blocked.guard';
import { CreateAndEditComponent } from '../user/create-and-edit-component/create-and-edit.component';
import {ReportComponent} from '../report/report/report.component';

const appRoutesHome: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [BlockedGuard],
    children: [
      {path: 'getUsers', component: GetComponent, canActivate: [BlockedGuard]},
      {path: 'user/edit/:id', component: CreateAndEditComponent, canActivate: [BlockedGuard]},
      {path: 'user/register', component: CreateAndEditComponent, canActivate: [BlockedGuard]},
      {path: 'report', component: ReportComponent, canActivate: [BlockedGuard]},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutesHome),
  ],
  exports : [
    RouterModule
  ]
})
export class HomeRoutesModule { }
