import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  userid:any;
  loginData:any;
  constructor(private router:Router, private activatedRoute: ActivatedRoute, private loginService: LoginService, private userService: UserService) {
    this.userid = this.activatedRoute.snapshot.paramMap.get("id");
    this.loginService.sendMessage({id: this.userid});
    if(this.userid){
      this.getUserDetails()
    }
   }

  ngOnInit(): void {
  }
  getUserDetails(){
    this.userService.getUserById(this.userid).subscribe((data)=>{
      this.loginData = data;
    })
  }
  navigateToSection(section:any){
    if(section == ""){
      this.router.navigateByUrl('insurance-staff/'+this.userid);
    }else
    this.router.navigateByUrl('insurance-staff/'+this.userid+"/"+section);
  }
  logout(){
    this.loginService.logout(this.loginData).subscribe((data)=>{
      if(data == 'success'){
        sessionStorage.removeItem("JWTToken")
        this.router.navigateByUrl("/");
      }
    })
  }

}
