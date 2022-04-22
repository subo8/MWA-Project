import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService } from '../user-data.service';

export class Credentials {
  name!: string;
  username!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: UserDataService) {
    this.registrationForm = this.formBuilder.group({
      name: "",
      username: "",
      password: "",
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    console.log('form submitted');
    this.service.registerUser(form.value).subscribe({
      next: user => {
        form.reset();
        this.router.navigate(['/']);
      }, error: err => {
        console.log(err);
      }, complete: () => {
        console.log("User registration completed");
      }
    });
  }
}
