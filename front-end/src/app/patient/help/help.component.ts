import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { Location } from '@angular/common'
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { HelpService } from 'src/app/services/help.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  requestForm = new FormGroup({
    comments: new FormControl(''),
  });
  showProgressBar: boolean = false;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  userid: any;
  currentUser: any;
  constructor(private _ngZone: NgZone, private location: Location, private loginService: LoginService, private userService: UserService, private helpService: HelpService, private snackBar:MatSnackBar) {
    this.loginService.userid.subscribe((data) => {
      if (data.id) {
        this.userid = parseInt(data.id);
        console.log(this.userid);
        this.getProfile();
      }
    })
  }
  getProfile() {
    this.userService.getUserById(this.userid).subscribe((data) => {
      this.currentUser = data;
    })
  }

  ngOnInit(): void {
  }
  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  confirmRequest() {
    let request={
      patient_id: this.currentUser?.id,
      patient_name: this.currentUser?.first_name + " " + this.currentUser?.last_name,
      patient_mail: this.currentUser?.email,
      request: this.requestForm.get("comments").value,
      status: "Created",
      created_time: new Date()
    }
    this.helpService.createRequest(request).subscribe((data)=>{
      this.snackBar.open("Request has been Processed successfully. Someone will process your request", "", {duration:3000});
    })
  }
  closeRequest() {
    this.location.back();
  }

}
