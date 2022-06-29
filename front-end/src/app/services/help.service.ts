import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  url = environment.url + environment.help.base;
  constructor(private httpClient:HttpClient) { }

  createRequest(request:any): Observable<any>{
    return this.httpClient.post(this.url + environment.help.createHelp, request, {responseType:'text'})
  }
  listRequests():Observable<any>{
    return this.httpClient.get(this.url + environment.help.listHelp)
  }
  updateRequests(request:any):Observable<any>{
    return this.httpClient.post(this.url + environment.help.updateHelp, request, {responseType:'text'})
  }
}
