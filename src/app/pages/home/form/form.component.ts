import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from "@angular/common/http";
import { MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../core/user";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  public allUsers: any;
  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<FormComponent>
  ) {
  }
  public ngOnInit(): void {
    this.getAllUsers();

  }
  public form: FormGroup = new FormGroup ( {
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
  getAllUsers() {
    this.http.get<any[]>('https://crudcrud.com/api/ac1eae2d15bd4f03b9dd0cfa36c6ff0b/unicorns')
      .subscribe(users => {
        this.allUsers = users;
      }, error => {
        console.log('Error occurred while fetching users:', error);
      });
  }


  submitForm() {
    if (this.form.valid) {
      const user = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        gender: this.form.value.gender
      };

      this.http.post('https://crudcrud.com/api/ac1eae2d15bd4f03b9dd0cfa36c6ff0b/unicorns', user)
        .subscribe(response => {
          console.log('User created successfully:', response);
          // this.form.reset();
          this.getAllUsers(); // Refresh the table data after creating a new user
        }, error => {
          console.log('Error occurred while creating user:', error);
        });
    }
  }

  closeForm() {
    this.dialogRef.close();
  }


}
