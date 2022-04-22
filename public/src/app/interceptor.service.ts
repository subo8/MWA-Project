import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  token!: string;
  constructor(private _auth: AuthenticationService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (this._auth.isLoggedIn) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this._auth.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
