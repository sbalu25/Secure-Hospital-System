import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {
    path: '',
    component:LoginComponent,
    children: [
      {
        path: '',
        component:LoginFormComponent
      },
      {
        path:'register',
        component: RegisterComponent
      }
    ]
  },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
