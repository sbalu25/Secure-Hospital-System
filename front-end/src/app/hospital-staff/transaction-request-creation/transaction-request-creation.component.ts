import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transaction-request-creation',
  templateUrl: './transaction-request-creation.component.html',
  styleUrls: ['./transaction-request-creation.component.scss']
})
export class TransactionRequestCreationComponent implements OnInit {
  creationForm = new FormGroup({
    transactionType: new FormControl(''),
    comments: new FormControl(''),
    amount: new FormControl(''),
    patient:new FormControl('')
  })
  loginData :any;
  patientsList:any;
  showProgressBar:boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<TransactionRequestCreationComponent>,private transactionService: TransactionService, private snackBar:MatSnackBar,private userService:UserService) {
    this.loginData = this.data.id;
   }

  ngOnInit(): void {
    this.getPatientsList();
  }
  createTransaction(){
    this.showProgressBar=true;
    let selectedUser = this.creationForm.get("patient").value;
    console.log(this.creationForm.get("transactionType").value);
    console.log(this.creationForm.get("comments").value);
    console.log(this.creationForm.get("amount").value);
    let request={
      status:'Pending',
      transaction_type: this.creationForm.get("transactionType").value,
      notes:this.creationForm.get("comments").value,
      amount:this.creationForm.get("amount").value,
      time: new Date(),
      patient_name:this.patientsList[selectedUser]?.first_name,
      patient_id: this.patientsList[selectedUser]?.id,
      created_by: this.loginData.first_name

    }
    this.transactionService.createTransaction(request).subscribe((data)=>{
      if(data == 'success'){
        this.snackBar.open("Transaction created successfully.", "", {duration:2000})
      }
      console.log(data);
      this.matDialog.close();
      this.showProgressBar=false;
    })

  }
  getPatientsList(){
    this.userService.getPatients().subscribe((data)=>{
      console.log(data);
      this.patientsList=data;
      this.showProgressBar=false;
    })
  }


}
