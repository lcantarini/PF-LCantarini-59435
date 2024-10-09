import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

//import { UserFullnamePipe } from '../../../shared/pipes/user-fullname.pipe';



@NgModule({
  declarations: [
    UsersComponent, UserDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  exports: [
    UsersComponent
  ]
  
})
export class UsersModule { }
