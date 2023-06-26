import { Component, OnInit, Output, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {User} from "../../../core/user";
import {UserService} from "../../../core/user.service";
import {EventEmitter} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  @Output() formSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, method: string },
  ) {
  }
  public ngOnInit(): void {
      const user = this.data.user;
      this.form.patchValue(user)
      console.log(this.data, 'data from parent')



  }
  public form: FormGroup = new FormGroup ( {
    id: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required,  this.validateFormat]),
    lastName: new FormControl('', [Validators.required,  this.validateFormat]),

  })
  validateFormat(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (/^\d+$/.test(value)) {
      return { 'invalidFormat': true };
    }
    return null;
  }


  submitForm() {
    if(this.data?.method !== 'update') {
      if (this.form.valid) {
        const user: any = {
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          gender: this.form.value.gender,

        };

        this.userService.createUser(user)
          .subscribe(response => {
            console.log('User created successfully:', response);
            // this.form.reset();
            this.formSubmitted.emit(true); // Emit the formSubmitted event with success flag
          }, error => {
            console.log('Error occurred while creating user:', error);
          });
      }
    } else {
      this.userService.updateUser(this.data.user._id, this.form.value).subscribe();
      this.closeForm();
      const config: MatSnackBarConfig = {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      };

      this.snackBar.open('მომხმარებელი წარმატებით დარედაქტირდა!', 'დახურვა', config);
    }
  }
  closeForm() {
    this.dialogRef.close();
  }


}
