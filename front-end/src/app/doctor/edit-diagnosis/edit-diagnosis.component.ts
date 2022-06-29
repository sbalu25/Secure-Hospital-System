import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiagnosisServiceService } from 'src/app/services/diagnosis-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-diagnosis',
  templateUrl: './edit-diagnosis.component.html',
  styleUrls: ['./edit-diagnosis.component.scss']
})
export class EditDiagnosisComponent implements OnInit {
  diagnosisForm = new FormGroup({
    fever: new FormControl(false),
    headache: new FormControl(false),
    nausea: new FormControl(false),
    body_aches: new FormControl(false),
    cough: new FormControl(false),
    cold: new FormControl(false),
    sore_throat: new FormControl(false),
    diarrhea: new FormControl(false),
    other: new FormControl(false),
    previous_medications: new FormControl(''),
    drug_history: new FormControl(''),
    notes: new FormControl(''),
  })
  diagnosis:any
  selectedPatient:any;
  loggedInData:any;
  showProgressBar:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<EditDiagnosisComponent>,private diagnosisServcie: DiagnosisServiceService, private snackBar: MatSnackBar) {
    console.log(data);
    this.diagnosis = data.diagnosis;
    this.loggedInData = data.loginUser;
    let arr = this.diagnosis.symptoms;
    if(arr.includes('fever')){
      this.diagnosisForm.get("fever").setValue(true)
    }
    if(arr.includes('headache')){
      this.diagnosisForm.get("headache").setValue(true)
    }
    if(arr.includes('Nausea')){
      this.diagnosisForm.get("nausea").setValue(true)
    }
    if(arr.includes('Body Aches')){
      this.diagnosisForm.get("body_aches").setValue(true)
    }
    if(arr.includes('cough')){
      this.diagnosisForm.get("cough").setValue(true)
    }
    if(arr.includes('cold')){
      this.diagnosisForm.get("cold").setValue(true)
    }
    if(arr.includes('sore_throat')){
      this.diagnosisForm.get("sore_throat").setValue(true)
    }
    if(arr.includes('diarrhea')){
      this.diagnosisForm.get("diarrhea").setValue(true)
    }
    if(arr.includes('other')){
      this.diagnosisForm.get("other").setValue(true)
    }
    this.diagnosisForm.get("previous_medications").setValue(this.diagnosis.previous_medications);
    this.diagnosisForm.get("drug_history").setValue(this.diagnosis.drug_history);
    this.diagnosisForm.get("notes").setValue(this.diagnosis.notes);

   }

  ngOnInit(): void {
  }

  editDiagnosis(){
    this.showProgressBar=true;
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
      symptoms: symptoms.substring(1),
      // doctor_id: this.loggedInData.id,
      doctor_id:this.loggedInData.id,
      doctor_name: this.loggedInData.first_name,
      patient_id: this.diagnosis.patient_id,
      patient_name: this.diagnosis.patient_name,
      previous_medications:this.diagnosisForm.get("previous_medications").value,
      drug_history: this.diagnosisForm.get("drug_history").value,
      notes: this.diagnosisForm.get("notes").value,
      time: new Date(),
      diagnosis_id: this.diagnosis.diagnosis_id
    }
    this.diagnosisServcie.updateDiagnosis(request).subscribe((data)=>{
      if(data == 'success'){
        this.snackBar.open("Diagnosis Edited successfully.", "", {duration:2000})
      }
      console.log(data);
      this.matDialog.close({message: 'success'})
      this.showProgressBar=false;
    })

  }

}
