import { Component, OnInit } from '@angular/core';
import { Age, User } from '../../user.model';
import { UserService } from '../../user.service';
import { shareReplay, combineLatest, Observable, take } from 'rxjs';

@Component({
  selector: 'app-medium',
  templateUrl: './medium.component.html',
  styleUrls: ['./medium.component.css'],
})
export class MediumComponent implements OnInit {
  public users: User[] = [];
  constructor(private readonly _userService: UserService) {}

  ngOnInit() {
    combineLatest([
      this._userService.getUsers(),
      this._userService.getBlackListUsers(),
    ])
      .pipe(shareReplay(1), take(1))
      .subscribe(([users, blacklistId]) =>
        users.forEach((user) =>
          blacklistId.forEach((blacklistId) => {
            if (user.id == blacklistId.id) {
              this.users.push(user);
            }
          })
        )
      );
  }

  public showAlert(id: number) {
    let age: Age;
    this._userService.getAgeById(id).subscribe((ageObj) => (age = ageObj));
    alert(age.age);
  }
}
