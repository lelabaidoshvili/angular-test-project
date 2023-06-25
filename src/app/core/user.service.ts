import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://crudcrud.com/api/e2a43fd0fe2941e88a2e837b98e5e769';
  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post('https://crudcrud.com/api/e2a43fd0fe2941e88a2e837b98e5e769/users', user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`https://crudcrud.com/api/e2a43fd0fe2941e88a2e837b98e5e769/users/${id}`)
      .pipe(
        tap(() => console.log('User deleted successfully')),
        catchError(error => {
          console.log('Error occurred while deleting user:', error);
          return throwError('Failed to delete user');
        })
      );
  }
  updateUser(id: number, updatedUser: User) {
    return this.http.put(`https://crudcrud.com/api/e2a43fd0fe2941e88a2e837b98e5e769/users/${id}`, updatedUser);
  }
}
