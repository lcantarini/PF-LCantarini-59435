import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import { generateStringRandom } from '../../shared/utils';
import { concatAll, concatMap, delay, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

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

  private baseURL = environment.apiBaseURL;

  constructor( private httpClient: HttpClient) {}

  getById(id: string): Observable<User | undefined> {
    return this.httpClient.get<User>(`${this.baseURL}/users/${id}`);
  }

  getUsers(): Observable<User[]> {
      return this.httpClient.get<User[]>(`${this.baseURL}/users`)
  }

  removeUserById(id: string): Observable<User[]> {
    return this.httpClient
      .delete<User>(`${this.baseURL}/users/${id}`)
      .pipe(concatMap(() => this.getUsers()));
  }

  updateUserById(id: string, update: Partial<User>) {
    return this.httpClient
      .patch<User>(`${this.baseURL}/users/${id}`, update)
      .pipe(concatMap(() => this.getUsers()));
  }

  insertUser(data: Omit<User, 'id'>) : Observable<User> {
    return this.httpClient.post<User>(`${this.baseURL}/users`, {
      ...data,
      token: generateStringRandom(20),
      createdAt: new Date().toISOString(),
    });
  }

}
