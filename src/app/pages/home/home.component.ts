import { Component, ViewChild, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from "./form/form.component";
import { HttpClient } from "@angular/common/http";
import {User} from "../../core/user";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allUsers: any;
  displayedColumns: string[] = [
    'gender',
    'firstName',
    'lastName',
    'actions'
  ];
  constructor(
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  updateUser(id: number) {
    // Implement the logic to update a user
  }

  deleteUser(id: number) {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      this.http.delete(`https://crudcrud.com/api/ac1eae2d15bd4f03b9dd0cfa36c6ff0b/unicorns/${id}`)
        .subscribe(() => {
          console.log('User deleted successfully');
          // Implement any additional logic after deleting the user
        }, error => {
          console.log('Error occurred while deleting user:', error);
        });
    }
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
    this.http.get<User[]>('https://crudcrud.com/api/ac1eae2d15bd4f03b9dd0cfa36c6ff0b/unicorns')
      .subscribe(users => {
        this.allUsers = users;
      }, error => {
        console.log('Error occurred while fetching users:', error);
      });
  }

  ngOnInit() {
    this.getAllUsers();
  }

}
