import { getAllChanges } from '@angular/cdk/schematics/update-tool/version-changes';
import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  forkJoin,
  map,
  mergeMap,
  shareReplay,
  of,
  finalize,
  combineLatest,
} from 'rxjs';
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
    combineLatest([
      this._userService.getUsers(),
      this._userService.getAge(),
      this._userService.getAgeType(),
      this._userService.getIdentity(),
    ]).subscribe(([users, ages, ageTypes, identities]) =>
      users.forEach((user) => {
        const age = ages.find((age) => age.id == user.id);
        const identity = identities.find((identity) => identity.id == user.id);
        const ageType = ageTypes.find(
          (ageType) =>
            parseInt(ageType.ageMax) >= parseInt(age.age) &&
            parseInt(ageType.ageMin) <= parseInt(age.age)
        );
        this.users.push({
          user: user,
          identity:
            identity != undefined
              ? identity
              : { id: user.id, type: IdentityEnum.Personal },
          age: age != undefined ? age : { id: user.id, age: 'none' },
          ageType:
            ageType != undefined
              ? ageType
              : { type: 'antichitate', ageMin: '150', ageMax: '99999' },
        });
      })
    );
  }

  public mapUser(user: User) {}
}
