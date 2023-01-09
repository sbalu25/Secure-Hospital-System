import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  url = environment.url + environment.insurance.base;
  policy_url = environment.url + environment.insurancePolicy.base;
  claim_url = environment.url + environment.insuranceClaim.base;
  constructor(private httpClient: HttpClient) { }
  createPolicies(request:any):Observable<any>{
    let headers = Headers;
    
    return this.httpClient.post(this.policy_url + environment.insurancePolicy.create, request, {responseType:"text"})
  }
  listPolicies(): Observable<any>{
    return this.httpClient.get(this.policy_url + environment.insurancePolicy.list);
  }
  listClaims(): Observable<any>{
    return this.httpClient.get(this.claim_url + environment.insuranceClaim.list);
  }
  authorizeClaims(claim): Observable<any>{
    return this.httpClient.post(this.claim_url + environment.insuranceClaim.update,claim, {responseType:'text'})
  }
  getInsurance(id:any): Observable<any>{
    return this.httpClient.get(this.url + environment.insurance.getInsurance + "/?id="+id);
  }
  addInsurance(insurance:any):Observable<any>{
    return this.httpClient.post(this.url + environment.insurance.addInsurance, insurance, {responseType:'text'})
  }
  createClaim(claim:any):Observable<any>{
    return this.httpClient.post(this.claim_url + environment.insuranceClaim.create, claim, {responseType:"text"})
  }
  listInsurance():Observable<any>{
    return this.httpClient.get(this.url + environment.insurance.list)
  }
}
