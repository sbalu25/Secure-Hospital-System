import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  url= environment.url + environment.users.base
  constructor(private httpClient: HttpClient) {

   }
   generateOtp(email): Observable<any>{
    return this.httpClient.get(this.url + environment.email.generateOtp + '/?email='+email, {responseType:'text'});
   }
   verifyOtp(email, otp):Observable<any>{
     return this.httpClient.get(this.url + environment.email.verifyOtp + '/?email='+email + '&otp='+otp, {responseType:'text'});
   }
}
