import { Component, OnInit, Output, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "../../../core/interface/user";
import { UserService } from "../../../core/service/user.service";
import { EventEmitter } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { userMethod } from "../home.component";


@Component({
  selector: 'app-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit{
  @Output() formSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, method: {UPDATE: 'Update', CREATE: 'Create'} },
  ) {
  }
  public ngOnInit(): void {
    const user = this.data.user;
    this.form.patchValue(user);
    console.log(this.data.method)
  }
  public form: FormGroup = new FormGroup ( {
    id: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required,  this.validateFormat]),
    lastName: new FormControl('', [Validators.required,  this.validateFormat]),
  })
  private validateFormat(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (/^\d+$/.test(value)) {
      return { 'invalidFormat': true };
    }
    return null;
  }

  public submitForm(): void {
    const config: MatSnackBarConfig = {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary']
    };

    if(this.data.method.UPDATE) {
      this.userService.updateUser(this.data.user._id, this.form.value).subscribe(() => {});
      this.closeForm();
      this.snackBar.open('მომხმარებელი წარმატებით დარედაქტირდა!', 'დახურვა', config);
    }
    if(this.data.method.CREATE) {
      this.userService.createUser(this.form.value).subscribe(() => {
        this.closeForm();
      });
      this.snackBar.open('მომხმარებელი წარმატებით დარეგისტრირდა!', 'დახურვა', config);
    }
  }
  closeForm() {
    this.dialogRef.close();
  }


}
