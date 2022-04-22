import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  addUserForm!: FormGroup;

  get isLoggedIn() { return this._auth.isLoggedIn };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserDataService,
    private _auth: AuthenticationService) {
    this.addUserForm = this.formBuilder.group({
      name: "",
      gender: "",
      age: "",
      weigth: ""
    });
  }

  ngOnInit(): void {
  }

  public add(addUserForm: FormGroup) {
    this.userService.addUser(addUserForm.value).subscribe(
      {
        next: user => {
          this.router.navigateByUrl('/users');
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log("Add user completed");
        }
      }
    );
  }


}
