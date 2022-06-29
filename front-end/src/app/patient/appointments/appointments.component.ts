import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { VerificationService } from 'src/app/services/verification.service';
import { BookAppointmentComponent } from '../book-appointment/book-appointment.component';
import { VirtualKeyboardComponent } from '../virtual-keyboard/virtual-keyboard.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  panelOpenState:boolean = false;
  loginData:any;
  appointmentsList:any;
  pendingAppointments:any;
  ApprovedAppointments:any;
  userid:any;
  loggedInData:any;
  showProgressBar:boolean = false;
  accountVerified: boolean = false;
  constructor(private appointmentService: AppointmentService, private loginService: LoginService,private userService: UserService,public dialog: MatDialog, private emailService:VerificationService) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        console.log(this.userid);
        this.getUserDetails();
      }
    })
   }

  ngOnInit(): void {
  }
  getUserDetails(){
    this.userService.getUserById(this.userid).subscribe((data)=>{
      this.loggedInData = data;
      this.listAppointments();
    })
  }

  listAppointments(){
    this.showProgressBar=true;
    this.appointmentService.getByPatient(this.userid).subscribe((data)=>{
      console.log(data);
      let pendingAppointts =[];
      let approvedAppoints=[];
      for(let object of data){
        if(object.status == 'Pending'){
          pendingAppointts.push(object);
        }else if(object.status == 'approved'){
          approvedAppoints.push(object)
        }
      }
      this.pendingAppointments = pendingAppointts;
      this.ApprovedAppointments = approvedAppoints;
      this.showProgressBar=false;
    })
  }
  bookAppointment(){
    const dialogRef = this.dialog.open(BookAppointmentComponent, {
      width: '70%',
      height:'80%',
      data: {
        id: this.loggedInData
      },
    });
    dialogRef.afterClosed().subscribe(result => {
        this.listAppointments();
    });
  }
  generateOtp() {
    this.emailService.generateOtp(this.loggedInData?.email).subscribe((data)=>{
      if(data == 'success'){
        const dialogRef = this.dialog.open(VirtualKeyboardComponent, {
          width: '70%',
          height: '80%',
          data: this.loggedInData
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result?.result == 'success') {
            this.accountVerified = true;
          }
        });
      }
    })
  }
  
}
