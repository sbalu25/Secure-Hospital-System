import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PrescriptionService } from 'src/app/services/prescription.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  prescriptionList:any;
  loginData:any;
  userid:any;
  panelOpenState:boolean = false;
  showProgressBar:boolean =true;
  constructor(private loginService: LoginService, private prescriptionService: PrescriptionService) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        this.listPrescriptions();
      }
    })
   }

  ngOnInit(): void {
    // this.prescriptionList();
  }
  backToHome(){
    window.history.back();
  }
  listPrescriptions(){
    this.prescriptionService.getPatientPrescriptions(this.userid).subscribe((data)=>{
      this.prescriptionList = data;
      this.showProgressBar=false;
    })
  }

}
