import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetComponent } from './get-component/get.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CreateAndEditComponent } from './create-and-edit-component/create-and-edit.component';



@NgModule({
  declarations: [GetComponent, CreateAndEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    GetComponent,
    CreateAndEditComponent,
  ]
})
export class UserModule { }
