import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLogin:boolean = false;
  title = 'front-end';
  userid:any;
  constructor(private userService: UserService,private activatedRoute: ActivatedRoute, private loginService:LoginService){
    this.userid = this.activatedRoute.snapshot.paramMap.get("id")
    console.log(this.userid);
    if(this.userid){
      this.showLogin=true;
      this.getUserDetails(this.userid)
      this.userService.getUsers().subscribe((value)=>{
        console.log(value);
      })
    }


  }
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        console.log(params.get('id'));
      }
    )
  }
  getUserDetails(id){
    this.userService.getUserById(id).subscribe((data)=>{
      this.loginService.loggedInData = data;
      console.log(data);
    })

  }
}
