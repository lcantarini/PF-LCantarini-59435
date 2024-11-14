import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import { generateStringRandom } from '../../shared/utils';
import { concatAll, concatMap, delay, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

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
