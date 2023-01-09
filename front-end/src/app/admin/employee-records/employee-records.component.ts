import { AfterViewInit, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { EditPatientComponent } from 'src/app/doctor/edit-patient/edit-patient.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-records',
  templateUrl: './employee-records.component.html',
  styleUrls: ['./employee-records.component.scss']
})

export class EmployeeRecordsComponent implements OnInit {
  showProgressBar:boolean = true;
  @ViewChild('input') input: ElementRef;
  displayedColumns: string[] = ['first_name', 'last_name', 'mobile_number', 'email','role', 'modify','delete'];
  dataSource: MatTableDataSource<any> | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private userService: UserService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.getUsers();

  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        tap((text) => {
          console.log(this.input.nativeElement.value)
          this.userService.getUsers().subscribe((data) => {
            let patientsArray = [];
            for (let object of data) {
              if (object.email.includes(this.input.nativeElement.value)) {
                patientsArray.push(object);
              }
            }
            this.dataSource = new MatTableDataSource(patientsArray);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(this.dataSource)

          })
        })
      )
      .subscribe();

  }

  ngOnInit(): void {
  }
  deletePatient(id){
      this.userService.deleteUser(id).subscribe((data)=>{
        this.snackBar.open("User deleted successfully", "", {duration:2000})
        this.getUsers();

      })
  }
  backToHome() {
    window.history.back();
  }
  editPatient(patient: any) {
    const dialogRef = this.dialog.open(EditPatientComponent, {
      width: '70%',
      height: '80%',
      data: { user: patient },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
  registerUser(){
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '70%',
      height: '80%',
      data: { },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
    });

  }
  getUsers() {
    this.showProgressBar=true;
    this.userService.getUsers().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showProgressBar=false;
    })
  }

}

