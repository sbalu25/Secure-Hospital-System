import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-authorize-funds',
  templateUrl: './authorize-funds.component.html',
  styleUrls: ['./authorize-funds.component.scss']
})
export class AuthorizeFundsComponent implements OnInit {
  showProgressBar: boolean = false;
  authorizeForm=new FormGroup({
    amount_claimed: new FormControl(),
    comments: new FormControl()
  })
  loginData:any;
  claim:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<AuthorizeFundsComponent>, private insuranceService: InsuranceService, private snackBar: MatSnackBar) {
    this.loginData = data.id;
    this.claim = data.claim;
   }

  ngOnInit(): void {
  }
  authorizeFunds(){
    this.showProgressBar = true;
    this.claim.comments = this. authorizeForm.get("comments").value;
    this.claim.amount_claimed = this.authorizeForm.get("amount_claimed").value;
    this.claim.status = "Dispersed"
    this.claim.updated_by = this.loginData?.first_name + " " + this.loginData?.last_name;
    this.insuranceService.authorizeClaims(this.claim).subscribe((data)=>{
      if(data == "success"){
        this.snackBar.open("Funds dispersed successfully", "", {duration:2000});
        this.matDialog.close();
      }
    })
  }
  


}
