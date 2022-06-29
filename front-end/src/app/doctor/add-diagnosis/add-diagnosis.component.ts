import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiagnosisServiceService } from 'src/app/services/diagnosis-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-diagnosis',
  templateUrl: './add-diagnosis.component.html',
  styleUrls: ['./add-diagnosis.component.scss']
})
export class AddDiagnosisComponent implements OnInit {
  diagnosisForm = new FormGroup({
    patient:new FormControl(''),
    fever: new FormControl(''),
    headache: new FormControl(''),
    nausea: new FormControl(''),
    body_aches: new FormControl(''),
    cough: new FormControl(''),
    cold: new FormControl(''),
    sore_throat: new FormControl(''),
    diarrhea: new FormControl(''),
    other: new FormControl(''),
    previous_medications: new FormControl(''),
    drug_history: new FormControl(''),
    notes: new FormControl(''),
  })
  loggedInData : any;
  selectedPatient: any;
  patientsList:any=[];
  patientDetails:any;
  showProgressBar:boolean=false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<AddDiagnosisComponent>,private snackBar: MatSnackBar, private diagnosisServcie: DiagnosisServiceService,private userService: UserService) { 
    this.loggedInData = this.data.id;
  }

  ngOnInit(): void {
    this.getPatientsList();
  }
  addDiagnosis() {
    this.showProgressBar=true;
    let selectedUser = this.diagnosisForm.get("patient").value;
    let symptoms ='';
    if(this.diagnosisForm.get("fever").value ==true){
      symptoms = symptoms + ',fever'
    }
    if(this.diagnosisForm.get("headache").value ==true){
      symptoms = symptoms + ',headache'
    }
    if(this.diagnosisForm.get("nausea").value ==true){
      symptoms = symptoms + ',Nausea'
    }
    if(this.diagnosisForm.get("body_aches").value ==true){
      symptoms = symptoms + ',Body Aches'
    }
    if(this.diagnosisForm.get("cough").value ==true){
      symptoms = symptoms + ',cough'
    }
    if(this.diagnosisForm.get("cold").value ==true){
      symptoms = symptoms + ',cold'
    }
    if(this.diagnosisForm.get("sore_throat").value ==true){
      symptoms = symptoms + ',sore_throat'
    }
    if(this.diagnosisForm.get("diarrhea").value ==true){
      symptoms = symptoms + ',diarrhea'
    }
    if(this.diagnosisForm.get("other").value ==true){
      symptoms = symptoms + ',other'
    }
      let request = {
        diagnosis_id:null,
        symptoms: symptoms.substring(1),
        // doctor_id: this.loggedInData?.id,
        doctor_id:this.loggedInData.id,
        patient_id: this.patientsList[selectedUser]?.id,
        doctor_name:this.loggedInData?.first_name,
        patient_name:this.patientsList[selectedUser]?.first_name,
        previous_medications:this.diagnosisForm.get("previous_medications").value,
        drug_history: this.diagnosisForm.get("drug_history").value,
        notes: this.diagnosisForm.get("notes").value,
        time: new Date()
      }
      this.diagnosisServcie.createDiagnosis(request).subscribe((data)=>{
        if(data == 'success'){
          this.snackBar.open("Diagnosis created successfully.", "", {duration:2000})
        }
        this.showProgressBar=false;;
        console.log(data);
        this.matDialog.close();
      })

  }
  getPatientsList(){
    this.userService.getPatients().subscribe((data)=>{
      console.log(data);
      this.patientsList=data;
    })
  }
  selectPatient(event){
    console.log(event);
    this.patientDetails = event.source._value
  }

}
