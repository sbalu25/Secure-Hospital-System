import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabtestsService {
  url = environment.url + environment.labTests.base;
  constructor(private httpClient: HttpClient) { }
  listLabTests():Observable<any>{
    return this.httpClient.get(this.url +  environment.labTests.list);
  }
  createLabTests(labtest):Observable<any>{
    return this.httpClient.post(this.url + environment.labTests.create, labtest,{responseType:'text'});
  }
  listByPatientId(id):Observable<any>{
    return this.httpClient.get(this.url + environment.labTests.listBypatientId + "?id="+id);
  }
  listByDoctorId(id):Observable<any>{
    return this.httpClient.get(this.url + environment.labTests.listByDoctorId + "?id="+id);
  }
  update(labTest):Observable<any>{
    return this.httpClient.post(this.url + environment.labTests.update, labTest,{responseType:'text'});
  }
  delete(id){
    return this.httpClient.post(this.url + environment.labTests.delete, "?id="+id);
  }
  authorizeLabTest(labtest){
    return this.httpClient.post(this.url + environment.labTests.authorize ,labtest,{responseType:'text'})
  }
}
