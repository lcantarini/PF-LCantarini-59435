import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  constructor(private router: Router) {}

  logout(): void { 
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
    //
  }
}


