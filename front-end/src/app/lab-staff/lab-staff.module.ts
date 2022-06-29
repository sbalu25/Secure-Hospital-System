import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabStaffComponent } from './lab-staff.component';
import { LabStaffRoutingModule } from './lab-staff-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { LabTestsComponent } from './lab-tests/lab-tests.component';
import { LabTestRequestsComponent } from './lab-test-requests/lab-test-requests.component';
import { UpdateReportComponent } from './update-report/update-report.component';
import { UpdateLabTestComponent } from './update-lab-test/update-lab-test.component';
@NgModule({
  declarations: [
    LabStaffComponent,
    DiagnosisComponent,
    LabTestsComponent,
    LabTestRequestsComponent,
    UpdateReportComponent,
    UpdateLabTestComponent
  ],
  imports: [
    CommonModule,
    LabStaffRoutingModule,
    AppMaterialModule
  ]
})
export class LabStaffModule { }
