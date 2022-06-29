import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-hospital-staff',
  templateUrl: './hospital-staff.component.html',
  styleUrls: ['./hospital-staff.component.scss']
})
export class HospitalStaffComponent implements OnInit {
  userid:any;
  loginData:any;
  constructor(private router: Router,private userService:UserService,private loginService:LoginService,private activatedRoute:ActivatedRoute) {
    this.userid = this.activatedRoute.snapshot.paramMap.get("id")
    this.getUserDetails(this.userid)
    this.loginService.sendMessage({ id: this.userid })
    this.loginService.userid.subscribe(message => {
      if (message.id) {
        this.userid = parseInt(message.id);
      }
    })
   }

  ngOnInit(): void {
  }
  navigateToSection(section:any){
    if(section == ""){
      this.router.navigateByUrl('hospital-staff/'+this.userid);
    }else
    this.router.navigateByUrl('hospital-staff/'+this.userid+"/"+section);
  }
  getUserDetails(id) {
    this.userService.getUserById(id).subscribe((data) => {
      this.loginService.loggedInData = data;
      this.loginData = data;
      console.log(data);
    })

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
