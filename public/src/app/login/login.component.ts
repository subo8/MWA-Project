import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Credentials } from '../register/register.component';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';
import { from } from 'rxjs';

export class LoginToken {
  success: boolean = false;
  token: string = "";
}

export class AlertMessage {
  isSuccess!: boolean;
  message!: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSuccess!: boolean;
  alertMessage!: string;

  get isLoggedIn() { return this._authService.isLoggedIn; }

  get name() {
    return this._authService.name;
  }

  loginForm!: NgForm;

  credentials!: Credentials;

  constructor(
    private service: UserDataService,
    private _authService: AuthenticationService,
    private _router: Router
  ) {
    this.credentials = new Credentials()
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (!this.credentials.name && !this.credentials.password) {
      this.isSuccess = false;
      this.alertMessage = "Fill your inputs!";
    } else {
      this.service.login(this.credentials).subscribe({
        next: (loginResponse) => {
          this.isSuccess = true;
          this.alertMessage = "Successfull!";
          this.login(loginResponse);
        },
        error: (err) => {
          console.log("Login error", err);
          this.isSuccess = false;
          this.alertMessage = "Password is wrong!";
        }
      });
    }
  }

  login(loginResponse: LoginToken): void {
    this._authService.token = loginResponse.token;
    this._router.navigate(["/"]);
  }

  logOut(): void {
    this._authService.deleteToken();
    this._router.navigate(['/']);
  }

  _reset(form: NgForm) {
    form.reset();
  }
}
