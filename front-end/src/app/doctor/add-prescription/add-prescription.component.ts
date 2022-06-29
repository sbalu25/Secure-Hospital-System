import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from 'src/app/services/appointment.service';
import { LoginService } from 'src/app/services/login.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss']
})
export class AddPrescriptionComponent implements OnInit {
  prescriptionForm = new FormGroup({
    patient: new FormControl(''),
    drug: new FormControl(''),
    dosage: new FormControl(''),
    frequency: new FormControl(''),
    units: new FormControl(''),
    revisit:new FormControl(false),
    date: new FormControl(''),
    time:new FormControl('')
  })
  users: any;
  drugs: any = [];
  loggedInUser: any;
  selectedPatient: any;
  patientDetails:any;
  showProgressBar:boolean = false;
  showRevisit:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<AddPrescriptionComponent>,private userService: UserService, private appointmentService: AppointmentService, private prescriptionService: PrescriptionService, private snackBar: MatSnackBar) {
    this.loggedInUser = this.data.id;
  }

  ngOnInit(): void {
    this.getUsers()
  }
  addPrescription() {
    this.showProgressBar=true;
    let selectedPatient = this.prescriptionForm.get("patient").value;
      let request = {
        // doctor_id: this.loggedInUser?.id,
        prescription_id:null,
        doctor_id:this.loggedInUser?.id,
        doctor_name:this.loggedInUser?.first_name,
        patient_name:this.users[selectedPatient].first_name + " " + this.users[selectedPatient].last_name,
        patient_id: this.users[selectedPatient].id,
        drugs: this.drugs,
        time: new Date()
      }
      this.prescriptionService.createPrescription(request).subscribe((data) => {
        console.log(data);
        this.showProgressBar=false;
        if(this.showRevisit){
          this.bookAppointment()
        }
        this.matDialog.close();
      })
    

  }
  bookAppointment(){
    let selectedPatient = this.prescriptionForm.get("patient").value;
    let time = this.prescriptionForm.get("time").value;
    let date = new Date(this.prescriptionForm.get("date").value);
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5)
    date.setHours(hours)
    date.setMinutes(minutes)
    let request = {
      patient_id: this.users[selectedPatient].id,
      patient_name: this.users[selectedPatient].first_name + " " + this.users[selectedPatient].last_name,
      doctor_id: this.loggedInUser?.id,
      doctor_name: this.loggedInUser?.first_name + " " + this.loggedInUser?.last_name,
      time: date,
      status: "Pending",
      speciality: this.loggedInUser?.speciality,
      created_by: this.loggedInUser?.first_name + " " + this.loggedInUser?.last_name
    }
    this.appointmentService.bookAppointment(request).subscribe((data) => {
      this.matDialog.close();
      this.showProgressBar = false;
      this.snackBar.open("Appointment and prescriptions has been created successfully", "", {duration:3000})
    })
  }
  getUserById(){
    this.userService.getUserById(parseInt(this.patientDetails)).subscribe((data)=>{
      console.log(data);
      return data.frist_name;
    })
  }
  getUsers() {
    this.userService.getPatients().subscribe((data) => {
      this.users = data;
    })
  }
  addDrug() {
    let drug = {
      drug_name: this.prescriptionForm.get("drug")?.value,
      dosage: this.prescriptionForm.get("dosage")?.value,
      frequency: this.prescriptionForm.get("frequency")?.value,
      units: this.prescriptionForm.get("units")?.value
    }
    this.drugs.push(drug);
    this.prescriptionForm.get("drug").reset();
    this.prescriptionForm.get("dosage").reset();
    this.prescriptionForm.get("frequency").reset();
    this.prescriptionForm.get("units").reset();


  }
  revisit(checked){
    console.log(checked);
    this.showRevisit = this.prescriptionForm.get("revisit").value;
  }

}
