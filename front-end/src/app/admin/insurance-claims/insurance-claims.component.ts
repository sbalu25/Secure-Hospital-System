import { Component, OnInit } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-insurance-claims',
  templateUrl: './insurance-claims.component.html',
  styleUrls: ['./insurance-claims.component.scss']
})
export class InsuranceClaimsComponent implements OnInit {
  showProgressBar: boolean = true;
  panelOpenState: boolean = false;
  claimsList:any;
  constructor(private insuranceService: InsuranceService) { }

  ngOnInit(): void {
    this.getClaimRequests()
  }
  getClaimRequests(){
    this.insuranceService.listClaims().subscribe((data)=>{
      this.claimsList = data;
      this.showProgressBar=false;
    })
  }

}
