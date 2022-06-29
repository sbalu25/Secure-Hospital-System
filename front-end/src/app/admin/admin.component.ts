import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userid:any
  currentRoute ="";
  loginData:any;
  constructor(private router: Router,private activatedRoute:ActivatedRoute,private loginService:LoginService,private userService:UserService) {
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
  logout(){
    this.loginService.logout(this.loginData).subscribe((data)=>{
      if(data == 'success'){
        sessionStorage.removeItem("JWTToken")
        this.router.navigateByUrl("/");
      }
    })
  }
  navigateToSection(section:any){
    this.currentRoute = section;
    if(section == ""){

      this.router.navigateByUrl('admin/'+this.userid);
    }else
    this.router.navigateByUrl('admin/'+this.userid+"/"+section);
  }
  getUserDetails(id) {
    this.userService.getUserById(id).subscribe((data) => {
      this.loginService.loggedInData = data;
      this.loginData=data;
      console.log(data);
    })

  }

}
