import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CoursesComponent } from './features/dashboard/courses/courses.component';
import { UsersComponent } from './features/dashboard/users/users.component';
import { AuthModule } from './features/auth/auth.module';
import { DashboardModule } from './features/dashboard/dashboard.module';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => AuthModule,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => DashboardModule
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
