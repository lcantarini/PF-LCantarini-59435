import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersModule } from './users/users.module';
import { HomeModule } from './home/home.module';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { ClassModule } from './class/class.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { authGuard } from '../../core/guards/auth.guard';
import { usersGuard } from '../../core/guards/users.guard';

const routes: Routes = [
  {path: 'home',
    loadChildren: () => HomeModule,
  },
  {
    path: 'users',
    canActivate: [usersGuard],
    loadChildren: () => UsersModule
  },
  {
    path: 'students',
    loadChildren: () => StudentsModule
  },
  {
    path: 'courses',
    loadChildren: () => CoursesModule
  },
  {
    path: 'class',
    loadChildren: () => ClassModule
  },
  {
    path: 'enrollment',
    loadChildren: () => EnrollmentModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
