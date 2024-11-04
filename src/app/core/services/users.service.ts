import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import { generateStringRandom } from '../../shared/utils';
import { delay, map, Observable, of } from 'rxjs';

export let MY_USERS_DB: User[] = [
  {id: '1', firstName: 'Hydrogen',  lastName: 'Gonzalez', createdAt: new Date(), email: 'Hydrogen@gmail.com', password: 'uno23456', token: generateStringRandom(20), profile: 'ADMIN'},
  {id: '2', firstName: 'Helium', lastName: 'Gomez', createdAt: new Date(), email: 'Helium@gmail.com', password: 'uno23456', token: generateStringRandom(20), profile: 'USER'},
  {id: '3', firstName: 'Lithium', lastName: 'Perez', createdAt: new Date(), email: 'Lithium@gmail.com', password: 'uno23456', token: generateStringRandom(20), profile: 'USER'},
  {id: '4', firstName: 'Beryllium', lastName: 'Fernandez', createdAt: new Date(), email: 'Beryllium@gmail.com', password: 'uno23456', token: generateStringRandom(20), profile: 'USER'},
  {id: '5', firstName: 'Boron', lastName: 'Aguilera', createdAt: new Date(), email: 'Boron@gmail.com', password: 'uno23456', token: generateStringRandom(20), profile: 'USER'},
  {id: '6', firstName: 'Carbon', lastName: 'Caceres', createdAt: new Date(), email: 'Carbon@gmail.com', password: 'uno23456', token: generateStringRandom(20), profile: 'ADMIN'},
  {id: '7', firstName: 'Nitrogen', lastName: 'Martinez', createdAt: new Date(), email: 'Nitrogen@gmail.com', password: 'uno23456', token: generateStringRandom(20), profile: 'USER'},
  {id: '8', firstName: 'Oxygen', lastName: 'Hidalgo', createdAt: new Date(), email: 'Oxygen@gmail.com', password: 'uno23456', token: generateStringRandom(20), profile: 'USER'},
  {id: '9', firstName: 'Fluorine', lastName: 'Lopez', createdAt: new Date(), email: 'Fluorine@gmail.com', password: 'uno23456', token: generateStringRandom(20), profile: 'USER'},
  {id: '10',firstName: 'Neon', lastName: 'Suarez', createdAt: new Date(), email: 'Neon@gmail.com', password: 'uno23456', token: generateStringRandom(20), profile: 'USER'},
];

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() {}

  getById(id: string): Observable<User | undefined> {
    return this.getUsers().pipe(map((users) => users.find((u) => u.id === id)));
  }

  getUsers(): Observable<User[]> {
    return new Observable((observer) => {

        observer.next(MY_USERS_DB);
        observer.complete();

    });
  }

  removeUserById(id: string): Observable<User[]> {
    MY_USERS_DB = MY_USERS_DB.filter((user) => user.id != id);
    return of(MY_USERS_DB).pipe(delay(1000));
  }

  updateUserById(id: string, update: Partial<User>) {
    MY_USERS_DB = MY_USERS_DB.map((user) =>
      user.id === id ? { ...user, ...update } : user
    );

    return new Observable<User[]>((observer) => {

        observer.next(MY_USERS_DB);
        observer.complete();

    });
  }

  insertUser(user: User) : Observable<User[]> {
    MY_USERS_DB = [ ...MY_USERS_DB, user ];

    return of(MY_USERS_DB);
  }

}
