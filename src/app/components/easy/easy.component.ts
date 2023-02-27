import { getAllChanges } from '@angular/cdk/schematics/update-tool/version-changes';
import { ReturnStatement } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { shareReplay, combineLatest, Observable } from 'rxjs';
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
  private nameOrder = 1;
  private idOrder = 1;
  public usersPristine: UserWithDetails[] = [];
  public users: UserWithDetails[] = [];
  private ageType: AgeType[] = [];
  constructor(private readonly _userService: UserService) {}

  ngOnInit() {
    this.getOrders();
  }

  public orderByName() {
    this.nameOrder = -1 * this.nameOrder;
    this.users = this.users.sort((firstUser, secondUser) => {
      return firstUser.user.nume < secondUser.user.nume
        ? this.nameOrder * 1
        : this.nameOrder * -1;
    });
  }

  public orderById() {
    this.idOrder = -1 * this.idOrder;
    this.users = this.users.sort((firstUser, secondUser) => {
      return parseInt(firstUser.age.age) < parseInt(secondUser.age.age)
        ? 1 * this.idOrder
        : -1 * this.idOrder;
    });
  }
  public reset() {
    this.users = [];
    this.getOrders();
  }

  private getOrders() {
    combineLatest([
      this._userService.getUsers(),
      this._userService.getAge(),
      this._userService.getAgeType(),
      this._userService.getIdentity(),
    ])
      .pipe(shareReplay(1))
      .subscribe(([users, ages, ageTypes, identities]) =>
        users.forEach((user) => {
          const age = ages.find((age) => age.id == user.id);
          const identity = identities.find(
            (identity) => identity.id == user.id
          );
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
}
