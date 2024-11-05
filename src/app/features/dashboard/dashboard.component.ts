import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { Observable } from 'rxjs';
import { User } from './users/models';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  authUser$: Observable<User | null>;

  constructor(private router: Router, private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }

  logout(): void { 
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
    //
  }
}


