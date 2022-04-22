import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  get isLoggedIn() { return this._authService.isLoggedIn; }

  constructor(private _authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
