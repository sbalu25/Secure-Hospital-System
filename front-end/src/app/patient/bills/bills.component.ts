import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  showProgressBar: boolean = true;
  billsList:any;
  panelOpenState: boolean = false;
  userid:any;
  constructor(private loginService:LoginService, private billService:BillService) {
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        this.listBills();
      }
    })
   }

  ngOnInit(): void {
  }
  listBills(){
    this.billService.getBillByPatientId(this.userid).subscribe((data)=>{
      this.billsList = data;
    })
  }

}
