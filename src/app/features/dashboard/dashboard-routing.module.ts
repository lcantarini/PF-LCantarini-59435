import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersModule } from './users/users.module';
import { HomeModule } from './home/home.module';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { ClassModule } from './class/class.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

const routes: Routes = [
  {path: 'home',
    loadChildren: () => HomeModule,
  },
  {
    path: 'users',
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
