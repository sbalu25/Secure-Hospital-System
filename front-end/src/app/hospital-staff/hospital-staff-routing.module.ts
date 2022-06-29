import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalStaffComponent } from './hospital-staff.component';
import { Routes, RouterModule } from '@angular/router';
import { PrescriptionListComponent } from '../doctor/prescription-list/prescription-list.component';
import { DiagnosisComponent } from '../lab-staff/diagnosis/diagnosis.component';
import { LabTestsListComponent } from '../doctor/lab-tests-list/lab-tests-list.component';
import { LabTestsComponent } from '../lab-staff/lab-tests/lab-tests.component';
import { RegisterComponent } from '../login/register/register.component';
import { PatientListComponent } from '../doctor/patient-list/patient-list.component';
import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HelpRequestsComponent } from './help-requests/help-requests.component';
import { BillsComponent } from './bills/bills.component';
const routes: Routes = [
  {
    path: '',
    component: HospitalStaffComponent,
    children:[
      {
        path:'',
        component:PatientListComponent
      },
      {
        path:'prescriptions',
        component:PrescriptionListComponent
      },
      {
        path:'diagnosis',
        component:DiagnosisComponent
      },
      {
        path:'lab-reports',
        component:LabTestsComponent
      },
      {
        path:'registration',
        component:RegisterComponent
      },
      {
        path:'appointments',
        component:AppointmentRequestsComponent
      },
      {
        path:'transactions',
        component:TransactionsComponent
      },
      {
        path:'help-request',
        component:HelpRequestsComponent
      },
      {
        path:'bills',
        component:BillsComponent
      }
    ]
  },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalStaffRoutingModule { }
