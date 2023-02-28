import { Component, OnInit } from '@angular/core';
import { first, shareReplay } from 'rxjs';
import { UserAge, UserId } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-hard',
  templateUrl: './hard.component.html',
  styleUrls: ['./hard.component.css'],
})
export class HardComponent implements OnInit {
  public user: UserAge;
  private _blackList: UserId[] = [];
  constructor(private readonly _userService: UserService) {}

  ngOnInit() {
    this._userService
      .getBlackListUsers()
      .pipe(shareReplay(1), first())
      .subscribe((blackListUsers) => (this._blackList = blackListUsers));
  }

  public validateForm() {
    let x = document.forms['myForm']['fname'].value;
    if (x < 0 || x > 40) {
      document.getElementById('alrt').innerHTML =
        '<b>Select Another Number</b>';
      setTimeout(function () {
        document.getElementById('alrt').innerHTML = '';
      }, 10000);
    } else if (isNaN(x) || x == '') {
      document.getElementById('alrt').innerHTML =
        '<b>Please insert a number</b>';
      setTimeout(function () {
        document.getElementById('alrt').innerHTML = '';
      }, 10000);
    } else {
      let id = (<HTMLInputElement>document.getElementById('input')).value;
      const isOnBlackList = this._blackList.some((idObj) => {
        parseInt(x) === idObj.id;
        return true;
      });
      console.log(isOnBlackList);
      if (isOnBlackList) {
        document.getElementById('alrt').innerHTML =
          '<b>The user is on blackList, you do not have permision</b>';
        setTimeout(function () {
          document.getElementById('alrt').innerHTML = '';
        }, 10000);
      } else {

      }
    }
  }
}
