import { Component, ViewChild, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from "./form/form.component";
import { HttpClient } from "@angular/common/http";
import {User} from "../../core/user";
import {UserService} from "../../core/user.service";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allUsers: any
  displayedColumns: string[] = [
    'gender',
    'firstName',
    'lastName',
    'actions'
  ];
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    public userService: UserService
  ) {}

  updateUser(id: number) {
    const dialogRef: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, {
      width: '800px',
      height: '600px',
      data: { userId: id } // Pass the user ID as data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result.userId, result.formValue).subscribe(() => {
          this.getAllUsers(); // Refresh the table data after updating the user
        }, error => {
          console.log('Error occurred while updating user:', error);
        });
      }
    });
  }
  deleteUser(id: number): void {
    this.userService.deleteUser(id)
      .subscribe(
        () => {
          console.log('User deleted successfully');
          // Implement any additional logic after deleting the user
        },
        error => {
          console.log('Error occurred while deleting user:', error);
        }
      );
  }

  addUsers() {
    const dialogRef: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, {
      width: '800px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllUsers();
      }
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.allUsers = users;
      },
      error => {
        console.log('Error occurred while fetching users:', error);
      }
    );
  }

  ngOnInit() {
    this.getAllUsers();
  }

}
