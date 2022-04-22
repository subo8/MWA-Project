import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UsereditComponent } from './useredit/useredit.component';
import { AddwaterComponent } from './addwater/addwater.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { InterceptorService } from './interceptor.service';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "user-create", component: CreateuserComponent },
  { path: "users", component: UsersComponent },
  { path: "user/:userID", component: UserComponent },
  { path: "user-edit/:userID", component: UsereditComponent },
  { path: "user-intake/:userID", component: AddwaterComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", component: ErrorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CreateuserComponent,
    UsersComponent,
    UserComponent,
    UsereditComponent,
    AddwaterComponent,
    ErrorComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
