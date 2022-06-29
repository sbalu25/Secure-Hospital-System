import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LabStaffComponent } from './lab-staff.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { LabTestsComponent } from './lab-tests/lab-tests.component';
import { LabTestRequestsComponent } from './lab-test-requests/lab-test-requests.component';
import { UpdateReportComponent } from './update-report/update-report.component';
const routes: Routes = [
  {
    path: '',
    component: LabStaffComponent,
    // redirectTo: '',
    children:[
      {
        path:'',
        component:DiagnosisComponent
      },
      {
        path:'lab-tests',
        component:LabTestsComponent
      },
      {
        path:'lab-requests',
        component: LabTestRequestsComponent
      },
      {
        path:'update-lab-reports',
        component: UpdateReportComponent
      }
    ]
  },
];


@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabStaffRoutingModule { }
