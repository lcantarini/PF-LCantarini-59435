import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersModule } from './users/users.module';
import { HomeModule } from './home/home.module';
import { CoursesModule } from './courses/courses.module';

const routes: Routes = [
  {path: 'home',
    loadChildren: () => HomeModule,
  },
  {
    path: 'users',
    loadChildren: () => UsersModule
  },
  {
    path: 'courses',
    loadChildren: () => CoursesModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
