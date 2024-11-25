import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { AuthActions } from '../../../../store/actions/auth.actions';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';
import { Action } from '@ngrx/store';

@Injectable()
export class EnrollmentEffects {


  loadEnrollments$: Actions<Action<string>>;
  
  constructor(private actions$: Actions, private enrollmentsService: EnrollmentsService) {
    this.loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      concatMap((action) =>
        this.enrollmentsService
          .getEnrollments()
          //Success
          .pipe(map((response) => EnrollmentActions.loadEnrollmentsSuccess({ data: response })))),
          //Error
          catchError((error) => of(EnrollmentActions.loadEnrollmentsFailure({ error })))
    );
  });
  }
}
