import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './class.component';
import { usersGuard } from '../../../core/guards/users.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [usersGuard],
    component: ClassComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
