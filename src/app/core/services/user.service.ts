import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "@core/models/user";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  deleteUser(_id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/${_id}`)
  }

  updateUser(_id: string, updatedUser: User) {
    return this.http.put(`${environment.apiUrl}/users/${_id}`, updatedUser);
  }
}
