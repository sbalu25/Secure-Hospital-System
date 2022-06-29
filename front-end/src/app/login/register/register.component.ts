import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { DatePipe } from '@angular/common'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showProgressBar: boolean = false;
  loggedInUser: String='';
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
    height:new FormControl(''),
    weight:new FormControl(''),
    emergency_contact_name:new FormControl(''),
    emergency_contact_number:new FormControl('')
  });
  constructor(private loginService: LoginService, private matDialog:MatDialogRef<RegisterComponent>, private snackBar: MatSnackBar) {
    this.loggedInUser = this.loginService.loggedIn
   }

  ngOnInit(): void {
  }
  backToHome(){
    window.history.back();
  }
  registerNewUser(){
    this.showProgressBar=true;
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
      role: "patient",
      height:this.registrationForm.get("height").value,
      weight:this.registrationForm.get("weight").value,
      emergency_contact_name:this.registrationForm.get("emergency_contact_name").value,
      emergency_contact_number:this.registrationForm.get("emergency_contact_number").value,
      account_verified: false,
      no_of_attempts:0,
      account_status: "Unblocked"
    }
    this.loginService.register(userDetails).subscribe((value)=>{
      this.showProgressBar=false;
      this.matDialog.close();
      this.snackBar.open("User Registered successfully", "", {duration:2000})
      console.log(value);
    })
  }

}
