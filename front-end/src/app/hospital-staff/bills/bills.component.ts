import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  showProgressBar: boolean = true;
  billsList:any;
  panelOpenState: boolean = false;
  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.getBills();
  }
  getBills(){
    this.billService.listBills().subscribe((data)=>{
      this.billsList = data;
    })
  }

}
