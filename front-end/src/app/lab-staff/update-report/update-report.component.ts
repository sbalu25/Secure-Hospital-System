import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabtestsService } from 'src/app/services/labtests.service';
import { UpdateLabTestComponent } from '../update-lab-test/update-lab-test.component';

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.scss']
})
export class UpdateReportComponent implements OnInit {
  reportForm = new FormGroup({
    previous_medications: new FormControl(''),
    drug_history: new FormControl(''),
    notes: new FormControl(''),
  })
    labReport:any;
    loggedInData: any;
    showProgressBar:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<UpdateReportComponent>,public dialog: MatDialog, private labTestService: LabtestsService, private snackBar: MatSnackBar) {
    this.labReport = data.labTest;
    this.loggedInData= data.loginUser;
    this.setForm();
   }

  ngOnInit(): void {

  }
  setForm(){
    this.reportForm.get("previous_medications").setValue(this.labReport.previous_medications);
    this.reportForm.get("drug_history").setValue(this.labReport.drug_history);
    this.reportForm.get("notes").setValue(this.labReport.notes);
  }
  
  udpateReport(){
    this.showProgressBar=true;
    this.labReport.previous_medications =this.reportForm.get("previous_medications").value;
    this.labReport.drug_history = this.reportForm.get("drug_history").value;
    this.labReport.notes = this.reportForm.get("notes").value;
    this.labTestService.update(this.labReport).subscribe((data)=>{
      this.snackBar.open("Lab report updated successfully.", "", {duration:2000})
      console.log(data);
      this.matDialog.close();
      this.showProgressBar=false;
    })
    
  }
  editReport(test,i){
    const dialogRef = this.dialog.open(UpdateLabTestComponent, {
      width: '50%',
      height:'50%',
      data: {name: test, i:i},
    });
    dialogRef.afterClosed().subscribe(result => {
        this.labReport.tests[i] = result.data;
    });
  }

}
