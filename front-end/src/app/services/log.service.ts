import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  url= environment.url + environment.users.base;
  constructor(private httpClient:HttpClient) { }
  getLogs():Observable<any>{
    return this.httpClient.get(this.url + environment.log.list);
  }
}
