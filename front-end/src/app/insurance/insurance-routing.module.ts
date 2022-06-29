import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceComponent } from './insurance.component';
import { ViewClaimsComponent } from './view-claims/view-claims.component';
import { RouterModule, Routes } from '@angular/router';
import { PoliciesComponent } from './policies/policies.component';
import { FundsDispersalComponent } from './funds-dispersal/funds-dispersal.component';
const routes: Routes = [
  {
    path: '',
    component: InsuranceComponent,
    children: [

      {
        path: '',
        component: ViewClaimsComponent
      },
      {
        path: 'policies',
        component: PoliciesComponent
      },
      {
        path: 'funds-dispersal',
        component: FundsDispersalComponent
      },
      
    ]
  },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
