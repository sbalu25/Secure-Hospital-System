import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsuranceService } from 'src/app/services/insurance.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { AuthorizeClaimComponent } from '../authorize-claim/authorize-claim.component';

@Component({
  selector: 'app-view-claims',
  templateUrl: './view-claims.component.html',
  styleUrls: ['./view-claims.component.scss']
})
export class ViewClaimsComponent implements OnInit {
  showProgressBar: boolean = true;
  claimsList:any;
  panelOpenState: boolean = false;
  userId:any;
  loggedinData:any;
  constructor(private loginService:LoginService, private userService:UserService, private insuranceService:InsuranceService, private dialog:MatDialog, private snackBar: MatSnackBar) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userId = parseInt(data.id);
        this.getUserDetails();
        this.getClaimRequests();
      }
    })
   }

  ngOnInit(): void {
  }
  authorizeClaims(index, status){
    if(status == 'Rejected'){
      const dialogRef = this.dialog.open(AuthorizeClaimComponent, {
        width: '70%',
        height:'80%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result?.comments){
          this.claimsList[index].comments = result.comments;
          this.claimsList[index].status = "Approved";
          this.claimsList[index].updated_by = this.loggedinData?.first_name + " " + this.loggedinData?.last_name;
        }
        this.authorizeClaimRequest(this.claimsList[index])
          // this.getClaimRequests();
      });
    }else{
      this.claimsList[index].status = "Approved";
      this.claimsList[index].updated_by = this.loggedinData.first_name + " " + this.loggedinData.last_name;
      this.authorizeClaimRequest(this.claimsList[index])
    }
  }
  authorizeClaimRequest(claim){
    this.insuranceService.authorizeClaims(claim).subscribe((data)=>{
      if(data == 'success'){
        this.snackBar.open("Claim request authorized successfully", "", {duration:2000});
      }
    })
  }
  getUserDetails(){
    this.userService.getUserById(this.userId).subscribe((data)=>{
      this.loggedinData = data;
    })
  }

  getClaimRequests(){
    this.insuranceService.listClaims().subscribe((data)=>{
      let claims = [];
      for(let claim of data){
        if(claim?.status == "Pending"){
          claims.push(claim)
        }
      }
      this.claimsList = claims;
      this.showProgressBar=false;
    })
  }

}
