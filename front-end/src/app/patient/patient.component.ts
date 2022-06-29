import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  userid:any;
  loginData:any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService,private userService:UserService) {
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
    const dfMessenger:any = document?.querySelector('df-messenger');
    dfMessenger.addEventListener('df-response-received', (evt) => this.showData(evt));

    // dfMessenger?.addEventListener('df-response-received', function (event:any) {
    //   console.log(event);

    // });
  }
  showData(event){
    let response: string = event?.detail?.response?.queryResult?.queryText.toLowerCase();
    console.log(event?.detail?.response?.queryResult?.queryText);
    if(response.toLowerCase() == 'transactions'){
      this.router.navigateByUrl('patient/'+this.userid+"/"+response)
    }
    if(response.toLowerCase() == 'prescriptions'){
      this.router.navigateByUrl('patient/'+this.userid+"/prescription")
    }
    if(response.toLowerCase() == 'appointments'){
      this.router.navigateByUrl('patient/'+this.userid)
    }
    if(response.toLowerCase() == 'lab tests'){
      this.router.navigateByUrl('patient/'+this.userid+"/lab-tests")
    }
    if(response.toLowerCase() == 'bills'){
      this.router.navigateByUrl('patient/'+this.userid+"/"+response)
    }
    if(response.toLowerCase() == 'diagnosis'){
      this.router.navigateByUrl('patient/'+this.userid+"/"+response)
    }
    if(response.toLowerCase() == 'medical-insurance'){
      this.router.navigateByUrl('patient/'+this.userid+"/"+response)
    }
  }
  navigateToSection(section:any){
    if(section == ""){
      this.router.navigateByUrl('patient/'+this.userid);
    }else
    this.router.navigateByUrl('patient/'+this.userid+"/"+section);
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
