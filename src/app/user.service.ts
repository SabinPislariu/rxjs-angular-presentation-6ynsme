import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Age, AgeType, Identity, User } from './user.model';

export const API = {
  users: 'api/users',
  blackList: 'api/blackList',
  ages: 'api/ages',
  agesType: 'api/agesType',
  identity: 'api/identity',
};

/**
 * To get the data from mock-memory-data.service you just need to do a http call to the API above
 * Ex: check getUsers method from this service to get multiple data
 * Ex: check getUserById method from this service to get just one user (one data)
 */

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpOptions;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  /** GET Users from the server */
  getUsers(userApi?: string): Observable<User[]> {
    return this.http.get<User[]>(userApi || API.users).pipe(
      tap((users) => this.log('fetched users', users)),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  /** GET user by id. Will 404 if id not found */
  getUserById(id: number): Observable<User> {
    const url = `${API.users}/${id}`;
    return this.http.get<User>(url).pipe(
      tap((_) => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** GET user by id. Will 404 if id not found */
  getAgeById(id: number): Observable<Age> {
    const url = `${API.ages}/${id}`;
    return this.http.get<Age>(url).pipe(
      tap((_) => this.log(`fetched age for id=${id}`)),
      catchError(this.handleError<Age>(`getAge id=${id}`))
    );
  }

  getIdentityById(id: number): Observable<Identity> {
    const url = `${API.identity}/${id}`;
    return this.http.get<Identity>(url).pipe(
      tap((_) => this.log(`fetched identity for id=${id}`)),
      catchError(this.handleError<Identity>(`getIdentity id=${id}`))
    );
  }

  getAgeTypeById(id: number): Observable<AgeType> {
    const url = `${API.agesType}/${id}`;
    return this.http.get<AgeType>(url).pipe(
      tap((_) => this.log(`fetched AgeType for id=${id}`)),
      catchError(this.handleError<AgeType>(`getAgeType id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string, param?: any): void {
    console.log(message, param);
  }
}
