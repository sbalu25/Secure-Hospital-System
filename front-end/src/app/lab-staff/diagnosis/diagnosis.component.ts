import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiagnosisServiceService } from 'src/app/services/diagnosis-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  diagnosisList: any;
  userid:any
  loggedInData:any;
  showProgressBar:boolean = true;
  constructor(private router: Router, private diagnosisService: DiagnosisServiceService,private loginService:LoginService,private userService:UserService) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        console.log(this.userid);
        this.getUserDetails();
      }
    })
   }

  ngOnInit(): void {
    this.listDiagnosis();

  }
  getUserDetails(){
    this.userService.getUserById(this.userid).subscribe((data)=>{
      this.loggedInData = data;
    })
  }
  listDiagnosis(){
    this.diagnosisService.listDiagnosis().subscribe((data)=>{
      this.diagnosisList = data;
      this.showProgressBar=false;
    })
  }

}
