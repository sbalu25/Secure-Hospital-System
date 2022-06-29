import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LabtestsService } from 'src/app/services/labtests.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lab-test-requests',
  templateUrl: './lab-test-requests.component.html',
  styleUrls: ['./lab-test-requests.component.scss']
})
export class LabTestRequestsComponent implements OnInit {
  panelOpenState:boolean=false;
  labTestList: any;
  userid:any;
  loggedInData:any;
  showProgressBar:boolean = true;
  constructor(private router:Router, private labTestsService: LabtestsService,private loginService:LoginService,private userService:UserService, private snackBar:MatSnackBar) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        console.log(this.userid);
        this.getUserDetails();
      }
    })
   }

  ngOnInit(): void {
    this.listLabTests();
  }
  getUserDetails(){
    this.userService.getUserById(this.userid).subscribe((data)=>{
      this.loggedInData = data;
    })
  }
  listLabTests(){
    this.showProgressBar=true;
    this.labTestsService.listLabTests().subscribe((data)=>{
      let labTestArray =[];
      for(let object of data){
        if(object.status == 'Pending'){
          labTestArray.push(object);
        }
      }
      this.showProgressBar=false;
      this.labTestList = labTestArray;
    })
  }
  authorizeLabTests(labtest, status){
    labtest.status = status;
    this.labTestsService.authorizeLabTest(labtest).subscribe((data)=>{
      if(data == "success"){
        this.snackBar.open("Lab test Authorized successfully.", "", {duration:2000})
      }
      this.listLabTests();
    })
  }

}
