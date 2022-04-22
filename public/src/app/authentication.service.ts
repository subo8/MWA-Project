import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  #isLoggedIn: boolean = false;
  get isLoggedIn() { return this.#isLoggedIn; }
  set isLoggedIn(isLogged) { this.#isLoggedIn = isLogged; }

  #token: string = '';
  get token() {
    return this.#token;
  }
  set token(token) {
    this.#token = token;
    localStorage.setItem(environment.TOKEN_STORAGE_KEY, token);
    this.isLoggedIn = true;
  }

  set name(name) {
    localStorage.setItem(environment.TOKEN_STORAGE_KEY, name);
    this.isLoggedIn = true;
  }

  get name() {
    let name: string = environment.NAME_UNKNOWN;

    if (this.token) {
      name = this._jwtService.decodeToken(
        localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string
      ).name;
    }
    return name;
  }


  constructor(private _jwtService: JwtHelperService,) { }

  deleteToken() {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
