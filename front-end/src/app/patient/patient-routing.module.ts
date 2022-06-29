import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { BillsComponent } from './bills/bills.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { HelpComponent } from './help/help.component';
import { LabTestsComponent } from './lab-tests/lab-tests.component';
import { MedicalInsuranceComponent } from './medical-insurance/medical-insurance.component';
import { PatientComponent } from './patient.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';
const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [

      {
        path: '',
        component: AppointmentsComponent
      },
      {
        path: 'prescription',
        component: PrescriptionComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'lab-tests',
        component: LabTestsComponent
      },
      {
        path: 'diagnosis',
        component: DiagnosisComponent
      },
      {
        path:'help',
        component: HelpComponent
      },
      {
        path:'medical-insurance',
        component: MedicalInsuranceComponent
      },
      {
        path:'bills',
        component: BillsComponent
      }
    ]
  },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
