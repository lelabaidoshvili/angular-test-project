import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from "./form/form.component";
import { HttpClient } from "@angular/common/http";
import {User} from "../../core/user";
import {UserService} from "../../core/user.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allUsers: User[] = []
  displayedColumns: string[] = [
    'gender',
    'firstName',
    'lastName',
    'actions'
  ];
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    public userService: UserService,
    private snackBar: MatSnackBar
  ) {}
  updateUser(user: User) {

    if (user) {
      const dialogRef: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, {
        width: '800px',
        height: '600px',
        data: { user: user, method: 'update' }
      });

      dialogRef.componentInstance.formSubmitted.subscribe((success: boolean) => {
        if (success) {
          dialogRef.close();
          this.getAllUsers();

        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getAllUsers();
      });
    }
  }

  deleteUser(_id: string): void {
    this.userService.deleteUser(_id)
      .subscribe(
        () => {
          console.log('User deleted successfully');
          this.getAllUsers();
        },
        error => {
          console.log(error);
        }

      );
  }
  addUsers() {
    const dialogRef: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, {
      width: '800px',
      height: '600px'
    });

    dialogRef.componentInstance.formSubmitted.subscribe((success: boolean) => {
      if (success) {
        dialogRef.close();
        this.getAllUsers();

        const config: MatSnackBarConfig = {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        };

        this.snackBar.open('მომხმარებელი წარმატებით დაემატა!', 'დახურვა', config); // Show success message at the top
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.allUsers = users;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.getAllUsers();
  }

}
