import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LabtestsService } from 'src/app/services/labtests.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { AddLabTestsComponent } from '../add-lab-tests/add-lab-tests.component';
import { AddPrescriptionComponent } from '../add-prescription/add-prescription.component';

@Component({
  selector: 'app-lab-tests-list',
  templateUrl: './lab-tests-list.component.html',
  styleUrls: ['./lab-tests-list.component.scss']
})
export class LabTestsListComponent implements OnInit {
  labTestList: any;
  panelOpenState:boolean = false;
  loggedinData:any;
  userId:any;
  showProgressBar:boolean=true;
  constructor(private router:Router, private labTestService: LabtestsService, private loginService:LoginService,public dialog: MatDialog,private userService: UserService) { 
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userId = parseInt(data.id);
        console.log(this.userId);
        this.getUserDetails();
      }
    })
  }

  ngOnInit(): void {
    this.listLabTests();
  }
  addLabTests(){
    const dialogRef = this.dialog.open(AddLabTestsComponent, {
      width: '70%',
      height:'80%',
      data: {
        id: this.loggedinData
      },
    });
    dialogRef.afterClosed().subscribe(result => {
        this.listLabTests();
    });
  }
  listLabTests(){
    this.labTestService.listLabTests().subscribe((data)=>{
      console.log(data);
      this.labTestList = data;
      this.showProgressBar=false;
    })
  }
  getUserDetails(){
    this.userService.getUserById(this.userId).subscribe((data)=>{
      this.loggedinData = data;
    })
  }

}
