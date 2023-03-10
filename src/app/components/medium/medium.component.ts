import { Component, OnInit } from '@angular/core';
import { Age, AgeType, User } from '../../user.model';
import { UserService } from '../../user.service';
import { shareReplay, combineLatest, Observable, take, first } from 'rxjs';

@Component({
  selector: 'app-medium',
  templateUrl: './medium.component.html',
  styleUrls: ['./medium.component.css'],
})
export class MediumComponent implements OnInit {
  public users: User[] = [];
  public ageTypes: AgeType[] = [];
  constructor(private readonly _userService: UserService) {}

  ngOnInit() {
    combineLatest([
      this._userService.getUsers(),
      this._userService.getBlackListUsers(),
    ])
      .pipe(shareReplay(1), take(1))
      .subscribe(([users, blacklistId]) => {
        users.forEach((user) => {
          let isOnTheList = false;
          isOnTheList = blacklistId.some((blacklistId) => {
            return user.id == blacklistId.id;
          });
          if (!isOnTheList) {
            this.users.push(user);
          }
        });
      });
    this._userService
      .getAgeType()
      .pipe(first())
      .subscribe((ageTypes) => (this.ageTypes = ageTypes));
  }

  public showAlert(id: number) {
    this._userService
      .getAgeById(id)
      .pipe(take(1))
      .subscribe((age) => {
        const ageType = this.ageTypes.find(
          (ageType) =>
            parseInt(ageType.ageMax) >= parseInt(age.age) &&
            parseInt(ageType.ageMin) <= parseInt(age.age)
        );
        alert('age= ' + age.age + '\n' + 'Age Type= ' + ageType.type);
      });
  }
}
