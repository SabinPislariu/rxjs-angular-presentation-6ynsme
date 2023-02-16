export enum IdentityEnum {
  'Female',
  'Male',
  'Intersex',
  'Trans',
  'NonConforming',
  'Personal',
  'Eunuch',
}
export interface User {
  id: number;
  nume: string;
}

export interface Identity {
  id: number;
  type: IdentityEnum;
}

export interface UserId {
  id: number;
}

export interface Age {
  id: number;
  age: string;
}

export interface AgeType {
  ageMin: string;
  ageMax: string;
  type: string;
}

export interface UserAge extends User {
  age: string;
}

export interface UserAgeWithType extends UserAge {
  type: string;
}
