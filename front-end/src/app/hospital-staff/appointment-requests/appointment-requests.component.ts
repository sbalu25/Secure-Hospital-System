import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-requests',
  templateUrl: './appointment-requests.component.html',
  styleUrls: ['./appointment-requests.component.scss']
})
export class AppointmentRequestsComponent implements OnInit {
  panelOpenState: boolean = false;
  appointmentList:any;
  showProgressBar:boolean = true;
  constructor(private router: Router, private appointmentService: AppointmentService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listAppointments();
  }

  listAppointments(){
    this.appointmentService.listAppointments().subscribe((data)=>{
      let pendingAppointts =[];
      for(let object of data){
        if(object.status == 'Pending'){
          pendingAppointts.push(object);
        }
      }
      this.appointmentList = pendingAppointts;
      this.showProgressBar=false;
    })
  }
  authorizeAppointments(appointment, status){
    this.showProgressBar=true;
      appointment.status = status;
      this.appointmentService.authorizeAppointment(appointment).subscribe((data)=>{
        if(data == 'success'){
          this.snackBar.open("Appointment authorized successfully.", "", {duration:2000})

        }
        this.listAppointments();
      })
  }

}
