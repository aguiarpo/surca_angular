import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetComponent } from './get-component/get.component';
import { EditComponent } from './edit/edit.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [GetComponent, EditComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    GetComponent,
    EditComponent
  ]
})
export class UserModule { }
