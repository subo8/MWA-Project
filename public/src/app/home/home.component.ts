import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router) { }

  addUser(): void {
    this._router.navigate(['user-create']);
  }

  getUsers(): void {
    this._router.navigate(['users']);
  }

  ngOnInit(): void {
  }

}
