import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddLabTestsComponent } from 'src/app/doctor/add-lab-tests/add-lab-tests.component';
import { LabtestsService } from 'src/app/services/labtests.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { VerificationService } from 'src/app/services/verification.service';
import { VirtualKeyboardComponent } from '../virtual-keyboard/virtual-keyboard.component';

@Component({
  selector: 'app-lab-tests',
  templateUrl: './lab-tests.component.html',
  styleUrls: ['./lab-tests.component.scss']
})
export class LabTestsComponent implements OnInit {
  panelOpenState:boolean = false;
  loginData:any;
  labTestLists:any;
  userid:any;
  loggedinData:any;
  showProgressBar:boolean = true;
  accountVerified: boolean = false;
  constructor(private labtestService: LabtestsService,private loginService: LoginService,public dialog: MatDialog,private userService: UserService, private emailService:VerificationService) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        this.listLabTests();
        this.getUserDetails();
      }
    })
   }

  ngOnInit(): void {
    // this.loginData = this.loginService.loggedInData;
  }
  listLabTests(){
    this.labtestService.listByPatientId(this.userid).subscribe((data)=>{
        this.labTestLists = data;
        this.showProgressBar=false;
    })
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
  getUserDetails(){
    this.userService.getUserById(this.userid).subscribe((data)=>{
      this.loggedinData = data;
    })
  }
  generateOtp() {
    this.emailService.generateOtp(this.loggedinData?.email).subscribe((data)=>{
      if(data == 'success'){
        const dialogRef = this.dialog.open(VirtualKeyboardComponent, {
          width: '70%',
          height: '80%',
          data: this.loggedinData
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
