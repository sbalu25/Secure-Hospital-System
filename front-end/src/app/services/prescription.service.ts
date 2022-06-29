import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  environment = environment
  url = environment.url + environment.prescription.base
  constructor(private httpClient: HttpClient) { }

  getDoctorPrescriptions(id: any){
    return this.httpClient.get(this.url + '/doctor/'+ id)
  }
  getPatientPrescriptions(id:any){
    return this.httpClient.get(this.url + environment.prescription.getByPatientId+ "?id="+id)
  }
  updatePrescription(prescription:any){
    return this.httpClient.post(this.url + this.environment.prescription.update, prescription)
  }
  listPrescriptions(){
    return this.httpClient.get(this.url + environment.prescription.list)
  }
  createPrescription(prescription:any){
    return this.httpClient.post(this.url + this.environment.prescription.create, prescription,{responseType:'text'});
  }
}
