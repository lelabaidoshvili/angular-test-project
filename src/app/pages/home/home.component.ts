import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { UserChangeMethod } from '@core/enums/userChangeMethod';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  allUsers: User[] = [];
  UserChangeMethod = UserChangeMethod;

  displayedColumns: string[] = [
    'gender',
    'firstName',
    'lastName',
    'actions'
  ];

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
  }

  public updateUser(user: User | null, method: UserChangeMethod) {
    const dialogRef: MatDialogRef<AddUserFormComponent> = this.dialog.open(AddUserFormComponent, {
      width: '800px',
      height: '600px',
      data: { user: user, method }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }

  public deleteUser(_id: string): void {
    this.userService.deleteUser(_id)
      .subscribe(
        () => {
          console.log('User deleted successfully');
          this.getAllUsers();
        });
  }

  public getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      users => {
        this.allUsers = users;
      });
  }

  ngOnInit() {
    this.getAllUsers();
  }
}

