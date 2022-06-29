import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  showProgressBar:boolean=true;
  loginData:any;
  currentUser:any;
  patientForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl(''),
    mobile_number: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    city:new FormControl(''),
    zip_code: new FormControl(''),
    date_of_birth: new FormControl(''),
    blood_group: new FormControl(''),
    height:new FormControl(''),
    weight: new FormControl(''),
    emergency_contact_name: new FormControl(''),
    emergency_contact_number: new FormControl('')
  })
  userid:any;
  constructor(private loginService: LoginService, private userService: UserService, private snackBar:MatSnackBar) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        console.log(this.userid);
        this.getProfile();
      }
    })
   }

  ngOnInit(): void {
    // this.getProfile();
  }
  backToHome(){
    window.history.back();
  }
  getProfile(){
    this.userService.getUserById(this.userid).subscribe((data)=>{
      this.currentUser = data;
      this.setDetails();
      this.showProgressBar=false;
    })
  }
  updateProfile(){
    this.showProgressBar=true;
    this.currentUser.first_name =this.patientForm.get("first_name")?.value;
    this.currentUser.last_name =this.patientForm.get("last_name")?.value;
    this.currentUser.gender=this.patientForm.get("gender")?.value;
    this.currentUser.mobile_number=this.patientForm.get("mobile_number")?.value;
    this.currentUser.email=this.patientForm.get("email")?.value;
    this.currentUser.state=this.patientForm.get("state")?.value;
    this.currentUser.address=this.patientForm.get("address")?.value;
    this.currentUser.city=this.patientForm.get("city")?.value;
    this.currentUser.country=this.patientForm.get("country")?.value;
    this.currentUser.date_of_birth=this.patientForm.get("date_of_birth")?.value;
    this.currentUser.blood_type=this.patientForm.get("blood_group")?.value;
    this.currentUser.height=this.patientForm.get("height")?.value;
    this.currentUser.weight=this.patientForm.get("weight")?.value;
    this.currentUser.emergency_contact_name=this.patientForm.get("emergency_contact_name")?.value;
    this.currentUser.emergency_contact_number=this.patientForm.get("emergency_contact_number")?.value;
    this.userService.updateUser(this.currentUser).subscribe((data)=>{
      this.showProgressBar=false;
      this.snackBar.open("User Profile Updated successfully","",{duration:3000})
    })
  }
  setDetails(){
    this.patientForm.get("first_name")?.setValue(this.currentUser.first_name);
    this.patientForm.get("last_name")?.setValue(this.currentUser?.last_name);
    this.patientForm.get("gender")?.setValue(this.currentUser.gender);
    this.patientForm.get("mobile_number")?.setValue(this.currentUser?.mobile_number);
    this.patientForm.get("email")?.setValue(this.currentUser?.email);
    this.patientForm.get("state")?.setValue(this.currentUser?.state);
    this.patientForm.get("address")?.setValue(this.currentUser?.address);
    this.patientForm.get("city")?.setValue(this.currentUser?.city);
    this.patientForm.get("country")?.setValue(this.currentUser?.country);
    this.patientForm.get("date_of_birth")?.setValue(this.currentUser?.date_of_birth);
    this.patientForm.get("blood_group")?.setValue(this.currentUser?.blood_type);
    this.patientForm.get("height")?.setValue(this.currentUser?.height);
    this.patientForm.get("weight")?.setValue(this.currentUser?.weight);
    this.patientForm.get("emergency_contact_name")?.setValue(this.currentUser?.emergency_contact_name);
    this.patientForm.get("emergency_contact_number")?.setValue(this.currentUser?.emergency_contact_number);
  }

}
