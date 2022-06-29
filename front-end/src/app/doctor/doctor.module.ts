import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctor.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { DiagnosisListComponent } from './diagnosis-list/diagnosis-list.component';
import { LabTestsListComponent } from './lab-tests-list/lab-tests-list.component';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
import { AddDiagnosisComponent } from './add-diagnosis/add-diagnosis.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { AddLabTestsComponent } from './add-lab-tests/add-lab-tests.component';
import { EditDiagnosisComponent } from './edit-diagnosis/edit-diagnosis.component';

@NgModule({
  declarations: [
    DoctorComponent,
    DoctorDashboardComponent,
    PatientListComponent,
    PrescriptionListComponent,
    DiagnosisListComponent,
    LabTestsListComponent,
    AddPrescriptionComponent,
    AddDiagnosisComponent,
    EditPatientComponent,
    AddLabTestsComponent,
    EditDiagnosisComponent,
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    AppMaterialModule
  ]
})
export class DoctorModule { }
