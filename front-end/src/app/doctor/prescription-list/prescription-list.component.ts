import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { UserService } from 'src/app/services/user.service';
import { AddPrescriptionComponent } from '../add-prescription/add-prescription.component';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.scss']
})
export class PrescriptionListComponent implements OnInit {
  loggedInUser: String=''
  loggedinData:any;
  prescriptions: any;
  userId:any;
  panelOpenState:boolean = false;
  showProgressBar:boolean = true;
  constructor(private router: Router, private loginService: LoginService, private prescriptionService: PrescriptionService,public dialog: MatDialog,private userService: UserService) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userId = parseInt(data.id);
        console.log(this.userId);
        this.getUserDetails();
      }
    })
   }

  ngOnInit(): void {
    this.listPrescription()
  }
  addPrescription(){
    const dialogRef = this.dialog.open(AddPrescriptionComponent, {
      width: '70%',
      height:'80%',
      data: {
        id: this.loggedinData
      },
    });
    dialogRef.afterClosed().subscribe(result => {
        this.listPrescription();
    });
  }
  listPrescription(){
    this.prescriptionService.listPrescriptions().subscribe((data)=>{
      console.log(data);
      this.prescriptions = data;
      this.showProgressBar=false;
    })
  }
  getUserDetails(){
    this.userService.getUserById(this.userId).subscribe((data)=>{
      this.loggedinData = data;
    })
  }


}
