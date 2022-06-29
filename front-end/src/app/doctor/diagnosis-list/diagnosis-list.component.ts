import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagnosisServiceService } from 'src/app/services/diagnosis-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { AddDiagnosisComponent } from '../add-diagnosis/add-diagnosis.component';
import { EditDiagnosisComponent } from '../edit-diagnosis/edit-diagnosis.component';

@Component({
  selector: 'app-diagnosis-list',
  templateUrl: './diagnosis-list.component.html',
  styleUrls: ['./diagnosis-list.component.scss']
})
export class DiagnosisListComponent implements OnInit {
  loggedInUser: String=''
  diagnosisData: any;
  userid: any;
  loggedInData:any;
  showProgressBar:boolean = true;
  constructor(private router: Router, private userService: UserService, private loginService: LoginService, private diagnosisService: DiagnosisServiceService, private activatedRoute: ActivatedRoute,public dialog: MatDialog) { 
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
  addDiagnosis(){
    const dialogRef = this.dialog.open(AddDiagnosisComponent, {
      width: '70%',
      height:'80%',
      data: {
        id: this.loggedInData
      },
    });
    dialogRef.afterClosed().subscribe(result => {
        this.listDiagnosis();
    });
  }
  getUserDetails(){
    this.userService.getUserById(this.userid).subscribe((data)=>{
      this.loggedInData = data;
    })
  }
  editDiagnosis(diagnosis){
    const dialogRef = this.dialog.open(EditDiagnosisComponent, {
      width: '70%',
      height:'80%',
      data: {diagnosis: diagnosis,loginUser:this.loggedInData},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result?.message == 'success'){
        this.listDiagnosis();
      }
    });
  }
  listDiagnosis(){
    this.showProgressBar=true;
    this.diagnosisService.listDiagnosis().subscribe((data)=>{
      console.log(data);
      this.diagnosisData = data;
      this.showProgressBar=false;
    })
  }
  deleteDiagnosis(id){
    this.showProgressBar=true;
    console.log(id);
    this.diagnosisService.deleteDiagnosis(id).subscribe((data)=>{
      this.listDiagnosis();
    })
  }

}
