import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = environment.url + environment.bill.base;
  constructor(private httpClient: HttpClient) { }
  listBills(): Observable<any>{
    return this.httpClient.get(this.url + environment.bill.list);
  }
  createBill(bill:any):Observable<any>{
    return this.httpClient.post(this.url + environment.bill.create, bill,{responseType:'text'})
  }
  getBillByPatientId(id:any):Observable<any>{
    return this.httpClient.get(this.url + environment.bill.getByPatientId + "/?id="+id);
  }
}
