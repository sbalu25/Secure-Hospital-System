import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeRecordsComponent } from './employee-records/employee-records.component';
import { FilesComponent } from './files/files.component';
import { LogsComponent } from './logs/logs.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DiagnosisComponent } from '../lab-staff/diagnosis/diagnosis.component';
import { PrescriptionListComponent } from '../doctor/prescription-list/prescription-list.component';
import { LabTestsListComponent } from '../doctor/lab-tests-list/lab-tests-list.component';
import { PoliciesComponent } from '../insurance/policies/policies.component';
import { InsuranceClaimsComponent } from './insurance-claims/insurance-claims.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { AppointmentsComponent } from './appointments/appointments.component';



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [

      {
        path: '',
        component: EmployeeRecordsComponent
      },
      {
        path: 'files',
        component:FilesComponent
      },
      {
        path: 'logs',
        component:LogsComponent
      },
      {
        path: 'transaction',
        component:TransactionComponent
      },
      {
        path: 'diagnosis',
        component:DiagnosisComponent
      },
      {
        path: 'prescriptions',
        component:PrescriptionListComponent
      },
      {
        path: 'lab-tests',
        component:LabTestsListComponent
      },
      {
        path: 'policies',
        component:PoliciesComponent
      },
      {
        path: 'claims',
        component:InsuranceClaimsComponent
      },
      {
        path: 'insurance',
        component:InsuranceComponent
      },
      {
        path: 'appointments',
        component:AppointmentsComponent
      }
    ]
  },
  
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
