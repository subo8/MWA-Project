import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserDataService } from '../user-data.service';
import { Water } from '../users/users.component';

@Component({
  selector: 'app-addwater',
  templateUrl: './addwater.component.html',
  styleUrls: ['./addwater.component.css']
})
export class AddwaterComponent implements OnInit {

  userID!: string;
  water: Water;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserDataService) {
    this.water = new Water('');
  }

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['userID'];
  }

  public add(): void {
    this.userService.addIntake(this.userID, this.water).subscribe({
      next: water => {
        this.router.navigateByUrl(`/user/${this.userID}`);
      }, error: err => {
        console.log(err);
      }
    });
  }

}
