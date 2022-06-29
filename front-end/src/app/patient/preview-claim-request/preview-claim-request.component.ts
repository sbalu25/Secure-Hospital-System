import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-preview-claim-request',
  templateUrl: './preview-claim-request.component.html',
  styleUrls: ['./preview-claim-request.component.scss']
})
export class PreviewClaimRequestComponent implements OnInit {
  showProgressBar: boolean = false;
  loginData:any;
  insuranceData:any;
  transaction:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<PreviewClaimRequestComponent>,private insuranceService:InsuranceService, private snackBar: MatSnackBar) {
    this.loginData = data?.loginData;
    this.insuranceData = data?.insuranceData;
    this.transaction = data?.transaction;
   }

  ngOnInit(): void {
  }

  confirmClaimRequest(){
    let request = {
      patient_id: this.loginData?.id,
      policy_id: this.insuranceData?.insurance_id,
      // policy_name: this.insuranceData?.policy_name,
      policy_name: "silver",
      transaction_id: this.transaction?.transaction_id,
      status: "Pending",
      created_by: this.loginData?.first_name + " " + this.loginData?.last_name,
      patient_name: this.loginData?.first_name+ " " + this.loginData?.last_name,
      patient_email: this.loginData?.email,
      group_number: this.insuranceData?.group_number
    }
    this.insuranceService.createClaim(request).subscribe((data)=>{
        if(data == 'success'){
          this.snackBar.open("Insurance claim raised succesfully", "", {duration:2000});
          this.matDialog.close();
        }
    })
  }

}
