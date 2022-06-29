import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DiagnosisServiceService {
  url = environment.url + environment.diagnosis.base
  constructor(private httpClient: HttpClient) {

   }
   listDiagnosis(){
    return this.httpClient.get(this.url + environment.diagnosis.list);
   }
   createDiagnosis(diagnosis: any){
    return this.httpClient.post(this.url + environment.diagnosis.create, diagnosis,{responseType:'text'});
   }
   deleteDiagnosis(id:any){
    return this.httpClient.get(this.url + environment.diagnosis.delete+"?id="+id,{responseType:'text'});
   }
   updateDiagnosis(diagnosis:any){
    return this.httpClient.post(this.url + environment.diagnosis.update, diagnosis,{responseType:'text'});
   }
   getDiagnosisById(id:any){
    return this.httpClient.get(this.url + environment.diagnosis.getByPatientId+"?id="+id);
   }

}
