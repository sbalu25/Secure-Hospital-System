import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  showProgressBar: boolean = false;
  appointmentsList=[];
  panelOpenState: boolean = false;
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.listAppointments();
  }
  listAppointments(){
    this.showProgressBar=true;
    this.appointmentService.listAppointments().subscribe((data)=>{
      this.appointmentsList = data;
      this.showProgressBar=false;
    })
  }

}
