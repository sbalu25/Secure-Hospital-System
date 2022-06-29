import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BillService } from 'src/app/services/bill.service';
import { LoginService } from 'src/app/services/login.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { TransactionRequestCreationComponent } from '../transaction-request-creation/transaction-request-creation.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  panelOpenState: boolean = false;
  transactionsList:any;
  loggedInData:any;
  userid:any;
  showProgressBar:boolean = true;
  constructor(public dialog: MatDialog,private transactionService:TransactionService,private loginService:LoginService,private userService:UserService, private snackBar:MatSnackBar, private billService:BillService) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        console.log(this.userid);
        this.getUserDetails();
      }
    })
   }

  ngOnInit(): void {
    this.listTransactions();
  }
  getUserDetails(){
    this.userService.getUserById(this.userid).subscribe((data)=>{
      this.loggedInData = data;
    })
  }
  createTransactionRequest(){
    const dialogRef = this.dialog.open(TransactionRequestCreationComponent, {
      width: '80%',
      height:'50%',
      data: {id: this.loggedInData},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listTransactions();
    });
  }
  listTransactions(){
    this.transactionService.listTransactions().subscribe((data)=>{
      this.transactionsList = data;
      console.log(data);
      this.showProgressBar=false;
    })
  }

  updateTransaction(status:any, index:any){
    let transaction = this.transactionsList[index];
    transaction.status = status;
    this.transactionService.udpateTransaction(transaction).subscribe((data)=>{
      this.snackBar.open("Transaction updated successfully", "", {duration:2000});
      if(status == "BillGenerated"){
        this.generateBill(transaction);
      }
    })
  }
  generateBill(transaction){
    let bill ={
      transaction_id: transaction?.id,
      insurance_id: transaction[0]?.id,
      patient_id: transaction?.patient_id,
      created_name: this.loggedInData?.first_name + " " + this.loggedInData?.last_name,
      created_id: this.loggedInData?.id
    }
    this.billService.createBill(bill).subscribe((data)=>{
      if(data == 'success'){
        this.snackBar.open("Bill generated successfully. Please visit bills section to see bills","", {duration:2000})
      }
    })
  }
  

}
