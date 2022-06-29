import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LogService } from 'src/app/services/log.service';
import { LoginService } from 'src/app/services/login.service';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  displayedColumns: string[] = [ 'first_name', 'last_name', 'email','role','activity','status','time'];
  dataSource: MatTableDataSource<any> | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  userid: any;
  logData:any
  constructor(private loginService:LoginService,private logService:LogService) {
    this.getLogs();
   }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    if(this.dataSource){
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
    }
    fromEvent(this.input.nativeElement,'keyup')
           .pipe(
               filter(Boolean),
               debounceTime(150),
               distinctUntilChanged(),
               tap((text) => {
                 console.log(this.input.nativeElement.value)
                 this.logService.getLogs().subscribe((data)=>{
                   let patientsArray =[];
                   for(let object of data){
                     if(object.email.includes(text)){
                       patientsArray.push(object);
                     }
                   }
                   this.dataSource = new MatTableDataSource(patientsArray);
                   this.dataSource.paginator = this.paginator;
                   this.dataSource.sort = this.sort;
             
                 })
               })
           )
           .subscribe();

 }
  getLogs(){
    this.logService.getLogs().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
