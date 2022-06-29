import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceComponent } from './insurance.component';
import { CreateInsuranceComponent } from './create-insurance/create-insurance.component';
import { ViewClaimsComponent } from './view-claims/view-claims.component';
import { AuthorizeFundsComponent } from './authorize-funds/authorize-funds.component';
import { InsuranceRoutingModule } from './insurance-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { PoliciesComponent } from './policies/policies.component';
import { CreatePolicyComponent } from './create-policy/create-policy.component';
import { AuthorizeClaimComponent } from './authorize-claim/authorize-claim.component';
import { FundsDispersalComponent } from './funds-dispersal/funds-dispersal.component';

@NgModule({
  declarations: [
    InsuranceComponent,
    CreateInsuranceComponent,
    ViewClaimsComponent,
    AuthorizeFundsComponent,
    PoliciesComponent,
    CreatePolicyComponent,
    AuthorizeClaimComponent,
    FundsDispersalComponent
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    AppMaterialModule
  ]
})
export class InsuranceModule { }
