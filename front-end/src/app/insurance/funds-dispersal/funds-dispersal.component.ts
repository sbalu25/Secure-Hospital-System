import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsuranceService } from 'src/app/services/insurance.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { AuthorizeFundsComponent } from '../authorize-funds/authorize-funds.component';

@Component({
  selector: 'app-funds-dispersal',
  templateUrl: './funds-dispersal.component.html',
  styleUrls: ['./funds-dispersal.component.scss']
})
export class FundsDispersalComponent implements OnInit {
  showProgressBar: boolean = true;
  panelOpenState: boolean = false;
  fundsRequestList=[];
  userId:any;
  loggedinData:any
  constructor(private dialog: MatDialog, private loginService:LoginService, private userService:UserService, private insuranceService:InsuranceService) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userId = parseInt(data.id);
        this.getUserDetails();
        this.getClaims();
      }
    })
   }

  ngOnInit(): void {
  }
  getUserDetails(){
    this.userService.getUserById(this.userId).subscribe((data)=>{
      this.loggedinData = data;
    })
  }
  getClaims(){
    this.insuranceService.listClaims().subscribe((data)=>{
      let claims =[];
      for(let claim of data){
        if(claim?.status == "Approved"){
          claims.push(claim)
        }
      }
      this.fundsRequestList = claims;
      this.showProgressBar=false;
    })
  }
  authorizeFunds(index){
    const dialogRef = this.dialog.open(AuthorizeFundsComponent, {
      width: '70%',
      height:'80%',
      data: {
        id: this.loggedinData,
        claim: this.fundsRequestList[index]
      },
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getClaims();
    });
  }

}
