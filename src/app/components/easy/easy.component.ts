import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { forkJoin, map, mergeMap, shareReplay, of } from 'rxjs';
import { Age, AgeType, Identity, User } from '../../user.model';
import { UserService } from '../../user.service';

interface UserWithDetails {
  user: User;
  identity: Identity;
  age: Age;
  ageType: AgeType;
}

@Component({
  selector: 'app-easy',
  templateUrl: './easy.component.html',
  styleUrls: ['./easy.component.css'],
})
export class EasyComponent implements OnInit {
  public users: UserWithDetails[];
  constructor(private readonly _userService: UserService) {}

  ngOnInit() {
    this._userService
      .getUsers()
      .pipe(
        map((users) => {
          const user = users[0];
          return user;
        }),
        mergeMap((userObj) => {
          const user = of(userObj);
          const age = this._userService.getAgeById(userObj.id);
          const identity = this._userService.getIdentityById(userObj.id);
          const ageType = this._userService.getAgeTypeById(userObj.id);

          return forkJoin({ user, age, identity, ageType });
        }),

        shareReplay(1)
      )
      .subscribe((result) => {
        const userWithDetail: UserWithDetails = {
          user: result.user,
          age: result.age,
          ageType: result.ageType,
          identity: result.identity,
        };
        this.users.push(userWithDetail);
      });
  }
}
