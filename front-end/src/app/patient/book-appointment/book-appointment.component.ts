import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common'
import { AppointmentService } from 'src/app/services/appointment.service';
import { LoginService } from 'src/app/services/login.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { specialities } from 'src/app/app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
  searchForm = new FormControl('');
  bookForm = new FormGroup({
    doctor: new FormControl(''),
    date: new FormControl(''),
    speciality: new FormControl(''),
    time: new FormControl('')
  });
  loginData: any;
  selectedDoctor: any;
  doctorsList: any;
  showProgressBar: boolean = false;
  specialities = specialities;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<BookAppointmentComponent>, private appointmentService: AppointmentService, private snackBar: MatSnackBar, private userService: UserService) {
    // this.loginData = this.loginService.loggedInData;
    this.loginData = this.data.id;

  }

  ngOnInit(): void {
    this.listDoctors();
  }
  bookAppointment() {
    let time = this.bookForm.get("time").value;
    let date = new Date(this.bookForm.get("date").value);
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5)
    date.setHours(hours)
    date.setMinutes(minutes)
    let selectedDoctor = this.bookForm.get("doctor").value
    let request = {
      patient_id: this.loginData.id,
      patient_name: this.loginData.first_name,
      doctor_id: this.doctorsList[selectedDoctor].id,
      doctor_name: this.doctorsList[selectedDoctor].first_name + " " + this.doctorsList[selectedDoctor].last_name,
      time: date,
      status: "Pending",
      speciality: this.bookForm.get("speciality").value,
      created_by: this.loginData.first_name
    }
    this.appointmentService.bookAppointment(request).subscribe((data) => {
      this.matDialog.close();
      this.showProgressBar = false;
      this.snackBar.open("Appointment request has been created successfully", "", {duration:3000})
    })
  }
  listDoctors() {
    this.userService.getDoctors().subscribe((data) => {
      this.doctorsList = data;
    })
  }


}
