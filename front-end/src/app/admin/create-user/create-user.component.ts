import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import {specialities} from '../../app.constants';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  showProgressBar:boolean = false;
  registrationForm = new FormGroup({
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    gender: new FormControl(''),
    phone_number: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    zipcode: new FormControl(''),
    date_of_birth: new FormControl(''),
    blood_group: new FormControl(''),
    password: new FormControl(''),
    role:new FormControl(''),
    height:new FormControl(''),
    weight:new FormControl(''),
    emergency_contact_name:new FormControl(''),
    emergency_contact_number:new FormControl(''),
    speciality: new FormControl('')
  });
  role='admin'
  specialities = specialities;
  constructor(private loginService: LoginService, private matDialog: MatDialogRef<CreateUserComponent>,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }
  selectRole(){
  this.role = this.registrationForm.get("role").value;
  }
  registerNewUser(){
    this.showProgressBar =true;
    let userDetails = {
      first_name: this.registrationForm.get("first_name")?.value,
      last_name: this.registrationForm.get("last_name")?.value,
      gender: this.registrationForm.get("gender")?.value,
      password: this.registrationForm.get("password")?.value,
      date_of_birth: new Date(this.registrationForm.get("date_of_birth")?.value),
      mobile_number: this.registrationForm.get("phone_number")?.value,
      email: this.registrationForm.get("email")?.value,
      address: this.registrationForm.get("address")?.value,
      city: this.registrationForm.get("city")?.value,
      state: this.registrationForm.get("state")?.value,
      country: this.registrationForm.get("country")?.value,
      login_status: "logged_out",
      blood_type: this.registrationForm.get('blood_group')?.value,
      zip_code: this.registrationForm.get("zipcode")?.value,
      role:this.role,
      height:this.registrationForm.get("height").value,
      weight:this.registrationForm.get("weight").value,
      emergency_contact_name:this.registrationForm.get("emergency_contact_name").value,
      emergency_contact_number:this.registrationForm.get("emergency_contact_number").value,
      speciality:this.registrationForm.get("speciality").value,
      account_verified: false,
      no_of_attempts:0,
      account_status: "Unblocked"
    }
    this.loginService.register(userDetails).subscribe((value)=>{
      this.showProgressBar=false;
      console.log(value);
      this.matDialog.close();
      this.snackBar.open("User created successfully","", {duration:3000});
    })
  }

}
