import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { EmployeeRecordsComponent } from './employee-records/employee-records.component';
import { FilesComponent } from './files/files.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LogsComponent } from './logs/logs.component';
import { AppMaterialModule } from '../app-material.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { InsuranceClaimsComponent } from './insurance-claims/insurance-claims.component';



@NgModule({
  declarations: [
    AdminComponent,
    EmployeeRecordsComponent,
    FilesComponent,
    TransactionComponent,
    LogsComponent,
    CreateUserComponent,
    InsuranceComponent,
    AppointmentsComponent,
    InsuranceClaimsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppMaterialModule
  ]
})
export class AdminModule { }
