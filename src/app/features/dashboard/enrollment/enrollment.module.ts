import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentComponent } from './enrollment.component';
import { EnrollmentDialogComponent } from './enrollment-dialog/enrollment-dialog.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    EnrollmentComponent,
    EnrollmentDialogComponent
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    SharedModule
  ]
})
export class EnrollmentModule { }
