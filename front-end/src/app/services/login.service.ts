import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: String = 'hospital-staff'
  url = environment.url + environment.users.base;
  loggedInData:any={}
  private messageSource = new BehaviorSubject(this.loggedInData);
  userid = this.messageSource.asObservable();
  loginId:any;
  constructor(private httpClient: HttpClient,private activatedRoute: ActivatedRoute, private messageService: MessageService) { 
  }

  
  login(userDetails: any): Observable<any>{
    return this.httpClient.post(this.url + environment.users.login, userDetails);
  }
  register(userDetails: any): Observable<any>{
    return this.httpClient.post(this.url + environment.users.registration, userDetails,{responseType:'text'});
  }
  sendMessage(message: any) {
    this.loginId = message.id;
    this.messageSource.next(message)
  }
  validateRecaptcha(token:string):Observable<any>{
    return this.httpClient.get(this.url +environment.users.verifyCaptcha+"?token="+token,{responseType:'text'});
  }
  logout(userDetails:any): Observable<any>{
    return this.httpClient.post(this.url + environment.users.logout, userDetails, {responseType:'text'})
  }
}
