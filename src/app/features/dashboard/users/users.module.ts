import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import {MatCardModule} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { UserFullnamePipe } from '../../../shared/pipes/user-fullname.pipe';
import { MatIcon } from '@angular/material/icon';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,
    MatButton,
    MatIcon,
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
