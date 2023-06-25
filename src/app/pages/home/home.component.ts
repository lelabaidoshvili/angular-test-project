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
  updateUser(id: number) {
    const user = this.allUsers.find(user => user.id === id);

    const dialogRef: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, {
      width: '800px',
      height: '600px',
      data: { user: user } // Pass the user object as data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedUser: User = {
          id: id,
          firstName: result.formValue.firstName,
          lastName: result.formValue.lastName,
          gender: result.formValue.gender
        };

        this.userService.updateUser(id, updatedUser).subscribe(() => {
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
        console.log('Error occurred while fetching users:', error);
      }
    );
  }

  ngOnInit() {
    this.getAllUsers();
  }

}
