import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalStaffComponent } from './hospital-staff.component';
import { HospitalStaffRoutingModule } from './hospital-staff-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionRequestCreationComponent } from './transaction-request-creation/transaction-request-creation.component';
import { HelpRequestsComponent } from './help-requests/help-requests.component';
import { BillsComponent } from './bills/bills.component';



@NgModule({
  declarations: [
    HospitalStaffComponent,
    AppointmentRequestsComponent,
    TransactionsComponent,
    TransactionRequestCreationComponent,
    HelpRequestsComponent,
    BillsComponent
  ],
  imports: [
    CommonModule,
    HospitalStaffRoutingModule,
    AppMaterialModule
  ]
})
export class HospitalStaffModule { }
