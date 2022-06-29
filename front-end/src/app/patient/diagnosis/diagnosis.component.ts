import { Component, OnInit } from '@angular/core';
import { DiagnosisServiceService } from 'src/app/services/diagnosis-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  userid:any;
  diagnosisList:any;
  showProgressBar:boolean = true;
  constructor(private loginService:LoginService,private diagnosisService:DiagnosisServiceService) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        this.listDiagnosis(this.userid);
      }
    })
   }

  ngOnInit(): void {
  }
  listDiagnosis(id:any){
    this.diagnosisService.getDiagnosisById(id).subscribe((data)=>{
      this.diagnosisList = data;
      this.showProgressBar=false;
    })
  }

}
