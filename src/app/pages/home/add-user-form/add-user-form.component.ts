import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserChangeMethod } from '@core/enums/userChangeMethod';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { messages } from '@core/constants';


@Component({
  selector: 'app-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})

export class AddUserFormComponent implements OnInit {
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, method: UserChangeMethod },
  ) { }

  public ngOnInit(): void {
    this.form.patchValue(this.data.user);
  }

  public form: FormGroup = new FormGroup ( {
    id: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required,  this.validateFormat]),
    lastName: new FormControl('', [Validators.required,  this.validateFormat]),
  })
  private validateFormat(control: FormControl): Record<string, boolean> | null {
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
      duration: 2000,
      panelClass: ['snackbar-success'],
    };

    const openSuccessSnackBar = (): void => {
      this.snackBar.open(messages.generalSuccessMessage, 'დახურვა', config);
    }

    const openErrorSnackBar = (): void => {
      this.snackBar.open(messages.generalFailureMessage, 'დახურვა', config);
    }

    if(this.data.method === UserChangeMethod.userUpdate) {
      this.userService.updateUser(this.data.user._id, this.form.value).subscribe(() => {
        this.closeForm();
        openSuccessSnackBar();
      }, () => {
        openErrorSnackBar();
      });
    }
    if(this.data.method === UserChangeMethod.userCreate) {
      this.userService.createUser(this.form.value).subscribe(() => {
        this.closeForm();
        openSuccessSnackBar();
      }, () => {
        openErrorSnackBar();
      });
    }
  }
  public closeForm(): void {
    this.dialogRef.close();
  }
}
