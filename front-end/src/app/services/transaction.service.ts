import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  url = environment.url + environment.transactions.base;
  constructor(private httpClient: HttpClient) { }

  listTransactions(): Observable<any>{
    return this.httpClient.get(this.url + environment.transactions.list);
  }
  deleteTransactions(id:any): Observable<any>{
    return this.httpClient.get(this.url + environment.transactions.deleteTransaction +"?id="+id,{responseType:'text'});
  }
  udpateTransaction(transaction:any): Observable<any>{
    return this.httpClient.post(this.url + environment.transactions.udpateTransaction, transaction,{responseType:'text'});
  }
  getPatientTransactions(id:any): Observable<any>{
    return this.httpClient.get( this.url + environment.transactions.getBypatientId+"/?id="+id);
  }
  authorizeTransaction(transaction): Observable<any>{
    return this.httpClient.post(this.url + environment.transactions.authorizeTransaction,transaction,{responseType:'text'});
  }
  createTransaction(transaction:any): Observable<any>{
    return this.httpClient.post(this.url + environment.transactions.createTransaction, transaction,{responseType:'text'});
  }
}
