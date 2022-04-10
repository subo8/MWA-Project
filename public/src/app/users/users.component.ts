import { Component, OnInit } from '@angular/core';

import { UserDataService } from '../user-data.service';

export class Water {
  _id!: string;
  size!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(size: string) {
    this.size = size;
  }
}

export class Users {
  // #_id!: string;
  // #name!: string;
  // #gender!: string;
  // #age!: number;
  // #weigth!: number;
  // #consumption!: any;
  // get _id() { return this.#_id }
  // get name() { return this.#name }
  // get gender() { return this.#gender }
  // get age() { return this.#age }
  // get weigth() { return this.#weigth }
  // get consumption() { return this.#consumption }
  _id!: string;
  name!: string;
  gender!: string;
  age!: number;
  weigth!: number;
  consumption!: Water[];

  constructor(id: string, name: string, gender: string, age: number, weigth: number) {
    this._id = id;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.weigth = weigth;
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Users[];
  search: string = '';
  isSearched: boolean = false;

  constructor(private userService: UserDataService) { }

  public updateList() {
    this.userService.getUsers(this.search).subscribe({
      next: users => {
        this.users = users;
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        console.log("done");
      }
    });
  }

  ngOnInit(): void {
    this.updateList();
  }

  public searchUser(): void {
    this.isSearched = false;
    this.updateList();
  }

}
