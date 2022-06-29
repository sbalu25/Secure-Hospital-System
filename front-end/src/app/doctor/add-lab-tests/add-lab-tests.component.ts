import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabtestsService } from 'src/app/services/labtests.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-lab-tests',
  templateUrl: './add-lab-tests.component.html',
  styleUrls: ['./add-lab-tests.component.scss']
})
export class AddLabTestsComponent implements OnInit {
  labForm = new FormGroup({
    lab_tests: new FormControl(''),
    sample_type: new FormControl(''),
    patient: new FormControl('')
  })
  labTests: any = [];
  patientdetails: any;
  doctorDetails: any;
  patientsList: any = [];
  loggedInData: any;
  role: any;
  showProgressBar:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<AddLabTestsComponent>, private labTestsService: LabtestsService, private userService: UserService, private snackBar:MatSnackBar) {
    this.loggedInData = this.data.id;
    this.role = this.loggedInData?.role
    console.log(this.role);
  }

  ngOnInit(): void {
    this.getPatientsList()
  }
  addTest() {

    let test = {
      test_name: this.labForm.get("lab_tests")?.value,
      sample_type: this.labForm.get("sample_type")?.value,
      status: "In Progress",
      time: new Date()
    }
    this.labTests.push(test);
    this.labForm.get("lab_tests").reset();
    this.labForm.get("sample_type").reset();
  }
  selectPatient(event) {
    console.log(event);
    this.patientdetails = event.source._value
  }
  createLabTests() {
    this.showProgressBar=true;
    let selectedUser = this.labForm.get("patient").value;
    let request;
    if (this.role != 'patient') {
      request = {
        patient_id: this.patientsList[selectedUser]?.id,
        doctor_id: this.loggedInData?.id,
        status: "Pending",
        tests: this.labTests,
        time: new Date(),
        doctor_name: this.loggedInData?.first_name,
        patient_name: this.patientsList[selectedUser]?.first_name,
      }
    } else {
      request = {
        patient_id: this.loggedInData?.id,
        doctor_id: this.loggedInData?.id,
        status: "Pending",
        tests: this.labTests,
        time: new Date(),
        doctor_name: this.loggedInData?.first_name,
        patient_name: this.loggedInData?.first_name,
      }
    }

    this.labTestsService.createLabTests(request).subscribe((data) => {

      console.log(data);
      this.showProgressBar=false;
      this.matDialog.close();
      this.snackBar.open("Lab test created successfully.", "", {duration:2000})
    })
  }
  getPatientsList() {
    this.userService.getPatients().subscribe((data) => {
      console.log(data);
      this.patientsList = data;
    })
  }

}
