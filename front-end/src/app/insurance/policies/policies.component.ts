import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsuranceService } from 'src/app/services/insurance.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { CreatePolicyComponent } from '../create-policy/create-policy.component';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  showProgressBar: boolean = true;
  policyList:any;
  panelOpenState: boolean = false;
  userId:any;
  loggedinData:any;
  constructor(public dialog: MatDialog, private loginService: LoginService, private userService: UserService, private insuranceService: InsuranceService) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userId = parseInt(data.id);
        this.getUserDetails();
      }
    })
   }

  ngOnInit(): void {
    this.getPolicies();
  }
  addPolicies(){
    const dialogRef = this.dialog.open(CreatePolicyComponent, {
      width: '70%',
      height:'80%',
      data: {
        id: this.loggedinData
      },
    });
    dialogRef.afterClosed().subscribe(result => {
        // this.listLabTests();
        this.getPolicies();
    });


  }
  getPolicies(){
    this.insuranceService.listPolicies().subscribe((data)=>{
      this.policyList = data;
      this.showProgressBar= false;
    })
  }
  getUserDetails(){
    this.userService.getUserById(this.userId).subscribe((data)=>{
      this.loggedinData = data;
    })
  }

}
