import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss']
})
export class CreatePolicyComponent implements OnInit {
  loggedInData: any;
  role: any;
  showProgressBar:boolean = false;
  policyForm= new FormGroup({
    policy_name: new FormControl(),
    coverage_percentage: new FormControl(),
    company_name: new FormControl()
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<CreatePolicyComponent>,private insuranceService: InsuranceService, public snackBar: MatSnackBar) {
    this.loggedInData = this.data.id;
    this.role = this.loggedInData?.role
   }

  ngOnInit(): void {
  }
  createPolicy(){
    this.showProgressBar = true;
    let request = {
      policy_name : this.policyForm.get("policy_name").value,
      coverage_percentage: this.policyForm.get("coverage_percentage").value,
      company_name: this.policyForm.get("company_name").value,
      created_by: this.loggedInData?.id,
      created_name: this.loggedInData?. first_name + " " + this.loggedInData?.last_name
    }
    this.insuranceService.createPolicies(request).subscribe((data)=>{
      if(data == "success"){
        this.snackBar.open("Insurance policy created successfully", "", {duration:2000});
        this.matDialog.close();
        this.showProgressBar=false;
      }
    })

  }

}
