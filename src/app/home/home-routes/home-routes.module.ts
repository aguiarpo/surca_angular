import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetComponent } from '../user/get-component/get.component';
import {HomeComponent} from '../home/home.component';
import { BlockedGuard } from '../../guard/blocked.guard';
import {EditComponent} from '../user/edit/edit.component';

const appRoutesHome: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [BlockedGuard],
    children: [
      {path: 'getUsers', component: GetComponent},
      {path: 'edit/:id', component: EditComponent}
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
