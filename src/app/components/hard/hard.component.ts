import { identifierName } from '@angular/compiler/src/compile_metadata';
import { Component, OnInit } from '@angular/core';
import { combineLatest, first, shareReplay } from 'rxjs';
import { UserAge, UserId } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-hard',
  templateUrl: './hard.component.html',
  styleUrls: ['./hard.component.css'],
})
export class HardComponent implements OnInit {
  private _blackList: UserId[] = [];
  constructor(private readonly _userService: UserService) {}

  ngOnInit() {
    this._userService
      .getBlackListUsers()
      .pipe(shareReplay(1), first())
      .subscribe((blackListUsers) => (this._blackList = blackListUsers));
  }

  public validateForm() {
    let id = document.forms['myForm']['fname'].value;
    if (id < 0 || id > 40) {
      this._handleNumberRestriction();
    } else if (isNaN(id) || id == '') {
      this._handleNotNumberRestriction();
    } else {
      const isOnBlackList = this._blackList.some((idObj) => {
        return parseInt(id) == idObj.id;
      });
      if (isOnBlackList) {
        this._handleBlackListRestriction();
      } else {
        this._getNameAndAge(parseInt(id));
      }
    }
  }

  private _handleNumberRestriction() {
    document.getElementById('alrt').innerHTML = '<b>Select Another Number</b>';
    setTimeout(function () {
      document.getElementById('alrt').innerHTML = '';
    }, 10000);
  }

  private _handleNotNumberRestriction() {
    document.getElementById('alrt').innerHTML = '<b>Please insert a number</b>';
    setTimeout(function () {
      document.getElementById('alrt').innerHTML = '';
    }, 10000);
  }

  private _handleBlackListRestriction() {
    document.getElementById('alrt').innerHTML =
      '<b>The user is on blackList, you do not have permision</b>';
    setTimeout(function () {
      document.getElementById('alrt').innerHTML = '';
    }, 10000);
  }

  private _getNameAndAge(id) {
    combineLatest([
      this._userService.getAgeById(id),
      this._userService.getUserById(id),
    ])
      .pipe(first())
      .subscribe(([age, user]) =>
        alert('user ' + user.nume + '\n' + 'has age of ' + age.age)
      );
  }
}
