import { Component, OnInit } from '@angular/core';
import { Age, AgeType, User } from '../../user.model';
import { UserService } from '../../user.service';
import { shareReplay, combineLatest, Observable, take } from 'rxjs';

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
      this._userService.getAgeType(),
    ])
      .pipe(shareReplay(1), take(1))
      .subscribe(([users, blacklistId, ageTypes]) => {
        this.ageTypes = ageTypes;
        users.forEach((user) =>
          blacklistId.forEach((blacklistId) => {
            if (user.id == blacklistId.id) {
              this.users.push(user);
            }
          })
        );
      });
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
        alert('age ' + age.age + ' Age Type ' + ageType.type);
      });
  }
}
