import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import Keyboard from "simple-keyboard";
import { VerificationService } from 'src/app/services/verification.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-virtual-keyboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: [
    '../../../../node_modules/simple-keyboard/build/css/index.css',
    './virtual-keyboard.component.scss'
  ]
})
export class VirtualKeyboardComponent implements OnInit {
  loggedinData:any;
  message:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private verificationService:VerificationService, private snackBar:MatSnackBar,private matDialog: MatDialogRef<VirtualKeyboardComponent>){
    this.loggedinData = data;
  }
  ngOnInit(): void {
    
  }
  value = "";
  keyboard: Keyboard | any;
  title = 'keyboard';
  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: (button: any) => this.onKeyPress(button)
    });
  }
  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);
    if(button == '{enter}'){
     this.verifyOtp()
    }
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
  verifyOtp(){
    console.log(this.value)
    this.verificationService.verifyOtp(this.loggedinData.email, this.value).subscribe((data)=>{
      if(data == 'invalid'){
        this.snackBar.open("Please enter a valid OTP",'',{duration:5000});
      }else{
        this.snackBar.open("OTP has been verified");
          this.matDialog.close({result:"success"})
      }
    })
    }

}
