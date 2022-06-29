import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from '../patient/patient.component';
import { PatientRoutingModule } from './patient-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { LabTestsComponent } from './lab-tests/lab-tests.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';
import { HelpComponent } from './help/help.component';
import { MedicalInsuranceComponent } from './medical-insurance/medical-insurance.component';
import { ClaimInsuranceComponent } from './claim-insurance/claim-insurance.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { PreviewClaimRequestComponent } from './preview-claim-request/preview-claim-request.component';
import { BillsComponent } from './bills/bills.component';

@NgModule({
  declarations: [
  
    PatientComponent,
       BookAppointmentComponent,
       AppointmentsComponent,
       PrescriptionComponent,
       ProfileComponent,
       TransactionsComponent,
       LabTestsComponent,
       DiagnosisComponent,
       VirtualKeyboardComponent,
       HelpComponent,
       MedicalInsuranceComponent,
       ClaimInsuranceComponent,
       AddInsuranceComponent,
       PreviewClaimRequestComponent,
       BillsComponent
    
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    AppMaterialModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientModule { }
