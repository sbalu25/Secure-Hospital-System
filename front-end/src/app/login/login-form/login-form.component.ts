import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router, ActivatedRoute} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { VerificationService } from 'src/app/services/verification.service';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    verifyAccount: new FormControl('')
  });
  siteKey=environment.recaptcha.siteKey;
  showLogin:boolean=false;
  errorMessage: string='';
  verifyAccount:boolean = false;
  constructor( private router: Router, private loginService: LoginService,private render: Renderer2, private verificationService:VerificationService, private snackBar:MatSnackBar, private dialog:MatDialog) {
    let src = this.render.createElement('script');
    src.defer = true;
    src.async = true;
    src.src = environment.recaptcha.api_uri;
     this.render.appendChild(document.body, src);
   }

  ngOnInit(): void {
  }
  continueToLogin(){
    let user = {
      userName: this.loginForm.get("userName")?.value,
      password: this.loginForm.get("password")?.value,
    }
    
    this.loginService.login(user).subscribe((data)=>{
      sessionStorage.setItem("JWTToken",data.token)
      this.loginService.loggedInData.user = data;
      console.log(data);
      this.snackBar.open("Welcome " + data?.user['email'], "",{duration:2000});
      if(data?.user['role'] == 'patient'){
        this.router.navigateByUrl('patient/'+data?.user['id'])
      }else if(data?.user['role'] == 'doctor'){
        this.router.navigateByUrl('doctor/'+data?.user['id']);
      }else if(data?.user['role'] == 'admin'){
        this.router.navigateByUrl('admin/'+data?.user['id']);
      }else if(data?.user['role'] == 'lab_staff'){
        this.router.navigateByUrl('lab-staff/'+data?.user['id']);
      }else if(data?.user['role'] == 'hospital_staff'){
        this.router.navigateByUrl('hospital-staff/'+data?.user['id']);
      }
      else if(data?.user['role'] == 'insurance_staff'){
        this.router.navigateByUrl('insurance-staff/'+data?.user['id']);
      }
 
    },
    error=>{
      console.log(error);
      if(error.error == 'Account blocked'){
        this.errorMessage = "Your account has been blocked for 24 hours as number of invalid login attempts exceeds 5"
      }else if(error.error == "Verify Account"){
        // this.verifyAccount = true;
        this.generateOtp();
      }else if(error.error == "Block Warning"){
        this.errorMessage = "Your account will be blocked if number of invalid attempts exceeds 5."
      }else if(error.error == "Incorrect Password"){
        this.errorMessage  = "Please enter a valid password";
      }else if(error.error == 'Invalid Credentials'){
        this.errorMessage = "Please enter valid credentials";
      }
    })
  }
  resolved(token:any){
    this.loginService.validateRecaptcha(token).subscribe((data)=>{
      console.log(data);
    })
  }
  registerNewUser(){
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '70%',
      height:'80%',

    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  generateOtp(){
    this.verificationService.generateOtp(this.loginForm.get("userName")?.value).subscribe((data)=>{
      console.log(data)
      if(data == 'success'){
        this.verifyAccount = true;
        this.errorMessage = "Please verify your account by entering OTP send to your email id."
      }
    })
  }
  validateOtp(){
    this.verificationService.verifyOtp(this.loginForm.get("userName")?.value, this.loginForm.get("verifyAccount")?.value).subscribe((data)=>{
      if(data == 'success'){
        this.continueToLogin();
      }
    })
  }

}
