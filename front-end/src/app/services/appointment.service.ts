import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  url = environment.url + environment.appointments.base;
  constructor(private httpClient: HttpClient) { }

  listAppointments():Observable<any>{
    return this.httpClient.get(this.url + environment.appointments.list);
  }
  bookAppointment(appointment:any){
    return this.httpClient.post(this.url + environment.appointments.bookAppointment, appointment, {responseType:'text'});
  }
  authorizeAppointment(appointment):Observable<any>{
    return this.httpClient.post(this.url + environment.appointments.authorizeAppointment,appointment,{responseType:'text'});
  }
  updateAppointment(appointment:any):Observable<any>{
    return this.httpClient.post(this.url + environment.appointments.updateAppointment,appointment);
  }
  deleteAppointment(id:any):Observable<any>{
    return this.httpClient.get(this.url + environment.appointments.deleteAppointment + "?id="+id);
  }
  getByPatient(id:any):Observable<any>{
    return this.httpClient.get(this.url + environment.appointments.getByPatientId + "?id="+id);
  }
  getByDoctor(id:any):Observable<any>{
    return this.httpClient.get(this.url + environment.appointments.getByDoctorId + "?id="+id);
  }
}
