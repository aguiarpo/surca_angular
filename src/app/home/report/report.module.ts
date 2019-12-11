import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import {FormsModule} from '@angular/forms';
import { ExcelService } from './report/service/excel.service';
import {GetReportService} from './report/service/get-report.service';


@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [ExcelService, GetReportService],
  exports:  [ReportComponent]
})
export class ReportModule { }
