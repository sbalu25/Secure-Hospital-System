import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  currentUser: any;
  patientForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl(''),
    mobile_number: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    zip_code: new FormControl(''),
    date_of_birth: new FormControl(''),
    blood_group: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
    emergency_contact_name: new FormControl(''),
    emergency_contact_number: new FormControl('')
  })
  loggedInUser: any;
  role: any = '';
  showProgressBar:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<EditPatientComponent>, private activatedRoute: ActivatedRoute, private userService: UserService, private snackBar: MatSnackBar) {
    this.currentUser = data.user;
    this.role = this.currentUser?.role;
    console.log(this.role);
    this.loggedInUser = data.loginUser
    this.setDetails();
  }

  ngOnInit(): void {
  }
  editPatient() {
    this.showProgressBar=true;
    this.currentUser.first_name = this.patientForm.get("first_name")?.value,
      this.currentUser.last_name = this.patientForm.get("last_name")?.value,
      this.currentUser.gender = this.patientForm.get("gender")?.value,
      this.currentUser.password = this.patientForm.get("password")?.value,
      this.currentUser.date_of_birth = new Date(this.patientForm.get("date_of_birth")?.value),
      this.currentUser.mobile_number = this.patientForm.get("mobile_number")?.value,
      this.currentUser.email = this.patientForm.get("email")?.value,
      this.currentUser.address = this.patientForm.get("address")?.value,
      this.currentUser.city = this.patientForm.get("city")?.value,
      this.currentUser.state = this.patientForm.get("state")?.value,
      this.currentUser.country = this.patientForm.get("country")?.value,
      this.currentUser.blood_type = this.patientForm.get('blood_group')?.value,
      this.currentUser.zip_code = this.patientForm.get("zipcode")?.value,
      this.currentUser.height = this.patientForm.get("height").value,
      this.currentUser.weight = this.patientForm.get("weight").value,
      this.currentUser.emergency_contact_name = this.patientForm.get("emergency_contact_name").value,
      this.currentUser.emergency_contact_number = this.patientForm.get("emergency_contact_number").value
      this.userService.updateUser(this.currentUser).subscribe((data)=>{
        if(data == 'success'){
          this.snackBar.open("Patient details edited successfully.", "", {duration:2000})
        }
        this.matDialog.close();
        this.showProgressBar=false;
      })
  }
  setDetails() {
    this.patientForm.get("first_name")?.setValue(this.currentUser.first_name);
    this.patientForm.get("last_name")?.setValue(this.currentUser?.last_name);
    this.patientForm.get("gender")?.setValue(this.currentUser.gender);
    this.patientForm.get("mobile_number")?.setValue(this.currentUser?.mobile_number);
    this.patientForm.get("email")?.setValue(this.currentUser?.email);
    this.patientForm.get("state")?.setValue(this.currentUser?.state);
    this.patientForm.get("address")?.setValue(this.currentUser?.address);
    this.patientForm.get("city")?.setValue(this.currentUser?.city);
    this.patientForm.get("country")?.setValue(this.currentUser?.country);
    this.patientForm.get("emergency_contact_name")?.setValue(this.currentUser?.emergency_contact_name);
    this.patientForm.get("emergency_contact_number")?.setValue(this.currentUser?.emergency_contact_number);
    this.patientForm.get("weight").setValue(this.currentUser?.weight);
    this.patientForm.get("height").setValue(this.currentUser?.height);
    this.patientForm.get('blood_group').setValue(this.currentUser?.blood_type);
    this.patientForm.get("date_of_birth").setValue(this.currentUser?.date_of_birth);
  }

}
