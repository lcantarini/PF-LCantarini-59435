import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentComponent } from './enrollment.component';
import { EnrollmentDialogComponent } from './enrollment-dialog/enrollment-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentEffects } from './store/enrollment.effects';
import { StoreModule } from '@ngrx/store';
import { enrollmentFeature } from './store/enrollment.reducer';


@NgModule({
  declarations: [
    EnrollmentComponent,
    EnrollmentDialogComponent
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    SharedModule,
    StoreModule.forFeature(enrollmentFeature),
    EffectsModule.forFeature([EnrollmentEffects])
  ]
})
export class EnrollmentModule { }
