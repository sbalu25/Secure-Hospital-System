import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-lab-test',
  templateUrl: './update-lab-test.component.html',
  styleUrls: ['./update-lab-test.component.scss']
})
export class UpdateLabTestComponent implements OnInit {
  updateForm= new FormGroup({
    status: new FormControl(''),
    result: new FormControl('')
  })
  testData: any
  index:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<UpdateLabTestComponent>) {
    this.testData = data.name;
    this.index = data.i;
    this.updateForm.get("status").setValue(this.testData.status);
    this.updateForm.get("result").setValue(this.testData.result);
   }

  ngOnInit(): void {
  }
  udpateReport(){
    this.testData.status = this.updateForm.get("status").value
    this.testData.result = this.updateForm.get("result").value;
    console.log(this.updateForm.get("result").value);
    this.matDialog.close({data: this.testData, index:this.index})
    
  }

}
