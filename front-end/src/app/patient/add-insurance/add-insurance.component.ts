import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.scss']
})
export class AddInsuranceComponent implements OnInit {
  showProgressBar: boolean = false;
  insuranceForm = new FormGroup({
    insurance_id: new FormControl(''),
    group_number: new FormControl(''),
    company: new FormControl('')
  })
  loginData:any;
  insurance_policies:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<AddInsuranceComponent>, private insuranceService: InsuranceService, private snackBar: MatSnackBar) {
    this.loginData = this.data.id;
    console.log(this.data);
   }

  ngOnInit(): void {
    this.getPolicies()
  }
  addInsurance(){
    let policy_index = this.insuranceForm.get("group_number").value
    let request ={
      patient_id: this.loginData?.id,
      insurance_id: this.insuranceForm.get("insurance_id")?.value,
      patient_name: this.loginData?.first_name + " " + this.loginData?.last_name,
      group_number: this.insurance_policies[policy_index]?.group_number,
      insurance_company: this.insuranceForm.get("company")?.value,
      created_by: this.loginData?.first_name + " " + this.loginData?.last_name,
      date_of_birth: this.loginData?.date_of_birth,
      address: this.loginData?.address,
      state: this.loginData?.state,
      city: this.loginData?.city,
      country: this.loginData?.country,
      policy_name: this.insurance_policies[policy_index]?.policy_name
    }
    this.insuranceService.addInsurance(request).subscribe((data)=>{
        if(data == "success"){
          this.snackBar.open("Insurance added successfully", "", {duration:2000});
          this.matDialog.close();
        }
    })


  }
  getPolicies(){
    this.insuranceService.listPolicies().subscribe((data)=>{
      this.insurance_policies = data;
    })
  }

}
