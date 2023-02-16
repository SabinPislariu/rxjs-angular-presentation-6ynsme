import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {
  Age,
  AgeType,
  Identity,
  IdentityEnum,
  User,
  UserId,
} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class MockMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      { id: 0, nume: 'Nicu' },
      { id: 3, nume: 'Mihaela' },
      { id: 7, nume: 'Vasile' },
      { id: 8, nume: 'Ioana' },
      { id: 9, nume: 'Leon' },
      { id: 10, nume: 'Viorica' },
      { id: 11, nume: 'Pamela' },
      { id: 12, nume: 'Alexandra' },
      { id: 18, nume: 'Rafila' },
      { id: 30, nume: 'Antonia' },
      { id: 31, nume: 'Ion' },
      { id: 32, nume: 'Maria' },
      { id: 4, nume: 'Fane' },
      { id: 5, nume: 'Panseluta' },
      { id: 6, nume: 'Roxana' },
      { id: 33, nume: 'Sandra' },
      { id: 34, nume: 'Andra' },
      { id: 35, nume: 'Victoras' },
      { id: 36, nume: 'Alexandra' },
      { id: 37, nume: 'Gabi' },
      { id: 38, nume: 'Florin' },
      { id: 39, nume: 'Darius' },
      { id: 40, nume: 'Loreta' },
      { id: 13, nume: 'Ovidiu' },
      { id: 17, nume: 'Duma' },
      { id: 1, nume: 'Alin' },
      { id: 2, nume: 'Irina' },
      { id: 14, nume: 'Marius' },
      { id: 15, nume: 'Patricia' },
      { id: 16, nume: 'Cosmin' },
      { id: 19, nume: 'Roland' },
      { id: 20, nume: 'Remus' },
    ];
    const blackList: UserId[] = [
      { id: 21 },
      { id: 11 },
      { id: 22 },
      { id: 40 },
      { id: 11 },
      { id: 3 },
      { id: 2 },
      { id: 30 },
      { id: 100 },
      { id: 4 },
    ];

    const ages: Age[] = [
      { id: 12, age: '36' },
      { id: 18, age: '46' },
      { id: 40, age: '32' },
      { id: 13, age: '13' },
      { id: 17, age: '76' },
      { id: 1, age: '56' },
      { id: 2, age: '76' },
      { id: 14, age: '44' },
      { id: 15, age: '29' },
      { id: 34, age: '70' },
      { id: 0, age: '13' },
      { id: 3, age: '4' },
      { id: 5, age: '17' },
      { id: 6, age: '29' },
      { id: 33, age: '10' },
      { id: 16, age: '41' },
      { id: 19, age: '16' },
      { id: 20, age: '0' },
      { id: 7, age: '24' },
      { id: 35, age: '16' },
      { id: 36, age: '1' },
      { id: 37, age: '67' },
      { id: 38, age: '55' },
      { id: 39, age: '11' },
      { id: 9, age: '15' },
      { id: 10, age: '65' },
      { id: 11, age: '24' },
      { id: 8, age: '46' },
      { id: 30, age: '19' },
      { id: 31, age: '100' },
      { id: 32, age: '67' },
      { id: 4, age: '4' },
    ];

    const identity: Identity[] = [
      { id: 12, type: IdentityEnum.Intersex },
      { id: 18, type: IdentityEnum.Female },
      { id: 34, type: IdentityEnum.Female },
      { id: 0, type: IdentityEnum.Intersex },
      { id: 3, type: IdentityEnum.NonConforming },
      { id: 5, type: IdentityEnum.Intersex },
      { id: 31, type: IdentityEnum.Intersex },
      { id: 2, type: IdentityEnum.Eunuch },
      { id: 14, type: IdentityEnum.NonConforming },
      { id: 38, type: IdentityEnum.Intersex },
      { id: 39, type: IdentityEnum.NonConforming },
      { id: 8, type: IdentityEnum.Intersex },
      { id: 30, type: IdentityEnum.Female },
      { id: 40, type: IdentityEnum.Trans },
      { id: 13, type: IdentityEnum.Male },
      { id: 6, type: IdentityEnum.Female },
      { id: 33, type: IdentityEnum.Intersex },
      { id: 16, type: IdentityEnum.Eunuch },
      { id: 19, type: IdentityEnum.Trans },
      { id: 20, type: IdentityEnum.Intersex },
      { id: 17, type: IdentityEnum.Female },
      { id: 1, type: IdentityEnum.Personal },
      { id: 32, type: IdentityEnum.Male },
      { id: 4, type: IdentityEnum.Intersex },
      { id: 37, type: IdentityEnum.Female },
      { id: 9, type: IdentityEnum.Eunuch },
      { id: 10, type: IdentityEnum.Intersex },
      { id: 11, type: IdentityEnum.Male },
      { id: 15, type: IdentityEnum.Intersex },
    ];
    // where id is the age number
    const agesType: AgeType[] = [
      { type: 'new born', ageMin: '0', ageMax: '0.9' },
      { type: 'todler', ageMin: '1', ageMax: '4' },
      { type: 'kid', ageMin: '5', ageMax: '12' },
      { type: 'youth', ageMin: '12', ageMax: '15' },
      { type: 'youth adult', ageMin: '16', ageMax: '19' },
      { type: 'adult', ageMin: '20', ageMax: '64' },
      { type: 'senior', ageMin: '65', ageMax: '150' },
    ];
    return { users, blackList, ages, agesType, identity };
  }

  // Overrides the genId method to ensure that a user always has an id.
  // If the Users array is empty,
  // the method below returns the initial number (0).
  // if the users array is not empty, the method below returns the highest
  // hero id + 1.
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 0;
  }
}
