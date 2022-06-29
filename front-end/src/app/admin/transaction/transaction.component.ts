import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  userId:any;
  loggedinData:any;
  panelOpenState:boolean = false;
  transactionsList:any;
  showProgressBar: boolean = true;
  constructor(private loginService:LoginService,private userService:UserService,private transactionService:TransactionService, private snaackBar:MatSnackBar) {
    this.getTransactions();
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userId = parseInt(data.id);
        this.getUserDetails();
      }
    })
   }

  ngOnInit(): void {
    this.getTransactions();
  }
  getUserDetails(){
    this.userService.getUserById(this.userId).subscribe((data)=>{
      this.loggedinData = data;
    })
  }
  getTransactions(){
    this.transactionService.listTransactions().subscribe((data)=>{
      let transactionArray =[];
      for(let object of data){
        if(object.status == 'Pending'){
          transactionArray.push(object);
        }
      }
      this.transactionsList = transactionArray;
      this.showProgressBar=false;
    })
  }
  authorizeTransaction(transaction,status){
    this.showProgressBar=true;
    transaction.status = status;
    transaction.approved_by = this.loggedinData.first_name;
    transaction.approved_by_id = this.loggedinData.id
    this.transactionService.udpateTransaction(transaction).subscribe((data)=>{
      this.snaackBar.open("Transaction updated successfully", "", {duration:2000});
      this.getTransactions();
    })
  }

}
