import { AfterViewInit, ElementRef,ViewChild, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EditPatientComponent } from '../edit-patient/edit-patient.component';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { RegisterComponent } from 'src/app/login/register/register.component';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})



export class PatientListComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  displayedColumns: string[] = [ 'first_name', 'last_name', 'mobile_number','email', 'modify'];
  dataSource: MatTableDataSource<any> | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  userid: any;
  loggedInData:any
  showProgressBar:boolean =true;
  constructor(private router: Router, private userService: UserService,public dialog: MatDialog,private loginService:LoginService ) {
    // this.dataSource = new MatTableDataSource(this.users);
    this.loginService.userid.subscribe((data)=>{
      if(data.id){
        this.userid = parseInt(data.id);
        console.log(this.userid);
        this.getUserDetails();
      }
    })
    this.getUsers();

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
                  this.userService.getUsers().subscribe((data)=>{
                    let patientsArray =[];
                    for(let object of data){
                      if(object.role == 'patient' && object.email.includes(this.input.nativeElement.value)){
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


  ngOnInit(): void {
  }
  editPatient(patient:any){
    const dialogRef = this.dialog.open(EditPatientComponent, {
      width: '70%',
      height:'80%',
      data: {user: patient,loginUser:this.loggedInData},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
    });
  }
  getUserDetails(){
    this.userService.getUserById(this.userid).subscribe((data)=>{
      this.loggedInData = data;
    })
  }
  RegisterPatient(){
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '70%',
      height:'80%',
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getUsers();
    });
  }
  getUsers(){
    this.userService.getPatients().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showProgressBar=false;
    })
  }


}
