import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authorize-claim',
  templateUrl: './authorize-claim.component.html',
  styleUrls: ['./authorize-claim.component.scss']
})
export class AuthorizeClaimComponent implements OnInit {
  showProgressBar: boolean = false;
  authorizeForm = new FormGroup({
    comments: new FormControl('')
  })
  constructor(private matDialog: MatDialogRef<AuthorizeClaimComponent>) { }

  ngOnInit(): void {
  }
  addComments(){
    this.matDialog.close({comment: this.authorizeForm.get("comments").value})
  }

}
