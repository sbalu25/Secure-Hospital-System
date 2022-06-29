import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsuranceService } from 'src/app/services/insurance.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { AddInsuranceComponent } from '../add-insurance/add-insurance.component';

@Component({
  selector: 'app-medical-insurance',
  templateUrl: './medical-insurance.component.html',
  styleUrls: ['./medical-insurance.component.scss']
})
export class MedicalInsuranceComponent implements OnInit {
  userid:any;
  loggedInData:any;
  userinsurance:any;
  addInsuranceBoolean:boolean  =false;
  insurance_policies=[];
  constructor(private dialog:MatDialog, private loginService:LoginService, private userService:UserService, private insuranceService:InsuranceService) { 
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        console.log(this.userid);
        this.getInsurance();
        this.getUserDetails();
        this.getPolicies();
      }
    })
  }

  ngOnInit(): void {
  }
  getPolicies(){
    this.insuranceService.listPolicies().subscribe((data)=>{
      this.insurance_policies = data;
    })
  }
  getUserDetails(){
    this.userService.getUserById(this.userid).subscribe((data)=>{
      this.loggedInData = data;
    })
  }

  addInsurance(){
    const dialogRef = this.dialog.open(AddInsuranceComponent, {
      width: '70%',
      height:'80%',
      data: {
        id: this.loggedInData
      },
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getInsurance();
    });
  }
  getInsurance(){
    this.insuranceService.getInsurance(this.userid).subscribe((data)=>{
     if(data[0]){
        this.addInsuranceBoolean = false;
     }else{
       this.addInsuranceBoolean=true;
     }
      this.userinsurance = data[0];
    })
  }
  getPolicyName(policy){
   if(this.insurance_policies){
     policy = this.insurance_policies.find(insurance=> insurance.group_number == policy)
     return policy?.policy_name;
   }else{
     return "";
   }
  }

}
