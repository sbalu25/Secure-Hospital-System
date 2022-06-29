import { Component, OnInit } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  showProgressBar: boolean = true;
  panelOpenState: boolean = false;
  insuranceList:any;
  constructor(private insuranceService: InsuranceService) { }

  ngOnInit(): void {
    this.getInsurance();
  }
  getInsurance(){
    this.insuranceService.listInsurance().subscribe((data)=>{
    this.insuranceList = data;
    this.showProgressBar=false;
    })
  }

}
