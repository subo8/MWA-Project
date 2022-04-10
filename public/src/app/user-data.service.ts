import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Users, Water } from './users/users.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private baseUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  public getUsers(search: string | null): Observable<Users[]> {
    let url: string = this.baseUrl + "/users";
    if (search) {
      url = url + '?search=' + search;
    }
    return this.http.get<Users[]>(url);
  }

  public addUser(userForm: FormGroup): Observable<Users> {
    const url: string = this.baseUrl + "/users";
    return this.http.post<Users>(url, userForm);
  }

  public getUser(userID: string): Observable<Users> {
    const url: string = this.baseUrl + "/users/" + userID;
    return this.http.get<Users>(url);
  }

  public deleteUser(userID: string): Observable<Users> {
    const url: string = this.baseUrl + "/users/" + userID;
    return this.http.delete<Users>(url);
  }

  public updateUser(user: Users): Observable<Users> {
    const url: string = this.baseUrl + "/users/" + user._id;
    console.log(url);

    return this.http.put<Users>(url, user);
  }

  public addIntake(userID: string, water: Water): Observable<Water> {
    const url: string = this.baseUrl + "/users/" + userID + "/consumption";
    return this.http.post<Water>(url, water);
  }

  public deleteWater(userID: string, intakeID: string): Observable<Water> {
    const url: string = this.baseUrl + "/users/" + userID + "/consumption/" + intakeID;
    return this.http.delete<Water>(url);
  }
}
