import { Injectable } from '@angular/core';
import { AuthData } from '../../features/auth/models';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { User } from '../../features/dashboard/users/models';
import { generateStringRandom } from '../../shared/utils';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/actions/auth.actions';
import { selectAuthenticatedUser } from '../../store/selectors/auth.selector';


@Injectable({ providedIn: 'root' })
export class AuthService {

  public authUser$ : Observable<User | null>;

  private baseURL = environment.apiBaseURL;

  constructor(
    private router: Router, 
    private httpClient: HttpClient,
    private store: Store
  ) {
    this.authUser$ = this.store.select(selectAuthenticatedUser);
  }

  private handleAuthentication(users: User[]): User | null {
    if (!!users[0]) {
      this.store.dispatch(AuthActions.setAuthenticatedUser({ user: users[0]}))
      localStorage.setItem('token', users[0].token);
      return users[0];
    } else {
      return null
    }
  }

  login(data: AuthData): Observable<User> {

    return this.httpClient
      .get<User[]>(
        `${this.baseURL}/users?email=${data.email}&password=${data.password}`
      )
      .pipe(map((users) => {
        const user = this.handleAuthentication(users);
        if (user) {
          return user;
        } else {
          throw throwError(() => Error('Los datos son invalidos'));
        }
      })
    );

  }

  logout() {
    this.store.dispatch(AuthActions.unsetAuthenticatedUser())
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  verifyToken(): Observable<boolean> {

    return this.httpClient.get<User[]>(`${this.baseURL}/users?token=${ localStorage.getItem('token')}`
  ).pipe(map((users) => {
    const user = this.handleAuthentication(users);
    return !!user;
  }))
  }

  verifyAdmin(): Observable<boolean> {
    let isAdmin: boolean = false;
    this.authUser$.subscribe({next: (user) => isAdmin = (user?.profile === 'ADMIN')
    });

    return of(isAdmin)
    
  }
}
