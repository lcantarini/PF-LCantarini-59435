import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentComponent } from './enrollment.component';
import { EnrollmentDialogComponent } from './enrollment-dialog/enrollment-dialog.component';


@NgModule({
  declarations: [
    EnrollmentComponent,
    EnrollmentDialogComponent
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule
  ]
})
export class EnrollmentModule { }
