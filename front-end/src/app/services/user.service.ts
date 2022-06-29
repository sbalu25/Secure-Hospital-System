import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  environment = environment;
  url = environment.url + environment.users.base ;
  constructor(private httpClient: HttpClient) {

   }
   getUsers(): Observable<any>{
     console.log(this.url);
     return this.httpClient.get(this.url + environment.users.list)
   }
   getUserById(id:number): Observable<any>{
     return this.httpClient.get(this.url +environment.users.getUserById + '/?id='+id);
   }
   updateUser(user:any):Observable<any>{
    return this.httpClient.post(this.url +environment.users.update,user,{responseType:'text'});

   }
   deleteUser(id:number):Observable<any>{
    return this.httpClient.get(this.url + environment.users.delete+ "?id="+id,{responseType:'text'});
   }
   getPatients():Observable<any>{
    return this.httpClient.get(this.url + environment.users.patients);
   }
   getDoctors():Observable<any>{
     return this.httpClient.get(this.url + environment.users.doctors);
   }
}
