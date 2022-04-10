import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UsereditComponent } from './useredit/useredit.component';
import { AddwaterComponent } from './addwater/addwater.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "user-create", component: CreateuserComponent },
  { path: "users", component: UsersComponent },
  { path: "user/:userID", component: UserComponent },
  { path: "user-edit/:userID", component: UsereditComponent },
  { path: "user-intake/:userID", component: AddwaterComponent },
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
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
