import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelpService } from 'src/app/services/help.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-help-requests',
  templateUrl: './help-requests.component.html',
  styleUrls: ['./help-requests.component.scss']
})
export class HelpRequestsComponent implements OnInit {
  userid:any;
  loggedInData:any;
  helpRequests:any;
  showProgressBar: boolean = true;
  panelOpenState: boolean = false;
  constructor(private loginService:LoginService, private userService:UserService, private helpService:HelpService, private snackBar: MatSnackBar) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        console.log(this.userid);
        this.getUserDetails();
      }
    })
   }

  ngOnInit(): void {
    this.getHelpRequests();
  }

  getHelpRequests(){
    this.helpService.listRequests().subscribe((data)=>{
      this.helpRequests = data;
      console.log(this.helpRequests);
      this.showProgressBar=false;
    })
  }
  getUserDetails(){
    this.userService.getUserById(this.userid).subscribe((data)=>{
      this.loggedInData = data;
    })
  }
  changeStatus(index){
    this.showProgressBar=true;
    let request = this.helpRequests[index];
    request.addressed_by = this.userid;
    request.addressed_name = this.loggedInData.first_name + " " + this.loggedInData.last_name
    request.status = 'Addressed'
    this.helpService.updateRequests(request).subscribe((data)=>{
      this.snackBar.open("Request marked to addressed", "", {duration:2000});
    })
  }

}
