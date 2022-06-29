import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { DiagnosisListComponent } from './diagnosis-list/diagnosis-list.component';
import { LabTestsListComponent } from './lab-tests-list/lab-tests-list.component';
const routes: Routes = [
  {
    path: '',
    component:DoctorDashboardComponent,
    children: [
      {
        path: '',
        component:PatientListComponent
      },
      {
        path: 'prescriptions',
        component:PrescriptionListComponent
      },
      {
        path: 'diagnosis',
        component:DiagnosisListComponent
      },
      {
        path: 'lab-tests',
        component:LabTestsListComponent
      },
    ]
  },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
