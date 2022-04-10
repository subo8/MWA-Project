import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserDataService } from '../user-data.service';
import { Users } from '../users/users.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user!: Users;
  mustIntake!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserDataService) { }

  public converter(weigth: number, age: number) {
    const formula = (2.205 / 2.2 * 40 / 28.3 / 33.814)
    if (age < 30) {
      this.mustIntake = weigth * formula;
    } else if (age >= 30 && age <= 55) {
      this.mustIntake = weigth * formula
    } else {
      this.mustIntake = weigth * formula
    }
  }

  public updateList() {
    const userID = this.route.snapshot.params['userID'];
    this.userService.getUser(userID).subscribe({
      next: user => {
        this.converter(user.weigth, user.age);
        this.user = user;
      },
      error: err => {
        console.log(err);
      },
      complete: () => { }
    });
  }

  ngOnInit(): void {
    this.updateList();
  }

  public delete(userID: string) {
    this.userService.deleteUser(userID).subscribe({
      next: user => {
        console.log('Deleted');
        this.router.navigateByUrl('/users');
      },
      error: err => {
        console.log(err);
      },
      complete: () => { }
    });
  }

  public deleteIntake(intakeID: string) {
    this.userService.deleteWater(this.user._id, intakeID).subscribe({
      next: water => {
        this.updateList();
      },
      error: err => {
        console.log(err);
      }, complete: () => { }
    });
  }

}
