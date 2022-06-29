import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  userid: any;
  loginData:any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService, private userService: UserService, private messageService: MessageService) {
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
  navigateToSection(section: any) {
    if (section == '') {
      this.router.navigateByUrl("/doctor/" + this.userid);

    } else {
      this.router.navigateByUrl("doctor/" + this.userid + "/" + section);
    }

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
