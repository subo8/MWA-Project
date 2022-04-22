import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Users, Water } from './users/users.component';
import { Credentials } from './register/register.component';
import { LoginToken } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private baseUrl: string = environment.REST_BASE_API;

  constructor(
    private http: HttpClient, private _authService: AuthenticationService) { }

  public getUsers(search: string | null): Observable<Users[]> {
    let url: string = this.baseUrl + environment.REST_API_USERS;
    if (search) {
      url = url + environment.SEARCH + search;
    }
    return this.http.get<Users[]>(url);
  }

  public addUser(userForm: FormGroup): Observable<Users> {
    const url: string = this.baseUrl + environment.REST_API_USERS;
    return this.http.post<Users>(url, userForm);
  }

  public getUser(userID: string): Observable<Users> {
    const url: string = this.baseUrl + environment.REST_API_USERS_WITH_SLASH + userID;
    return this.http.get<Users>(url);
  }

  public deleteUser(userID: string): Observable<Users> {
    const url: string = this.baseUrl + environment.REST_API_USERS_WITH_SLASH + userID;
    return this.http.delete<Users>(url);
  }

  public updateUser(user: Users): Observable<Users> {
    const url: string = this.baseUrl + environment.REST_API_USERS_WITH_SLASH + user._id;
    console.log(url);

    return this.http.put<Users>(url, user);
  }

  public addIntake(userID: string, water: Water): Observable<Water> {
    const url: string = this.baseUrl + environment.REST_API_USERS_WITH_SLASH + userID + environment.REST_API_INTAKE;
    return this.http.post<Water>(url, water);
  }

  public deleteWater(userID: string, intakeID: string): Observable<Water> {
    const url: string = this.baseUrl + environment.REST_API_USERS_WITH_SLASH + userID + environment.REST_API_INTAKE_WITH_SLASH + intakeID;
    return this.http.delete<Water>(url);
  }

  public registerUser(credential: Credentials): Observable<Credentials> {
    const url: string = this.baseUrl + environment.REST_API_REGISTER;
    return this.http.post<Credentials>(url, credential);
  }

  public login(credential: Credentials): Observable<LoginToken> {
    const url: string = this.baseUrl + environment.REST_API_LOGIN;
    return this.http.post<LoginToken>(url, credential);
  }
}
