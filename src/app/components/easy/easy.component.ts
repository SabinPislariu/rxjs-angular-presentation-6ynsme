import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { forkJoin, map, mergeMap, shareReplay, of, finalize } from 'rxjs';
import { Age, AgeType, Identity, IdentityEnum, User } from '../../user.model';
import { UserService } from '../../user.service';

interface UserWithDetails {
  user: User;
  identity: Identity;
  age: Age;
  ageType?: AgeType;
}

@Component({
  selector: 'app-easy',
  templateUrl: './easy.component.html',
  styleUrls: ['./easy.component.css'],
})
export class EasyComponent implements OnInit {
  public users: UserWithDetails[] = [];
  private ageType: AgeType[] = [];
  constructor(private readonly _userService: UserService) {}

  ngOnInit() {
    this._userService
      .getAgeType()
      .subscribe((ageType) => (this.ageType = ageType));

    this._userService
      .getUsers()
      .pipe(
        mergeMap((users) => users),
        mergeMap((userObj) => {
          const user = of(userObj);
          const age = this._userService.getAgeById(userObj.id);
          const identity = this._userService.getIdentityById(userObj.id);
          return forkJoin({ user, age, identity });
        }),
        shareReplay(1)
        )
      .subscribe((result) => {
        const userWithDetail: UserWithDetails = {
          user: result.user,
          age:
            result.age.age != undefined
              ? result.age
              : { age: 'none', id: result.age.id },
          identity:
            result.identity.type != undefined
              ? result.identity
              : { id: result.identity.id, type: IdentityEnum.Personal },
        };
        this.users.push(userWithDetail);
      });
  }
  public getAgeType(age: string): AgeType {
    let type: AgeType;
    this.ageType.forEach((ageType: AgeType) => {
      if (ageType.ageMax > age && ageType.ageMin < age) type = ageType;
      return;
    });
    return type;
  }
}
