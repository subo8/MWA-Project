import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment.local';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'water-ui';

  constructor(private _auth: AuthenticationService) { }

  ngOnInit(): void {
    const token = localStorage.getItem(environment.TOKEN_STORAGE_KEY);
    if (token) {
      this._auth.token = token;
      this._auth.isLoggedIn = true;
    }
  }
}
