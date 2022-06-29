import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren:()=>import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'patient/:id',
    loadChildren:()=>import('./patient/patient.module').then(m => m.PatientModule)
  },
  {
    path:'doctor/:id',
    loadChildren:()=>import('./doctor/doctor.module').then(m=>m.DoctorModule)
  },
  {
    path:'lab-staff/:id',
    loadChildren:()=>import('./lab-staff/lab-staff.module').then(m=>m.LabStaffModule)
  },
  {
    path:'hospital-staff/:id',
    loadChildren:()=>import('./hospital-staff/hospital-staff.module').then(m=>m.HospitalStaffModule)
  },
  {
    path: 'admin/:id',
    loadChildren:()=>import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'insurance-staff/:id',
    loadChildren:()=>import('./insurance/insurance.module').then(m => m.InsuranceModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
