import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://crudcrud.com/api/08b616c2ab25454e8452cbcefc7d0c4d';
  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  deleteUser(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${_id}`)
      .pipe(
        tap(() => console.log('User deleted successfully')),
        catchError(error => {
          console.log('Error occurred while deleting user:', error);
          return throwError('Failed to delete user');
        })
      );
  }

  updateUser(_id: string, updatedUser: User) {
    return this.http.put(`${this.apiUrl}/users/${_id}`, updatedUser);
  }
}
