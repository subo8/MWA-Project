import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserDataService } from '../user-data.service';
import { Users } from '../users/users.component';



@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  user: Users;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserDataService) {
    this.user = new Users('', '', '', 0, 0);
  }

  ngOnInit(): void {
    const userID = this.route.snapshot.params['userID'];
    this.userService.getUser(userID).subscribe({
      next: user => {
        this.user = user;
      }, error: err => {
        console.log(err);

      }, complete: () => { }
    });
  }

  public edit(): void {
    this.userService.updateUser(this.user).subscribe({
      next: user => {
        console.log(user);

        this.router.navigateByUrl(`/user/${this.user._id}`);
      }, error: err => {
        console.log(err);
      }, complete: () => { }
    })
  }

}
