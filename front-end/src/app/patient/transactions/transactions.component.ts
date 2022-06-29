import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsuranceService } from 'src/app/services/insurance.service';
import { LoginService } from 'src/app/services/login.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { VerificationService } from 'src/app/services/verification.service';
import { PreviewClaimRequestComponent } from '../preview-claim-request/preview-claim-request.component';
import { VirtualKeyboardComponent } from '../virtual-keyboard/virtual-keyboard.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  panelOpenState: boolean = false;
  transactionsList: any;
  loginData: any;
  userid: number;
  showProgressBar: boolean = true;
  accountVerified: boolean = false;
  userinsurance: any;
  constructor(private loginService: LoginService, private transactionService: TransactionService, private userService: UserService, public dialog: MatDialog, private insuranceService: InsuranceService, private emailService: VerificationService ) {
    this.loginService.userid.subscribe((data) => {
      if (data.id) {
        this.userid = parseInt(data.id);
        console.log(this.userid);
        this.listTransactions();
        this.getUserDetails();
        this.getInsurance();
      }
    })
  }

  ngOnInit(): void {
    // this.listTransactions();
  }
  getUserDetails() {
    this.userService.getUserById(this.userid).subscribe((data) => {
      this.loginData = data;
    })
  }
  claimRequest(index) {
    let transaction = this.transactionsList[index];
    const dialogRef = this.dialog.open(PreviewClaimRequestComponent, {
      width: '70%',
      height: '80%',
      data: {loginData:this.loginData, insuranceData:this.userinsurance, transaction:transaction},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listTransactions();
      if (result?.result == 'success') {
      }
    });
  }
  getInsurance() {
    this.insuranceService.getInsurance(this.userid).subscribe((data) => {
      this.userinsurance = data[0];
    })
  }

  backToHome() {
    window.history.back();
  }
  listTransactions() {
    this.transactionService.getPatientTransactions(this.userid).subscribe((data) => {
      this.transactionsList = data;
      this.showProgressBar = false
    })
  }
  generateOtp() {
    this.emailService.generateOtp(this.loginData?.email).subscribe((data)=>{
      if(data == 'success'){
        const dialogRef = this.dialog.open(VirtualKeyboardComponent, {
          width: '70%',
          height: '80%',
          data: this.loginData
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result?.result == 'success') {
            this.accountVerified = true;
          }
        });
      }
    })


  }

}
