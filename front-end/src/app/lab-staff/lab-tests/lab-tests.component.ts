import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditDiagnosisComponent } from 'src/app/doctor/edit-diagnosis/edit-diagnosis.component';
import { LabtestsService } from 'src/app/services/labtests.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateReportComponent } from '../update-report/update-report.component';

@Component({
  selector: 'app-lab-tests',
  templateUrl: './lab-tests.component.html',
  styleUrls: ['./lab-tests.component.scss']
})
export class LabTestsComponent implements OnInit {
  panelOpenState: boolean = false;
  loggedInUser: String=''
  labTestList: any;
  userid:any;
  loggedInData:any;
  showProgressBar:boolean = true;
  constructor(private snackBar: MatSnackBar, private loginService: LoginService, private labTestsService: LabtestsService,private userService:UserService,public dialog: MatDialog) {
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
  editLabTests(test){
    const dialogRef = this.dialog.open(UpdateReportComponent, {
      width: '70%',
      height:'80%',
      data: {labTest: test,loginUser:this.loggedInData},
    });
    dialogRef.afterClosed().subscribe(result => {
        this.listLabTests();
    });
  }
  listLabTests(){
    this.showProgressBar=true;
    this.labTestsService.listLabTests().subscribe((data)=>{
      let labTests=[];
      for(let test of data){
        if(test.status == 'Approved'){
          labTests.push(test)
        }
      }
      this.labTestList = labTests;
      this.showProgressBar=false;
    })
  }
  deleteLabTests(id){
    this.labTestsService.delete(id).subscribe((data)=>{
      if(data == "success"){
        this.snackBar.open("Lab test deleted successfully.", "", {duration:2000})
      }
      this.listLabTests();

    })
  }
  

}
